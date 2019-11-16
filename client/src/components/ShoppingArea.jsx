import React from 'react';
import { makeStyles, Container, Typography } from '@material-ui/core';

import ProductGrid from './ProductGrid';

const useStyles = makeStyles(theme => ({
  root: {}
}));

const ShoppingArea = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Typography variant="h3">Shop til you drop</Typography>
      <ProductGrid />
    </Container>
  );
};

export default ShoppingArea;
