import React, { PropTypes } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import SignUpForm from './SignupForm'
import variables from '../../../variables.json'

class Signup extends React.Component {

  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      },
      didSignUp: false
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processForm(e) {
    // prevent default action. in this case, action is the form submission event
    e.preventDefault();

    const data  = {
      name: this.state.user.name,
      email: this.state.user.email,
      password: this.state.user.password
    }

    const signupRoute = `${variables.PUBLICAPI}signup`

    axios.post(signupRoute, data)
    .then(function(res) {
      localStorage.setItem('successMessage', res.message)
      this.setState({
        errors: {},
        didSignUp: true
      })
    }.bind(this))
    .catch(function(err) {
      const errors = err.errors ? err.errors : {}
      errors.summary = err.message
      this.setState({
        errors
      })
    }.bind(this))
  }

  changeUser(e) {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;

    this.setState({
      user
    });
  }

  render() {
    return (
      <div>
        <SignUpForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.state.errors}
          user={this.state.user}
        />
        {this.state.didSignUp && <Redirect to='/login' /> }
      </div>
    );
  }

}

export default Signup;
