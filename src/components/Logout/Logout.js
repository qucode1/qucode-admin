import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Auth from '../../modules/Auth'

class Logout extends Component {
  render() {
    Auth.deauthenticateUser()
    this.props.history.go(-1)
    return (
      <h1></h1>
    )
  }
}

export default Logout
