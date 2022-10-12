import React, { useState,useEffect  } from 'react';
import { useLocation  } from "react-router-dom";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';import Button from '@material-ui/core/Button';
import Type1 from './MinionOrderTypes/Type1'; 
import Type2 from './MinionOrderTypes/Type2';

const useStyles = makeStyles({
    table: {
      width: "100%",
      //marginLeft: '+200px',
    },
  });

export default function MinionOrder() {
  const classes = useStyles();
  const location = useLocation()
   // data will be shared by navigate
  const [minionType, setminionType] = useState('type 1');
  const [minion, setMinion] = useState({});  //set by the child components 
  
  const updateMinion1 = 
  useEffect(() => {
    console.log("minion: ", minion)
  },[minion]);

  const changeMinionType = (event) => {
    console.log("passed info is ", location.state)
    setMinion({})  //when the minionType changes, also reset the minion state >:)
    setminionType(event.target.value);
  };

  //triggers post request /api/services to backend 
  const createNewMinion = async()=> {
    console.log("minion: ", minion);
    const resp = await axios({
      method: 'post', 
      url: 'http://localhost:9000/api/minions',
      data: minion
    });
    console.log("resp: ",resp);
  };


// minion:
    // Email
    // NFT address
    // Type of Request

// made on the backend :
  // ID 
  // Cron Job Schedule


return (
  <>  
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Minion Choice</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={minionType}
        onChange={changeMinionType}
        name="radio-buttons-group"
      >
        <FormControlLabel value="type 1" control={<Radio />} label="type 1" />
        <FormControlLabel value="type 2" control={<Radio />} label="type 2" />
        <FormControlLabel value="type 3" control={<Radio />} label="type x coming soon " />
      </RadioGroup>
    </FormControl>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <div>
          {minionType == "type 1" && 
          <div><Type1 onChange={value => setMinion(value)}  /></div>
          }
        </div>
        {minionType == "type 2" &&
          <div><Type2 onChange={value => setMinion(value)}  /></div>
          }
        <Button variant="contained" color="primary" onClick={createNewMinion}>
            Create Alert 
        </Button>
 
        
      </div>
      
    </Box>
  </>
);
}

