import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const Type1 = props => {

const update = props.onChange
const metadata = props.order_metadata

return (
  <>  
  <div>
      <TextField id="email" label="Recipient Email" defaultValue="" variant="standard"
      onChange={(event)=> {update.onChange(prevState=>({...prevState,email: event.target.value}))}} />

      <TextField id="contract_address" label="Collection Address" defaultValue={metadata.nft ? metadata.nft.contract_address : ""} variant="standard"
      onChange={(event)=> {update.onChange(prevState=>({...prevState,nft_addy: event.target.value}))}} />

      <TextField id="token_id" label="Token ID" defaultValue={metadata.nft ? metadata.nft.token_id : ""} variant="standard"
      onChange={(event)=> {update.onChange(prevState=>({...prevState,nft_addy: event.target.value}))}} />

      <TextField id="alert_price" label="Alert Price" defaultValue="" variant="standard"
      onChange={(event)=> {update.onChange(prevState=>({...prevState,alert_price: event.target.value}))}} />

    </div>
  </>
);
}

export default Type1





      