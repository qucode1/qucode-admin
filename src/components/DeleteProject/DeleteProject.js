import React, { Component } from 'react'
import axios                from 'axios'
import { Redirect }         from 'react-router-dom'
import variables            from '../../../variables.json'

class DeleteProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmed: false
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e) {
    e.preventDefault()
    const confirm = prompt(`Please confirm '${this.props.name}' deletion by confirming the name:`)
    confirm === this.props.name
    ? axios.delete(`${variables.PUBLICAPI}projects/${this.props.id}`)
      .then(function(res) {
        this.setState({
          confirmed: true
        })
      }.bind(this))
      .catch(function(err) {
        console.error(err)
      })
    : null
  }
  render() {
    return (
      <div className='deleteProjectContainer'>
        <button className='deleteProject' onClick={this.handleClick}>🗑</button>
        {this.state.confirmed && <Redirect push to={{
            pathname: '/cms/projects',
            state: { info: `Project: \'${this.props.name}\' has been deleted.`}}} />}
        <style jsx>{`
          .deleteProjectContainer {
            position: absolute;
            right:    15px;
            bottom:   15px
          }
          .deleteProject {
            width:            1.5em;
            height:           1.5em;
            font-size:        2em;
            border-radius:    50%;
            border:           none;
            cursor:           pointer;
            box-shadow:       0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24);
            background-color: #e71111;
            color:            #fff;
          }
        `}</style>
      </div>

    )
  }
}

export default DeleteProject
