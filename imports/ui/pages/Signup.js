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

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      loading: false,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
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
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;

    if (password.length < 9) {
      return this.setState({
        error: 'Password must be more than 9 characters long',
        loading: false,
      }); // using return to stop function execution
    }

    Meteor.call('users.create', email, password, { firstName, lastName }, (err) => {
      if (err) {
        this.setState({
          error: err.reason,
          loading: false,
        });
      } else {
        this.setState({
          error: '',
          loading: false,
        });
      }
    });

    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({
          error: 'Unable to login check email and password',
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
            Signup
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
              <Grid
                container
                spacing={8}
                direction="row"
                justify="space-between"
              >
                <TextField
                  id="firstName"
                  label="First Name"
                  value={this.state.firstName}
                  onChange={e => this.handleChange('firstName', e)}
                  margin="normal"
                  required
                />
                <TextField
                  id="lastName"
                  label="Last Name"
                  value={this.state.lastName}
                  onChange={e => this.handleChange('lastName', e)}
                  margin="normal"
                  required
                />
              </Grid>
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
                value={this.state.password}
                onChange={e => this.handleChange('password', e)}
                margin="normal"
                type="password"
                required
              />
              <Button variant="contained" color="primary" style={styles.button} onClick={this.onSubmit.bind(this)}>
                Signup
              </Button>
            </Grid>
          </form>
          <Link to="/"><Button>Already have an account?</Button></Link>
        </div>
      </div>
    );
  }
}
