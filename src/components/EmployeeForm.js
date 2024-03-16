import React, { useState } from 'react';
import { TextField, Button, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const EmployeeForm = ({ onAddEmployee }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = { name, email, role };
    onAddEmployee(newEmployee);
    setName('');
    setEmail('');
    setRole('');
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Role"
            variant="outlined"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            Add Employee
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EmployeeForm;