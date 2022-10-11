
import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/styles';
import Box from "@material-ui/core/Box";
// import Paper from "@material-ui/core/Paper";
// import Button from "@material-ui/core/Button";
// import SearchBar from "material-ui-search-bar";
import axios from "axios";
// import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";
// import Logout from "./LogOut";
// import Filter from "./Filter";
import Grid from "@material-ui/core/Grid"
import Card__Collection from "./Card__Collection"

// //component styling to be used in the return function
// const useStyles = makeStyles((theme) =>({
//   root: {
//     width: "97%",
//     marginLeft: '1.5%',
//     marginRight: '1.5%',
//   },
//   createServiceButton:{
//     width: "170px",
//     height: "50px",
//   },
//   serviceBar: {
//     width: "100%",
//     display: "flex",
//     alignItems: "flex-start",
//     justifyContent: "space-around",
//     marginTop: "0.4%",
//     marginBottom: "15px",
//     [theme.breakpoints.up("sm")]: {
//       flexDirection: "column",
//       alignItems: "center",
//     },
//   },
// }));



export default function Explorer() {

  // const classes = useStyles();
  const [collectionList, setCollectionList] = useState([]);

  useEffect(() => {
    console.log("use Effect")
    const fetchData = async () => {
      const result = await axios.get('http://localhost:9000/api/collections');
      console.log(result.data);
      setCollectionList(result["data"]);
      console.log("collectionList: ", collectionList)
    };
    fetchData();
  },[]);

//   // function that sitches the route to inspcet singular service request
//   const createNewService = () =>{ 
//     window.location.href="/create-service"
//   }

return(
    <>  
    {/* <Logout/> */}
    <Box>  {/** className={classes.serviceBar} */ }
          {/* <SearchBar
            onChange={() => console.log("onChange")}
            onRequestSearch={() => console.log("onRequestSearch")}
            style={{ marginLeft: "+0px", width: 250 }}
          /> */}
          {/* <Button
            className={classes.createServiceButton}
            variant="contained"
            color="primary"
            onClick={() => {
              createNewService();
            }}
          >
            Post New Service
            <NoteAddOutlinedIcon />
          </Button> */}

          {/* <Filter      //refere to Geeks 2 the rescue Filter and Show ServiceListGrid
            checkboxes={technologies}
            setFilterIsActive={setFilterIsActive}
            checkedItems={checkedTech}
            setCheckedItems={setCheckedTech}
            heading="Technology"
          />
          <Filter
            checkboxes={OS}
            setFilterIsActive={setFilterIsActive}
            checkedItems={checkedOS}
            setCheckedItems={setCheckedOS}
            heading="OS"
          /> */}
        </Box>
    <Grid container spacing={3} >  {/**className={classes.root} */}
        {collectionList.length!=0 && collectionList.map((collection) => (
        <Grid container item xs={3} spacing={0}>
            <Card__Collection key={collection.id} />    {/**collection={collection} unnecesarry ? or faster ? */}
        </Grid>
        ))}  
    </Grid>
    </>
  );
}

