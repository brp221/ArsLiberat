import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


/**
 * Will need to pass email, NFT Address, Minion Name to the parent
 */
const useStyles = makeStyles({
    table: {
      width: "100%",
      //marginLeft: '+200px',
    },
  });

const Type1 = props => {

return (
  <>  
  <div>
      <TextField id="email" label="Recipient Email" defaultValue="" variant="standard"
      onChange={(event)=> {props.onChange(prevState=>({...prevState,email: event.target.value}))}} />

      <TextField id="contract_address" label="NFT Addy" defaultValue="" variant="standard"
      onChange={(event)=> {props.onChange(prevState=>({...prevState,nft_addy: event.target.value}))}} />

      <TextField id="alert_price" label="Alert Price" defaultValue="" variant="standard"
      onChange={(event)=> {props.onChange(prevState=>({...prevState,alert_price: event.target.value}))}} />

    </div>
  </>
);
}

export default Type1





      