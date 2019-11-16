import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, Grid, Card, CardHeader, CardMedia } from '@material-ui/core';

import carBlue from '../images/car_blue.png';

const useStyles = makeStyles(theme => ({
  root: {}
}));

const getImagePathFromCarColor = color => {
  return carBlue;
};

const ProductGrid = ({ availableProducts }) => {
  const classes = useStyles();

  const makeGrid = availableProducts.map(product => {
    return (
      <Grid className={classes.gridItem} item key={product.id} xs={4}>
        <Card>
          <CardHeader title={`${product.make} ${product.model}`} />
          <CardMedia image={getImagePathFromCarColor(product.color)} />
        </Card>
      </Grid>
    );
  });

  return (
    <div className={classes.root}>
      <Grid alignItems="center" container direction="row" justify="center" spacing={2}>
        {makeGrid}
      </Grid>
    </div>
  );
};

ProductGrid.propTypes = {
  availableProducts: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      make: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired
    })
  ).isRequired
};

const mapStateToProps = state => {
  return {
    availableProducts: state.availableProducts
  };
};

export default connect(mapStateToProps, null)(ProductGrid);
