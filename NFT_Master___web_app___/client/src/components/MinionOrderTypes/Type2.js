import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const useStyles = makeStyles({
    table: {
      width: "100%",
      //marginLeft: '+200px',
    },
  });

const Type2 = props => {

return (
  <>  
  <div>
      <TextField id="email" label="Recipient Email" defaultValue="" variant="standard"
      onChange={(event)=> {props.onChange(prevState=>({...prevState, email: event.target.value}))}} />

      <TextField id="collection_addy" label="NFT Collection Addy" defaultValue="" variant="standard"
      onChange={(event)=> {props.onChange(prevState=>({...prevState, collection_addy: event.target.value}))}} />

      <TextField id="rarity" label="Token Rarity" defaultValue="" variant="standard"
      onChange={(event)=> {props.onChange(prevState=>({...prevState, token_rarity: event.target.value}))}} />

    </div>
  </>
);
}

export default Type2





      