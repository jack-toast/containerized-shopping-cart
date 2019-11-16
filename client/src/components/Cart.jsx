import React from 'react';
import { makeStyles, Container, Typography, Card, CardContent } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {}
}));

const Cart = ({}) => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Typography variant="h3">Cart</Typography>
      {['item1', 'item2', 'item3'].map(item => {
        return (
          <Card key={item} title={item}>
            <CardContent>{item}</CardContent>
          </Card>
        );
      })}
    </Container>
  );
};

export default Cart;
