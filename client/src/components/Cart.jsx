import React from 'react';
import { connect } from 'react-redux';
import { makeStyles, Container, Typography, Card, CardContent, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {}
}));

const Cart = ({ cartContents }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Typography variant="h4">Cart</Typography>
      {Object.keys(cartContents).map(itemKey => {
        return (
          <Paper key={itemKey}>
            <Typography>{cartContents[itemKey].make}</Typography>
          </Paper>
        );
      })}
    </Container>
  );
};

const mapStateToProps = state => ({
  cartContents: state.cartContents
});

export default connect(mapStateToProps, null)(Cart);
