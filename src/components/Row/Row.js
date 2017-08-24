import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import variables from '../../../variables.json'

class Row extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeInput = this.changeInput.bind(this)
    const content = this.props.text ? this.props.text.content : ''

    this.state = ({
      name:    this.props.name,
      content: content,
      skills:  this.props.skills,
      active:  this.props.active,
      info: {
        status: 'idle',
        message: '...'
      }
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    this.setState({
      info: {
        status: 'transfer',
        message: 'Sending Data...'
      }
    })
    const data = {
      name: this.state.name,
      content: this.state.content,
      active: this.state.active
    }
    const postRoute = `${variables.PUBLICAPI}about/rows/${this.props._id}`

    axios.post(postRoute, data)
    .then(function(res) {
      console.log('success')

      this.setState({
        info: {
          status: 'success',
          message: `Row: '${data.name}' has been updated`
        }
      })
      setTimeout(() => this.setState({ info: { status: 'idle', message: '...'} }), 10000)
    }.bind(this))
    .catch(function(err) {
      this.setState({
        info: {
          status: 'failure',
          message: `Row: '${data.name}' update failed. Please try again later.`
        }
      })
      setTimeout(() => this.setState({ info: { status: 'idle', message: '...'} }), 10000)
      console.error(err)
    }.bind(this))
  }

  changeInput (e) {
    const name = e.target.name
    const value = ( e.target.type === "radio")
      ? (e.target.value === "true"
        ? true
        : false)
      : e.target.value
    this.setState({
      [name]: value
    })
  }

  render() {
    const details = this.props.details
    const skills  = this.state.skills
    return (
      <div className='row'>
        <h3>{details
            ? this.props.name
            : <Link to={`/rows/${this.props._id}`}>{this.props.name}</Link>
        }</h3>
        {details && <div className={`status ${this.state.info.status}`}>{this.state.info.message}</div>}
        {details
          ? <form className='form' onSubmit={this.handleSubmit} method='POST'>
              <div className='formElement'>
                <input className='radioButton formElement' type='radio' name='active' value={true} onChange={this.changeInput} checked={this.state.active ? true : false}/>Public
                <input className='radioButton formElement' type='radio' name='active' value={false} onChange={this.changeInput} checked={this.state.active ? false : true}/>Private
              </div>
              <input className='formElement' type='text' name='name' value={this.state.name} onChange={this.changeInput} />
              <textarea className='formElement' cols={30} rows={5} type='text' name='content' value={this.state.content} onChange={this.changeInput} />
              <button className='formElement' type='submit'>Save Changes</button>
            </form>
          : null
        }
        {(details && skills)
        ? skills.map( skill => (
          <p key={skill._id}>{skill.name}</p>
        ))
        : null
        }
        {details && <Link to='/rows' >Go back to Rows</Link>}
        <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 10px
          }
          .form {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          .formElement {
            margin: 5px 0;
            padding: 5px
          }
          .radioButton {
            margin: 0 5px
          }
          .status {
            opacity: 0;
            transition: .2s ease-in-out;
            width: 90%;
            border-radius: 5px;
            margin: auto;
            padding: 3px;
            text-align: center;
          }
          .transfer {
            opacity: 0;
            background-color: rgb(83, 172, 245);
            color: #fff
          }
          .failure {
            opacity: 1;
            background-color: rgb(251, 51, 51);
            color: #fff
          }
          .success {
            opacity: 1;
            background-color: rgb(107, 228, 96);
            color: #fff
          }
        `}</style>
      </div>
    )
  }
}

export default Row
