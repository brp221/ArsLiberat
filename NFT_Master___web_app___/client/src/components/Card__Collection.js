import * as React from 'react';
// import { styled, makeStyles } from '@mui/material/styles'; dont work
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
  
export default function Card__Collection({collection}) {   //{collection}
    var classes = useStyles();
    const {collection_id} = useParams()
    var [collection, setCollection] = useState();

    useEffect(()=>{
      // const fetchCollection = async() =>{
      //   const response = await axios.get("http://localhost:9000/api/"+collection_id);
      //   setCollection(response["data"]);
      // }
      // fetchCollection()
    }, [] )

    const routeChange = (collection_id) => {
        console.log("collection_id:", collection_id);
        let path = "/collection/" + collection_id;
        window.location.href = path
    };

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">CollectionAuthor</Avatar>}
        action={
          <IconButton aria-label="settings"><MoreVertIcon /></IconButton>
        }
        title="CollectionTitle"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img" height="194"
        image="/static/images/cards/paella.jpg" alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          bla bla here goes the collection discription if one exist also add sales data ? 
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites"><FavoriteIcon /></IconButton>
        <IconButton aria-label="share"><ShareIcon /></IconButton>
      </CardActions>
        {/* <ExpandMore
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
  );
}





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
