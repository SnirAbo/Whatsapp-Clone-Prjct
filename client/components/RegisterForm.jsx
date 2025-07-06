import { useState } from 'react';
import { TextField, Button, Grid, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

const REGISTER_URL = 'http://localhost:3000/auth/register';

const RegisterFormComp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    displayName: '',
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,  
    }));
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    await axios.post(REGISTER_URL ,formData);
    alert(`User registered: ${formData.username}`);
  };

  return (
    <Container maxWidth="sm" >
  <Box sx={{ mt: 4 }}>
  <Grid container justifyContent="center">
      <Grid item>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Register
        </Typography>
      </Grid>
    </Grid>
    <form onSubmit={handleSubmit}>
      <Grid 
        container 
        direction="column" 
        justifyContent="center" 
        alignItems="center" 
        spacing={3}  
      >

        <Grid item>
          <TextField
            label="Username"
            name="username"
            onChange={handleChange}
            variant="outlined"
            sx={{ width: '250px' }} 
          />
        </Grid>

        <Grid item>
          <TextField
            label="Password"
            name="password"
            type="password"
            onChange={handleChange}
            variant="outlined"
            sx={{ width: '250px' }}  
          />
        </Grid>

        <Grid item>
          <TextField
            label="Display Name"
            name="displayName"
            onChange={handleChange}
            variant="outlined"
            sx={{ width: '250px' }}  
          />
        </Grid>


        <Grid item>
          <Box display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  </Box>
</Container>
  );
};

export default RegisterFormComp;