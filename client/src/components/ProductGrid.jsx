import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  makeStyles,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button
} from '@material-ui/core';

import * as actions from '../redux/actions';
import { getProducts } from '../redux/selectors';

const useStyles = makeStyles(theme => ({
  root: {},
  cardMedia: {
    height: 0,
    paddingTop: '66.66%'
  },
  imageContainer: {
    position: 'relative',
    width: '50%',
    paddingTop: '50%'
  },
  image: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: `translate(0%, 0%)`,
    width: '100%',
    height: '100%'
  },
  addToCartButton: {
    marginLeft: 'auto'
  },
  gridItem: {
    // maxWidth: '300px',
    minWidth: '280px'
  },
  cardContent: {
    paddingBottom: 0
  },
  fakeFullPrice: {
    textDecoration: 'line-through'
  }
}));

const carColorToImageUrl = color => {
  return `https://jyost-rando-images.s3.amazonaws.com/car_${color}.png`;
};

const ProductGrid = ({ products, addItemToCartAction }) => {
  const classes = useStyles();

  const getImageFromCarColor = color => {
    // return 'https://jyost-rando-images.s3.amazonaws.com/car_blue.png';
    return (
      <div className={classes.imageContainer}>
        <img
          alt="car wheels"
          className={classes.image}
          src="https://jyost-rando-images.s3.amazonaws.com/car_wheels.png"
        />
        <img alt={`${color} car`} className={classes.image} src={carColorToImageUrl(color)} />
      </div>
    );
  };

  const handleAddToCartClick = product => {
    addItemToCartAction(product, false);
  };

  const makeGrid = products.slice(0, 6).map(product => {
    return (
      <Grid className={classes.gridItem} item key={product.id} lg={4} md={4} sm={4} xs={4}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            {getImageFromCarColor(product.color)}
            <Typography>{`${product.make} ${product.model}`}</Typography>
            <Typography color="error" component="span">{` $${product.price}! `}</Typography>
            <Typography className={classes.fakeFullPrice} component="span">
              {`$${product.price * 2}`}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              className={classes.addToCartButton}
              color="primary"
              onClick={() => handleAddToCartClick(product)}
            >
              Add to cart
            </Button>
          </CardActions>
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
  addItemToCartAction: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      make: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      year: PropTypes.number.isRequired
    })
  ).isRequired
};

const mapStateToProps = state => {
  return {
    products: getProducts(state)
  };
};

const mapDispatchToProps = {
  addItemToCartAction: actions.addItemToCartAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);
