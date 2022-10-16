
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
import CardSimple__Collection from "./CardSimple__Collection"

export default function Explorer() {

  // const classes = useStyles();
  const [assetList, setAssetList] = useState([]);

  useEffect(() => {
    console.log("use Effect")
    const fetchData = async () => {
      const result = await axios.get('http://localhost:9000/api/collections/');
      console.log(result.data);
      setAssetList(result.data);
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
        </Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 4, md: 4}}>{/**className={classes.root} */}
        {assetList && assetList.map((asset) => (
          <Grid item xs={3}>
              <CardSimple__Collection key={asset["created_date"]} collection={asset} />    {/**collection={collection} unnecesarry ? or faster ? */}
          </Grid>
        ))}  
    </Grid>
    </>
  );
}

