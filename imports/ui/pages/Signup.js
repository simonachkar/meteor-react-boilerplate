import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { PulseLoader } from 'react-spinners';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.email = React.createRef();
    this.password = React.createRef();
    this.state = {
      error: '',
      loading: false,
    };
  }
  onSubmit(e) {
    e.preventDefault();

    this.setState({
      error: '',
      loading: true,
    });

    const email = this.email.current.value.trim();
    const password = this.password.current.value.trim();

    if (password.length < 9) {
      return this.setState({
        error: 'Password must be more than 9 characters long',
        loading: false,
      }); // using return to stop function execution
    }

    Accounts.createUser({ email, password }, (err) => {
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
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join</h1>
          <PulseLoader
            color="#426cb4"
            loading={this.state.loading}
            size={10}
            margin="5px"
            padding="5px"
          />
          {this.state.error ? <p className="error">{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref={this.email} name="email" placeholder="Email" />
            <input type="password" ref={this.password} name="password" placeholder="Password" />
            <button className="button">Create Account</button>
          </form>
          <Link to="/">Already have an account?</Link>
        </div>
      </div>
    );
  }
}
