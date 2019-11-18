import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { Brightness2, WbSunny, Refresh } from '@material-ui/icons';

import * as Actions from '../redux/actions';

const useStyles = makeStyles(theme => ({
  toolbar: {
    position: 'relative',
    display: 'flex'
  },
  title: {
    position: 'absolute',
    left: '50%',
    transform: `translateX(-50%)`
  },
  themeChangeButton: {
    marginLeft: 'auto'
  }
}));

const MyAppBar = ({
  useDarkTheme,
  toggleTheme,
  fetchProductsErrorAction,
  fetchProductsPendingAction,
  fetchProductsSuccessAction
}) => {
  const classes = useStyles();

  // const getCarDataFromAPI = async () => {
  //   console.log('getting datar');
  //   fetchProductsPendingAction();
  //   try {
  //     const response = await axios.get('/products');
  //     console.log('datar', response.data);
  //     if (response.data) {
  //       fetchProductsSuccessAction(response.data);
  //     }
  //   } catch (error) {
  //     fetchProductsErrorAction(error);
  //     console.error(error);
  //   }
  // };

  // const handleRefreshClicked = () => {
  //   console.log('refresh clicked');
  //   getCarDataFromAPI();
  // };

  return (
    <AppBar position="fixed">
      <Toolbar>
        {/* <IconButton color="inherit" onClick={handleRefreshClicked}>
          <Refresh />
        </IconButton> */}
        <Typography className={classes.title} variant="h5">
          Shopping Sim 2019
        </Typography>
        <IconButton className={classes.themeChangeButton} color="inherit" onClick={toggleTheme}>
          {useDarkTheme ? <Brightness2 /> : <WbSunny />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

MyAppBar.propTypes = {
  fetchProductsErrorAction: PropTypes.func.isRequired,
  fetchProductsPendingAction: PropTypes.func.isRequired,
  fetchProductsSuccessAction: PropTypes.func.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  useDarkTheme: PropTypes.bool.isRequired
};

const mapDispatchToProps = {
  fetchProductsPendingAction: Actions.fetchProductsPendingAction,
  fetchProductsSuccessAction: Actions.fetchProductsSuccessAction,
  fetchProductsErrorAction: Actions.fetchProductsErrorAction
};

export default connect(null, mapDispatchToProps)(MyAppBar);
