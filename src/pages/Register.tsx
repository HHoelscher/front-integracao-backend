import React from 'react';
import { Grid } from '@mui/material';

interface HomeProps {
  struture: React.FC;
}

const Register: React.FC<HomeProps> = ({ struture: Component }) => {
  return (
    <Grid container height={'100vh'} justifyContent={'center'}>
      <Grid item xs={4}>
        <Component />
      </Grid>
    </Grid>
  );
};

export default Register;
