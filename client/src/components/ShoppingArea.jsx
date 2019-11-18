import React, { useState } from 'react';
import { makeStyles, Container, Typography, IconButton, Collapse, Box } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import clsx from 'clsx';

import ProductGrid from './ProductGrid';

const useStyles = makeStyles(theme => ({
  root: {},
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  expansionButton: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.standard
    })
  },
  expansionButtonOpen: {
    transform: 'rotate(180deg)'
  },
  collapse: {
    marginTop: theme.spacing(1)
  }
}));

const ShoppingArea = () => {
  const classes = useStyles();
  const [showProductGrid, setShowProductGrid] = useState(false);

  const handleExpandButtonClicked = () => {
    setShowProductGrid(!showProductGrid);
  };

  return (
    <Container maxWidth="md">
      <Box className={clsx(classes.header)} onClick={handleExpandButtonClicked}>
        <Typography variant="h4">Available Cars</Typography>
        <IconButton
          className={clsx(classes.expansionButton, {
            [classes.expansionButtonOpen]: showProductGrid
          })}
          onClick={handleExpandButtonClicked}
        >
          <ExpandMore />
        </IconButton>
      </Box>
      <Collapse in={showProductGrid}>
        <div className={classes.collapse} />
        <ProductGrid />
      </Collapse>
    </Container>
  );
};

export default ShoppingArea;
