import React from 'react'
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
import NotFound from '../NotFound/NotFound'
import DeleteRow from '../DeleteRow/DeleteRow'
import variables from '../../../variables.json'

class Row extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeInput = this.changeInput.bind(this)
    this.handleChanges = this.handleChanges.bind(this)
    this.handleChangedClass = this.handleChangedClass.bind(this)
    const content = this.props.text ? this.props.text.content : ''

    this.state = ({
      name:    this.props.name,
      content: content,
      skills:  this.props.skills,
      active:  this.props.active,
      info: {
        status: 'idle',
        message: '...'
      },
      isChanged: false,
      initialState: {}
    })
  }
  componentDidMount() {
    const state = this.state
    this.setState({ initialState: state })
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
      active: this.state.active || false
    }
    const editRoute = `${variables.PUBLICAPI}about/rows/${this.props._id}`
    const createRoute = `${variables.PUBLICAPI}about/rows`
    const postRoute = this.props.newRow ? createRoute : editRoute

    axios.post(postRoute, data)
    .then(function(res) {
      this.setState({
        info: {
          status: 'success',
          message: `Row: '${data.name}' has been saved`,
          isChanged: false
        }
      })
      const newState = this.state
      this.setState({
        initialState: newState
      })
      this.handleChanges()
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
    const key = e.target.name
    const value = ( e.target.type === "radio")
      ? (e.target.value === "true"
        ? true
        : false)
      : e.target.value
    this.setState({
      [key]: value
    }, this.handleChanges)
  }

  handleChanges() {
    const formFields = {
      statusButtons: {
        ref: this.statusButtons,
        changed: false
      },
      nameInput: {
        ref: this.nameInput,
        changed: false
      },
      contentInput: {
        ref: this.contentInput,
        changed: false
      }
    }
    const state   = this.state
    const first   = this.state.initialState
    const name    = state.name    !== first.name
    const content = state.content !== first.content
    const active  = state.active  !== first.active
    name
      ? (formFields.nameInput.changed = true)
      : (formFields.nameInput.changed = false)
    content
      ? (formFields.contentInput.changed = true)
      : (formFields.contentInput.changed = false)
    active
      ? (formFields.statusButtons.changed = true)
      : (formFields.statusButtons.changed = false)
    if( name || content || active ) {
      this.setState({
        isChanged: true
      })
    } else {
      this.setState({
        isChanged: false
      })
    }
    this.handleChangedClass(formFields)
  }

  handleChangedClass(formFields) {
    const formFieldKeys = Object.keys(formFields)
    formFieldKeys.map(key => {
      formFields[key].changed
        ? formFields[key].ref.classList.add('changed')
        : formFields[key].ref.classList.remove('changed')
    })
  }

  render() {
    const details = this.props.details
    const skills  = this.state.skills
    return (
      <div className={`row ${details ? 'card' : ''}`}>
        <h3>{details
            ? this.props.name
            : <Link to={`/cms/rows/${this.props._id}`}>{this.props.name}</Link>
        }</h3>
        {details && <div className={`status ${this.state.info.status}`}>{this.state.info.message}</div>}
        {details
          ? <form className='form' onSubmit={this.handleSubmit} method='POST'>
              <div ref={(radio) => this.statusButtons = radio} className='formElement'>
                <input className='radioButton' type='radio' name='active' value={true} onChange={this.changeInput} checked={this.state.active ? true : false}/>Public
                <input className='radioButton' type='radio' name='active' value={false} onChange={this.changeInput} checked={this.state.active ? false : true}/>Private
              </div>
              <input ref={(name) => this.nameInput = name} className='formElement textElement' type='text' name='name' value={this.state.name} onChange={this.changeInput} />
              <textarea ref={(text) => this.contentInput = text} className='formElement textElement' cols={30} rows={7} type='text' name='content' value={this.state.content} onChange={this.changeInput} />
              {this.state.isChanged && <button className='submit formElement' type='submit'>Save</button>}
            </form>
          : null
        }
        {(details && skills)
        ? skills.map( skill => (
          <p key={skill._id}>{skill.name}</p>
        ))
        : null
        }
        {details && <Link to='/cms/rows' >Go back to Rows</Link>}
        {details && !this.props.newRow && <DeleteRow name={this.props.name} id={this.props._id}/>}
        <style jsx>{`
          .row {
            padding: 0 5px
          }
          .card {
            box-shadow: 0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24);
            padding: 10px;
            margin: 15px auto;
            width: 90%;
            max-width: 700px;
          }
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
            padding: 5px;
            box-sizing: border-box;
            width: 100%;
            border: 2px solid transparent;
            border-left: 4px solid #22bbee;
            box-shadow: 0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24);
            outline: none
          }
          .textElement {

          }
          .radioButton {
            margin: 0 5px;
            width: auto
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
          .changed {
            border-left: 4px solid #ffd100
          }
          .submit {
            border: none;
            cursor: pointer;
            padding: 10px;
            background-color: #ffd100
          }
          h3 {
            margin: 0
          }
        `}</style>
      </div>
    )
  }
}

export default Row
