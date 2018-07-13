/* Using React-Router v3 */

import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { gStyles } from '../../ui/Styles';

import Signup from '../../ui/pages/Signup';
import Dashboard from '../../ui/pages/Dashboard';
import NotFound from '../../ui/pages/NotFound';
import Login from '../../ui/pages/Login';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/dashboard');
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};
export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};

const theme = createMuiTheme({
  palette: {
    primary: {
      light: gStyles.palette.primary.light,
      main: gStyles.palette.primary.main,
      dark: gStyles.palette.primary.dark,
      contrastText: gStyles.palette.primary.contrastText,
    },
  },
});

export const routes = (
  <MuiThemeProvider theme={theme}>
    <Router history={browserHistory}>
      <Route path="/" component={Login} onEnter={onEnterPublicPage} />
      <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
      <Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage} />
      <Route path="*" component={NotFound} />
    </Router>
  </MuiThemeProvider>
);
