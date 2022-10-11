import * as React from 'react';
// import { styled, makeStyles } from '@mui/material/styles'; dont work
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Button } from "@mui/material";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

// import Collapse from '@mui/material/Collapse';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";


const useStyles =  makeStyles((theme) =>({
    //theme.palette.background.paper,
    root: {
      minWidth: 400,
      maxWidth: 400,
    },
    title: {
      color: "#800000",
      fontWeight: 700, 
    },
    technology:{
        color: "#1E88AE",
        fontWeight: 600, 
    },
    pos: {
      marginBottom: 12,
    },
    exploreIcon: {
      backgroundColor:'#BE9759',
      '&:hover':{
        backgroundColor:'#800000', 
        // color:"#800000",  //deep blue: #1b7b9d
      }
    },
    author:{
      marginBottom:"1px"
    },
        
    
  }));
  
export default function Card__NFT() {   //{NFT}
    const {collection_id, token_id} = useParams()
    const navigate = useNavigate();

    //probably multiple states each a separate topic; listings, image, rarity ... , each their own call ofc 
    const [nft, setnft] = useState([]);
    const [listings, setListings] = useState([]);       //also has a useful rarity ranking among the whole collection
    const [rarity, setRarity] = useState([]); 
    const classes = useStyles();

    useEffect(()=>{
        const fetchnft = async () =>{
            if(nft.length==0){
                const res = await axios.get("http://localhost:9000/api/NFTs/"+collection_id + "/" + token_id + "/");
                // const data = await res.json();
                console.log(res["data"]);
                setnft(res["data"]);
            }
        }
        fetchnft().catch(console.error);
    },[nft])

    useEffect(()=>{
        const fetchListing = async () => {
            if(listings.length==0){
                const res = await axios.get("http://localhost:9000/api/NFTs/"+collection_id + "/" + token_id + "/listings/");
                // const data = await res.json();
                console.log(res["data"]);
                setListings(res["data"]);
            }
        }
        fetchListing().catch(console.error);
    },[listings])


    // function that switches the route to inspect singular collection request
    const toCollectionCard = (collection_id) => {
        console.log("collection_id:", collection_id);
        let path = "art/:collection_id/" + collection_id;
        window.location.href = path
    };
//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

  return (
    <>{
        nft.length != 0 && 
        <>
        <Card sx={{ maxWidth: 345 }}>
        <CardHeader
            // avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">Creat</Avatar>}
            // action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
            title={nft["metadata"]["name"]}
        />
        <CardMedia
            component="img" height="194"
            image={nft.metadata.image} alt="Paella dish"
        />
        <CardContent>
            <Typography variant="body2" color="text.secondary"> 
            {nft.metadata.description}
            </Typography>
        </CardContent>
        <Button onClick={() => navigate("/order-alert")}>Create Alert</Button>
        {/*<CardActions disableSpacing>
            <IconButton aria-label="add to favorites"><FavoriteIcon /></IconButton>
            <IconButton aria-label="share"><ShareIcon /></IconButton>
        </CardActions>
        
             <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
            <ExpandMoreIcon />
            </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
            <Typography paragraph>
                Here is some cool metadata on the collection
            </Typography>
            </CardContent>
        </Collapse> */}
    </Card>

    <List>
        {listings.length!=0 && listings.map((listing) => (
        <ListItem key={listing.marketplace}>
            <ListItemText
                primary={listing.marketplace}
                secondary={listing.payment.value_in_eth}
            />
        </ListItem>
        ))}
    </List>
    </>
    }
     
    </>
   
  );
}




// const ExpandMore = styled((props) => {
// const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

//   return (
//     <Card className={classes.root} variant="outlined">
//         <CardContent>
//             <Typography variant ="h5" className={classes.title} gutterBottom>
//                 {collection.name}
//             </Typography>
//             <Typography variant="h7" component="p" gutterBottom>
//                 {collection.description}
//             </Typography>
//             <Typography variant="h6" className={classes.technology} component="p">
//                 {collection.technology}
//             </Typography>
//         </CardContent>
//         <CardActions>
//       <IconButton aria-label="delete"className={classes.exploreIcon}>
//            <ExploreIcon onClick={() => {routeChange(collection_id);}}/> {/* className={classes.explore} */}
//         </IconButton>
//       </CardActions>
//         <CardContent>
//             <Typography variant="h7" className={classes.author} component="h7" gutterBottom>
//                 <Link to={`/creator/${collection.author}`}>
//                     {collection.author}
//                 </Link>
//             </Typography>
//         </CardContent>
//     </Card>
//   );
