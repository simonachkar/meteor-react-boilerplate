import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.email = React.createRef();
    this.password = React.createRef();
    this.state = {
      error: '',
    };
  }
  onSubmit(e) {
    e.preventDefault();

    const email = this.email.current.value.trim();
    const password = this.password.current.value.trim();

    if (password.length < 9) {
      return this.setState({
        error: 'Password must be more than 9 characters long',
      }); // using return to stop function execution
    }

    Accounts.createUser({ email, password }, (err) => {
      if (err) {
        this.setState({
          error: err.reason,
        });
      } else {
        this.setState({
          error: '',
        });
      }
    });
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join</h1>
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
