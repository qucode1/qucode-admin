import React from 'react'
import Auth from '../../modules/Auth'
import variables from '../../../variables.json'
import axios from 'axios'
import LoginForm from './LoginForm'
import { Redirect } from 'react-router-dom'

class Login extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      errors: {},
      successMessage,
      user: {
        email: '',
        password: ''
      },
      didLogin: false
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    // if the previous page was /login as well, set didLogin to enable a redirect
    if (this.props.location === "/login" && Auth.isUserAuthenticated()) {
      this.setState({
        didLogin: true
      })
    }
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(e) {
    // prevent default action. in this case, action is the form submission event
    e.preventDefault();


    const data = {
      email: this.state.user.email,
      password: this.state.user.password
    }

    const loginRoute = `${variables.PUBLICAPI}login`

    axios.post(loginRoute, data)
    .then(function(res) {
      Auth.authenticateUser(res.data.token)
      this.setState({
        errors: {}
      })

    }.bind(this))
    .then(function() {
      if(Object.keys(this.state.errors).length === 0) {
        this.props.history.go(-1)
      }
    }.bind(this))
    .catch(function(err) {
      const errors = err.errors ? err.errors : {}
      errors.summary = err.message
      this.setState({
        errors
      })
    }.bind(this))

  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(e) {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;

    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <LoginForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.state.errors}
          successMessage={this.state.successMessage}
          user={this.state.user}
        />
        {this.state.didLogin && <Redirect to="/cms" />}
      </div>
    );
  }

}


export default Login;
