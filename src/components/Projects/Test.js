import React, { Component } from 'react'
import axios from 'axios'
import variables from '../../../variables.json'

class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: []
    }
  }
  componentDidMount() {
    const projectRoute = `${variables.PUBLICAPI}projects`

    axios.get(projectRoute)
    .then(function (res) {
      this.setState({
        projects: res
      })
      console.log(this.state.projects)
    }.bind(this))
    .catch(function(err) {
      if(err) console.error(err)
    }.bind(this))
  }
  render() {
    return (
      <h3>Testing AWS</h3>
    )
  }
}

export default Test
