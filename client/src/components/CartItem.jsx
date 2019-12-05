import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Typography,
  Paper,
  IconButton,
  TextField,
  Divider,
  Button
} from '@material-ui/core';
import { Remove, Add } from '@material-ui/icons';

import * as actions from '../redux/actions';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1)
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  cartItem: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    height: '100%'
  },
  countControls: {
    display: 'flex',
    alignItems: 'center'
  },
  countField: {
    width: '50px',
    textAlign: 'center',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  rightContainer: {
    marginLeft: 'auto',
    width: '200px',
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  divider: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    alignSelf: 'stretch'
  }
}));

const validateCountField = fieldValue => {
  return Number.isSafeInteger(parseInt(fieldValue, 10)) && parseInt(fieldValue, 10) > 0;
};

const CartItem = ({ item, setItemCountAction, removeItemFromCartAction }) => {
  const classes = useStyles();
  const [countField, setCountField] = useState(item.count);

  useEffect(() => {
    setCountField(item.count);
    return () => {};
  }, [item.count]);

  const handleCountChange = event => {
    const {
      target: { value: newCount }
    } = event;
    setCountField(newCount);
    if (validateCountField(newCount)) {
      setItemCountAction(item.id, parseInt(newCount, 10));
    }
  };

  const handleSubtractButtonClicked = () => {
    if (validateCountField(countField)) {
      const newCount = parseInt(countField, 10) - 1;
      if (newCount === 0) return;
      setCountField(newCount);
      setItemCountAction(item.id, newCount);
      return;
    }
    setCountField(1);
    setItemCountAction(item.id, 1);
  };

  const handleAddButtonClicked = () => {
    if (validateCountField(countField)) {
      const newCount = parseInt(countField, 10) + 1;
      setCountField(newCount);
      setItemCountAction(item.id, newCount);
      return;
    }
    setCountField(1);
    setItemCountAction(item.id, 1);
  };

  const handleRemoveItemButtonClicked = () => {
    removeItemFromCartAction(item.id);
  };

  return (
    <Paper className={classes.cartItem}>
      <div className={classes.countControls}>
        <IconButton onClick={handleSubtractButtonClicked} size="small">
          <Remove />
        </IconButton>
        <TextField
          className={classes.countField}
          error={!validateCountField(countField)}
          onChange={handleCountChange}
          value={countField}
          variant="outlined"
        />
        <IconButton onClick={handleAddButtonClicked} size="small">
          <Add />
        </IconButton>
      </div>
      <div className={classes.divider}>
        <Divider orientation="vertical" />
      </div>
      <div>
        <Typography gutterBottom variant="h6">
          {`${item.year} ${item.make} ${item.model}`}
        </Typography>
        <Button onClick={handleRemoveItemButtonClicked} size="small" variant="outlined">
          Remove
        </Button>
      </div>
      <div className={classes.rightContainer}>
        <div className={classes.priceRow}>
          <Typography align="left">Item</Typography>
          <Typography align="right">Total</Typography>
        </div>
        <Divider />
        <div className={classes.priceRow}>
          <Typography align="left">{`${item.price.toFixed(2)}`}</Typography>
          <Typography align="right">{`${(item.price * item.count).toFixed(2)}`}</Typography>
        </div>
      </div>
    </Paper>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    color: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    make: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired
  }).isRequired,
  removeItemFromCartAction: PropTypes.func.isRequired,
  setItemCountAction: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  setItemCountAction: actions.setItemCountAction,
  removeItemFromCartAction: actions.removeItemFromCartAction
};

export default connect(null, mapDispatchToProps)(CartItem);
