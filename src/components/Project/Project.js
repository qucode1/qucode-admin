import React           from 'react'
import axios           from 'axios'
import { Route, Link } from 'react-router-dom'
import NotFound        from '../NotFound/NotFound'
import DeleteProject       from '../DeleteProject/DeleteProject'
import variables       from '../../../variables.json'

class Project extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit       = this.handleSubmit.bind(this)
    this.changeInput        = this.changeInput.bind(this)
    this.handleChanges      = this.handleChanges.bind(this)
    this.handleChangedClass = this.handleChangedClass.bind(this)
    const content           = this.props.text ? this.props.text.content : ''

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
      name:    this.state.name,
      content: this.state.content,
      active:  this.state.active || false
    }
    const editRoute   = `${variables.PUBLICAPI}about/projects/${this.props._id}`
    const createRoute = `${variables.PUBLICAPI}about/projects`
    const postRoute   = this.props.newProject ? createRoute : editRoute

    axios.post(postRoute, data)
    .then(function(res) {
      this.setState({
        info: {
          status: 'success',
          message: `Project: '${data.name}' has been saved`,
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
          message: `Project: '${data.name}' update failed. Please try again later.`
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

  handleChanges() { //compare initialState with current State of each input and call hanldeChangedClass with results
    const formFields = {
      statusButtons: {
        ref:     this.statusButtons,
        changed: false
      },
      nameInput: {
        ref:     this.nameInput,
        changed: false
      },
      contentInput: {
        ref:     this.contentInput,
        changed: false
      }
    }
    const state   = this.state
    const first   = this.state.initialState
    const name    = state.name    !== first.name
    const content = state.content !== first.content
    const active  = state.active  !== first.active
    //compare each input and save in result in formFields
    name
      ? (formFields.nameInput.changed = true)
      : (formFields.nameInput.changed = false)
    content
      ? (formFields.contentInput.changed = true)
      : (formFields.contentInput.changed = false)
    active
      ? (formFields.statusButtons.changed = true)
      : (formFields.statusButtons.changed = false)
    if( name || content || active ) { // if there are any changes set isChanged state and render save Btn
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
      <div className={`project ${details ? 'card' : ''}`}>
        <h3>{details
            ? this.props.name
            : <Link to={`/cms/projects/${this.props._id}`}>{this.props.name}</Link>
        }</h3>

        {details && <div className={`status ${this.state.info.status}`}>{this.state.info.message}</div>}

        {details
          ? <form className='form' onSubmit={this.handleSubmit} method='POST'>
              <div ref={(radio) => this.statusButtons = radio} className='formElement'>
                <input className='radioButton' type='radio' name='active' value={true} onChange={this.changeInput} checked={this.state.active ? true : false}/>Public
                <input className='radioButton' type='radio' name='active' value={false} onChange={this.changeInput} checked={this.state.active ? false : true}/>Private
              </div>
              <input ref={(name) => this.nameInput = name} className='formElement textElement' type='text' name='name' value={this.state.name} onChange={this.changeInput} />
              <textarea ref={(text) => this.contentInput = text} className='formElement textElement' cols={30} projects={7} type='text' name='content' value={this.state.content} onChange={this.changeInput} />
              {this.state.isChanged && <button className='submit formElement' type='submit'>Save</button>}
            </form>
          : null //do not render form if details have not been requested
        }

        {(details && skills) // map skills if there are any otherwise continue
        ? skills.map( skill => (
          <p key={skill._id}>{skill.name}</p>
        ))
        : null
        }

        {details && <Link className='' to='/cms/projects' >Go back to Projects</Link>}

        {details && !this.props.newProject && <DeleteProject name={this.props.name} id={this.props._id}/> /*only render delete Btn on edit view*/}

        <style jsx>{`
          .project {
            padding: 0 5px
          }
          .card {
            box-shadow: 0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.15);
            background-color: #fff;
            padding:    15px 10px;
            margin:     15px auto;
            width:      90%;
            max-width:  700px;
          }
          .container {
            display:        flex;
            flex-direction: column;
            align-items:    flex-start;
            padding:        10px
          }
          .form {
            display:        flex;
            flex-direction: column;
            align-items:    flex-start;
          }
          .formElement {
            margin:      5px 0;
            padding:     5px;
            box-sizing:  border-box;
            background-color: rgb(247, 247, 247);
            width:       100%;
            border:      2px solid transparent;
            border-left: 4px solid #22bbee;
            box-shadow:  0 0 2px rgba(0,0,0,.12), 0 2px 3px rgba(0,0,0,.15);
            outline:     none
          }
          .formElement:focus, .formElement:active {
            box-shadow:  0 0 0px rgba(0,0,0,.12), 0 -2px 3px rgba(0,0,0,.15);
            background-color: rgb(255, 247, 227);
          }
          .textElement {

          }
          .radioButton {
            margin: 0 5px;
            width:  auto;
            cursor: pointer
          }
          .status {
            opacity:       0;
            box-sizing:    border-box;
            transition:    .2s ease-in-out;
            width:         100%;
            border-radius: 5px;
            font-size:     1.2em;
            margin:        5px auto;
            padding:       7px;
            text-align:    center;
          }
          .transfer {
            opacity: 0;
            background-color: rgb(83, 172, 245);
            color:            #fff
          }
          .failure {
            opacity: 1;
            background-color: rgb(251, 51, 51);
            color:            #fff
          }
          .success {
            opacity: 1;
            background-color: rgb(107, 228, 96);
            color:            #fff
          }
          .changed {
            border-left: 4px solid #ffd100
          }
          .submit {
            border:           none;
            cursor:           pointer;
            padding:          10px;
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

export default Project
