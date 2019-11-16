import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import { Brightness2, WbSunny } from '@material-ui/icons';

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

const MyAppBar = ({ useDarkTheme, toggleTheme }) => {
  const classes = useStyles();
  return (
    <AppBar position="fixed">
      <Toolbar>
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
  toggleTheme: PropTypes.func.isRequired,
  useDarkTheme: PropTypes.bool.isRequired
};

export default MyAppBar;
