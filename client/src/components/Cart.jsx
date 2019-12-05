import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, Container, Typography, Button, Divider } from '@material-ui/core';

import CartItem from './CartItem';

const useStyles = makeStyles(theme => ({
  root: {},
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  summaryBlock: {
    width: '200px',
    marginLeft: 'auto',
    marginRight: theme.spacing(2)
  },
  summaryBlockRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(0.5)
  },
  subtotal: {
    fontWeight: 'bold'
  },
  divider: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1)
  },
  emptyCart: {
    width: '100%',
    fontStyle: 'italic',
    textAlign: 'center',
    color: theme.palette.text.disabled
  }
}));

const Cart = ({ cartContents }) => {
  const classes = useStyles();

  const getSubtotal = () => {
    return Object.values(cartContents).length !== 0
      ? Object.values(cartContents).reduce((acc, item) => {
          return item.price * item.count + acc;
        }, 0)
      : 0;
  };

  return (
    <Container maxWidth="md">
      <div className={classes.headerContainer}>
        <Typography className={classes.title} variant="h4">
          Shopping Cart
        </Typography>
      </div>
      {Object.values(cartContents).length > 0 ? (
        <div>
          {Object.values(cartContents).map(item => (
            <CartItem item={item} key={item.id} />
          ))}
          <div className={classes.summaryBlock}>
            <div className={classes.summaryBlockRow}>
              <Typography className={classes.subtotal}>Shipping </Typography>
              <Typography className={classes.subtotal}>{`Free!`}</Typography>
            </div>
            <div className={classes.summaryBlockRow}>
              <Typography className={classes.subtotal}>Subtotal </Typography>
              <Typography className={classes.subtotal}>{`$${getSubtotal().toFixed(2)}`}</Typography>
            </div>
            <Divider className={classes.divider} />
            <Button color="primary" fullWidth variant="contained">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      ) : (
        <Typography className={classes.emptyCart} variant="h6">
          Your cart is empty
        </Typography>
      )}
    </Container>
  );
};

Cart.propTypes = {
  cartContents: PropTypes.objectOf(
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

const mapStateToProps = state => ({
  cartContents: state.cartContents
});

export default connect(mapStateToProps, null)(Cart);
