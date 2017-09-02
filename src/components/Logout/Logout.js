import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Auth from '../../modules/Auth'

class Logout extends Component {
  render() {
    Auth.deauthenticateUser()
    return (
      <Redirect to={`${this.props.location.pathname}`} />
    )
  }
}

export default Logout
