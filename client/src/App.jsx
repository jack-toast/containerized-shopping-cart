import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MuiThemeProvider, makeStyles, CssBaseline, Divider } from '@material-ui/core';
import axios from 'axios';

import { MUI_DARK_THEME, MUI_LIGHT_THEME } from './muitheme';
import MyAppBar from './components/MyAppBar';
import Cart from './components/Cart';
import ShoppingArea from './components/ShoppingArea';
import * as Actions from './redux/actions';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(2)
    },
    ...theme.mixins.toolbar
  },
  content: {
    flex: 1
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

const App = ({
  fetchProductsErrorAction,
  fetchProductsPendingAction,
  fetchProductsSuccessAction
}) => {
  const classes = useStyles();
  const [useDarkTheme, setUseDarkTheme] = useState(false);

  useEffect(() => {
    const getCarDataFromAPI = async () => {
      console.log('getting datar');
      fetchProductsPendingAction();
      try {
        const response = await axios.get('/products');
        console.log('datar', response.data);
        if (response.data) {
          fetchProductsSuccessAction(response.data);
        }
      } catch (error) {
        fetchProductsErrorAction(error);
        console.error(error);
      }
    };
    getCarDataFromAPI();
    return () => {};
  }, []);

  const toggleTheme = () => {
    setUseDarkTheme(!useDarkTheme);
  };

  return (
    <MuiThemeProvider theme={useDarkTheme ? MUI_DARK_THEME : MUI_LIGHT_THEME}>
      <div className={classes.root}>
        <CssBaseline />
        <MyAppBar toggleTheme={toggleTheme} useDarkTheme={useDarkTheme} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <ShoppingArea />
          <Divider className={classes.divider} />
          <Cart />
        </main>
      </div>
    </MuiThemeProvider>
  );
};

App.propTypes = {
  fetchProductsErrorAction: PropTypes.func.isRequired,
  fetchProductsPendingAction: PropTypes.func.isRequired,
  fetchProductsSuccessAction: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  fetchProductsPendingAction: Actions.fetchProductsPendingAction,
  fetchProductsSuccessAction: Actions.fetchProductsSuccessAction,
  fetchProductsErrorAction: Actions.fetchProductsErrorAction
};

export default connect(null, mapDispatchToProps)(App);
