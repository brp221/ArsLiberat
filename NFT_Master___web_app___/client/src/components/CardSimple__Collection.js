import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Button } from "@mui/material";

import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


export default function CardSimple__Collection({collection}) {  
    const navigate= useNavigate();
    const {collection_id} = useParams();
    
    console.log("prop looging:", collection);
    console.log(collection["cached_file_url"])

    const routeChange = (collection_id) => {
        console.log("collection_id:", collection_id);
        let path = "/collection/" + collection_id;
        window.location.href = path
    };


  return (
    <>
    {
    collection && 
    <>
    <Card sx={{ maxWidth: 420 }}>
    <CardHeader
    title={collection["name"]}
    /> 
    <CardMedia
    component="img" height="194"
    image={collection["banner_image_url"]!==null ? collection["banner_image_url"] : collection["image_url"]} alt="Check your math buddy"
    />
    <Button onClick={() => navigate("/art/0x" + collection["attributes"]["address"], {state: "someData"})}>Explore </Button>

      {/* <CardContent>
        <Typography variant="body2" color="text.secondary">
        {collection.contractMetadata.openSea.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites"><FavoriteIcon /></IconButton>
        <IconButton aria-label="share"><ShareIcon /></IconButton>
      </CardActions> */}
    </Card>
    </>
    }
    </>
    
  );
}
