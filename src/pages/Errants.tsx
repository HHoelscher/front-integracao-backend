import React from 'react';
import { Grid } from '@mui/material';

interface ErrantsProps {
  struture: React.FC;
}

const Errants: React.FC<ErrantsProps> = ({ struture: Component }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Component />
      </Grid>
    </Grid>
  );
};

export default Errants;
