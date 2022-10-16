import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const Type2 = props => {

const update = props.onChange
const metadata = props.order_metadata


return (
  <>  
  <div>
      <TextField id="email" label="Recipient Email" defaultValue="" variant="standard"
      onChange={(event)=> {update.onChange(prevState=>({...prevState, email: event.target.value}))}} />

      <TextField id="collection_addy" label="Collection Address" defaultValue={metadata.collection ? metadata.collection.address : "" } variant="standard"
      onChange={(event)=> {update.onChange(prevState=>({...prevState, collection_addy: event.target.value}))}} />

      <TextField id="rarity" label="Token Rarity" defaultValue="" variant="standard"
      onChange={(event)=> {update.onChange(prevState=>({...prevState, token_rarity: event.target.value}))}} />

    </div>
  </>
);
}

export default Type2





      