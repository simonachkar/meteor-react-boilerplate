import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { TextField, Typography, Grid, Button, CircularProgress } from '@material-ui/core';
import { gStyles } from '../styles/Styles';

const styles = {
  button: {
    margin: 20,
    marginLeft: 60,
    marginRight: 60,
  },
  title: {
    color: gStyles.palette.primary.main,
    fontWeight: 'bold',
    margin: 10,
  },
  progress: {
    margin: 10,
  },
  invisible: {
    position: 'absolute',
    left: '-9999px',
    width: '1px',
    height: '1px',
  },
};

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      loading: false,
      email: '',
      password: '',
    };
  }
  onSubmit(e) {
    e.preventDefault();

    this.setState({
      error: '',
      loading: true,
    });

    const email = this.state.email;
    const password = this.state.password;

    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({
          error: `Unable to login - ${err.reason}`,
          loading: false,
        });
      } else {
        this.setState({
          error: '',
          loading: false,
        });
      }
    });
  }

  handleChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  render() {
    return (
      <div style={gStyles.boxedView}>
        <div style={gStyles.boxedView__box}>
          <Typography variant="title" color="inherit" style={styles.title}>
          Login
          </Typography>
          { this.state.loading && <CircularProgress size={30} style={styles.progress} /> }
          {this.state.error ?
            <Typography style={gStyles.error}>{this.state.error}</Typography> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} noValidate>
            <Grid
              container
              spacing={8}
              direction="column"
              justify="space-between"
            >
              <TextField
                id="email"
                label="Email"
                value={this.state.email}
                onChange={e => this.handleChange('email', e)}
                margin="normal"
                required
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                value={this.state.password}
                onChange={e => this.handleChange('password', e)}
                margin="normal"
                required
              />
              <input
                type="submit"
                style={styles.invisible}
                tabIndex="-1"
              />
              <Button variant="contained" color="primary" style={styles.button} onClick={this.onSubmit.bind(this)}>
                Login
              </Button>
            </Grid>
          </form>
          <Link to="/signup"><Button>Need an account?</Button></Link>
        </div>
      </div>
    );
  }
}
