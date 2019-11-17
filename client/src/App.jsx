import React, { useState } from 'react';
import { MuiThemeProvider, makeStyles, CssBaseline, Divider } from '@material-ui/core';

import { MUI_DARK_THEME, MUI_LIGHT_THEME } from './muitheme';
import MyAppBar from './components/MyAppBar';
import Cart from './components/Cart';
import ShoppingArea from './components/ShoppingArea';

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

function App() {
  const classes = useStyles();
  const [useDarkTheme, setUseDarkTheme] = useState(false);

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
}

export default App;
