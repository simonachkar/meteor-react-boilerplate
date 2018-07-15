import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Accounts } from 'meteor/accounts-base';

const styles = {
  root: {
    marginBottom: 10,
    flexGrow: 2,
  },
  flex: {

  },
  bar: {
    paddingLeft: 100,
    paddingRight: 100,
  },
  title: {
    fontWeight: 200,
    fontSize: 32,
    flex: 2,
  },
};

const Header = props => (
  <div style={styles.root}>
    <AppBar position="static">
      <Toolbar style={styles.bar}>
        <Typography color="inherit" style={styles.title}>
          {props.title}
        </Typography>
        <Button color="inherit" style={styles.flex} onClick={() => Accounts.logout()}>Logout</Button>
      </Toolbar>
    </AppBar>
  </div>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
