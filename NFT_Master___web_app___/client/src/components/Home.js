import React, { useState,useEffect  } from 'react';
import { useNavigate  } from "react-router-dom";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
// import SearchBar from 'material-ui-search-bar'
//component styling to be sued in the return function
const useStyles = makeStyles({
    table: {
      width: "100%",
      //marginLeft: '+200px',
    },
    row: {
      width: "100%",
      //marginLeft: '+200px',
    },
    createServiceButton:{
      width: 170,
      marginLeft: '+300px',
      marginTop: '-80px',
    }
  });

export default function Home() {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const history = useNavigate();

useEffect(() => {
  const fetchData = async () => {
    const result = await axios.get(
      'http://localhost:9000/api/users',
    );
    console.log("result:" , result);
    setUsers(result.data);
    console.log("users are: ", users)
  };

  fetchData();
},[]);

// useEffect(() => {
//     const result = axios.get('http://localhost:9000/api/users',);
//     console.log("result:" , result);
//     setUsers(result.data);
//     console.log("users are: ", users)
//   },[users]);


// function that sitches the route to inspcet singular user request
const viewProfile = (user_id) =>{ 
  console.log("user_id:", user_id);
  let path = "/user-profile/"+ user_id; 
  history.push(path);
}

// users:
    // Name
    // UserName
    // Minions



return (
  <>  
      <h5>Help Requests</h5>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>UserName</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Minions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow className={classes.row} key={user.UserName}>
                <TableCell component="th" scope="row">{user.Name}</TableCell>
                <TableCell align="right">{user.UserName}</TableCell>
                <TableCell align="right">{user.UserName}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" onClick={()=>{viewProfile(user.UserName)}}>
                    Check Out 
                  </Button>
                </TableCell>               
              </TableRow>
            ))
        }

          </TableBody>
        </Table>
      </TableContainer>
  </>
);
}

