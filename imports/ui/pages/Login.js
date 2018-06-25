import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { PulseLoader } from 'react-spinners';

export default class Login extends React.Component {
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

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box ">
          <h1>Login</h1>
          <PulseLoader
            color="#426cb4"
            loading={this.state.loading}
            size={10}
            margin="5px"
          />
          {this.state.error ? <p className="error">{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref={this.email} name="email" placeholder="Email" />
            <input type="password" ref={this.password} name="password" placeholder="Password" />
            <button className="button">Login</button>
          </form>
          <Link to="/signup">Need an account?</Link>
        </div>
      </div>
    );
  }
}
