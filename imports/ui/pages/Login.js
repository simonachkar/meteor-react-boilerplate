import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { PulseLoader } from 'react-spinners';
import { TextField, Typography, Grid, Button } from '@material-ui/core';
import { gStyles } from '../Styles';

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
          <PulseLoader
            color="#426cb4"
            loading={this.state.loading}
            size={10}
            margin="5px"
          />
          {this.state.error ?
            <Typography style={gStyles.error}>{this.state.error}</Typography> : undefined}
          <form noValidate>
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
