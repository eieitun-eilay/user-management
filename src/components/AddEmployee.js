import React from 'react';
import { Box, Button, Grid, IconButton, Stack, TextField, Typography, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {useState, useEffect} from 'react';
import {db} from '../firebase-config';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useAppStore } from '../appStore';


const roles = [
    { value: 'admin', label: 'Admin'},
    { value: 'accountant', label: 'Accountant' },
    { value: 'hr', label: 'HR' },
    { value: 'business analyst', label: 'Business Analyst' }
  ];
  
export default function AddEmployee({closeEvent}) {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [role, setRole] = useState("");
const setRows = useAppStore((state) => state.setRows);
const empCollectionRef = collection(db,'employeelist');

const handleNameChange = (event) => {
    setName(event.target.value);
};

const handleEmailChange = (event) => {
    setEmail(event.target.value);
};

const handleRoleChange = (event) => {
    setRole(event.target.value);
};



const createUser = async() =>{
    await addDoc(empCollectionRef, {
      name: name,
      email: email,
      role: role,
    });
    getUsers();
    closeEvent();
    Swal.fire("Submitted!", "Your file has been submitted", "success");

   
};
const getUsers = async() => {
  const data = await getDocs(empCollectionRef);
  setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
};
  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Add Employee
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            size="small"
            onChange={handleNameChange}
            value={name}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Email"
            type="email"
            variant="outlined"
            size="small"
            onChange={handleEmailChange}
            value={email}
            sx={{ minWidth: "100%" }}
          />
            
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Role"
            select
            variant="outlined"
            size="small"
            onChange={handleRoleChange}
            value={role}
            sx={{ minWidth: "100%" }}
          >
          {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' align='center'>
          <Button variant="contained" onClick={createUser}>
              Submit
            </Button>
          </Typography>
          
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
}
