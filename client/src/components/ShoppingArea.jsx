import React, { useState } from 'react';
import { makeStyles, Container, Typography, IconButton, Collapse, Box } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import ProductGrid from './ProductGrid';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {},
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1)
  },
  expansionButton: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.standard
    })
  },
  expansionButtonOpen: {
    transform: 'rotate(180deg)'
  }
}));

const ShoppingArea = () => {
  const classes = useStyles();
  const [showProductGrid, setShowProductGrid] = useState(true);

  const handleExpandButtonClicked = () => {
    setShowProductGrid(!showProductGrid);
  };

  return (
    <Container maxWidth="md">
      <Box className={classes.header} onClick={handleExpandButtonClicked}>
        <Typography gutterBottom variant="h4">
          Shop til you drop
        </Typography>
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
        <ProductGrid />
      </Collapse>
    </Container>
  );
};

export default ShoppingArea;
