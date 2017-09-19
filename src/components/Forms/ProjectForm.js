import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import variables from '../../../variables.json'

class ProjectForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name          : '',
      active        : false,
      description   : '',
      image         : '',
      tags          : [],
      isChanged     : false,
      projectAdded  : false,
      initialState  : {
        name        : '',
        active      : false,
        description : '',
        image       : '',
        tags        : []
      }
    }
    this.changeInput        = this.changeInput.bind(this)
    this.handleSubmit       = this.handleSubmit.bind(this)
    this.handleChanges      = this.handleChanges.bind(this)
    this.handleChangedClass = this.handleChangedClass.bind(this)
    this.setInitialState    = this.setInitialState.bind(this)
  }
  setInitialState() {
    const initialState = this.state
    this.setState({ initialState: initialState})
  }
  componentDidMount() {

    if (this.props.project){
      this.setState({
        name:        this.props.project.name,
        active:      this.props.project.active,
        description: this.props.project.description,
        image:       this.props.project.image,
        tags:        this.props.project.tags
      }, this.setInitialState)

    } else if (this.props.edit) {
      const getProject = async() => {
        try {
          let project = await fetch(`${variables.PUBLICAPI}projects/${this.props.match.params.id}`)
          project       = await project.json()
          this.setState({
            name:         project.name,
            active:       project.active,
            description:  project.description,
            image:        project.image,
            tags:         project.tags
          })
          this.setInitialState()
        } catch(err) {
          console.error(err)
          res.json(err)
        }
      }
      getProject()
    }
  }
  changeInput (e) {
    const key = e.target.name
    const getValue = () => {
      if ( e.target.type === "radio") {
      return e.target.value === "true"
        ? true
        : false
      } else if( e.target.type === "file") {
        return e.target.files[0]
      }
      else { return e.target.value }
    }
    let value = getValue()
    this.setState({
      [key]: value
    }, this.handleChanges)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({
      info: {
        status: 'transfer',
        message: 'Sending Data...'
      }
    })

    const formData = new FormData();
    formData.append('name'        , this.state.name)
    formData.append('description' , this.state.description)
    formData.append('image'       , this.state.image)
    formData.append('tags'        , this.state.tags)
    formData.append('active'      , this.state.active)
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    }
    const editRoute   = `${variables.PUBLICAPI}projects/${this.props._id}`
    const createRoute = `${variables.PUBLICAPI}projects`
    const postRoute   = this.props.edit ? editRoute : createRoute

    axios.post(postRoute, formData, config)
    .then(function(res) {
      this.setState({ projectAdded: res.data})
      this.setState({
        info: {
          status: 'success',
          message: `Project: '${formData.name}' has been saved`,
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
          message: `Project: '${formData.name}' update failed. Please try again later.`
        }
      })
      setTimeout(() => this.setState({ info: { status: 'idle', message: '...'} }), 10000)
      console.error(err)
    }.bind(this))
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
      descriptionInput: {
        ref:     this.descriptionInput,
        changed: false
      },
      imageInput: {
        ref:     this.imageInput,
        changed: false
      }
    }
    const state       = this.state
    const first       = this.state.initialState
    const name        = state.name        !== first.name
    const description = state.description !== first.description
    const image       = state.image       !== first.image
    const tags        = state.tags        !== first.tags
    const active      = state.active      !== first.active
    //compare each input and save in result in formFields
    name
      ? (formFields.nameInput.changed = true)
      : (formFields.nameInput.changed = false)
    description
      ? (formFields.descriptionInput.changed = true)
      : (formFields.descriptionInput.changed = false)
    image
      ? (formFields.imageInput.changed = true)
      : (formFields.imageInput.changed = false)
    active
      ? (formFields.statusButtons.changed = true)
      : (formFields.statusButtons.changed = false)
    if( name || description || image || active ) { // if there are any changes set isChanged state and render save Btn
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
    return (
      <form
        onSubmit={this.handleSubmit}
        method='POST'
        encType='multipart/form-data'
      >
        {this.state.projectAdded && !this.props.edit
          ? <Redirect push to={{
              pathname: `/cms/projects/${this.state.projectAdded._id}`,
              state: this.state.projectAdded}} />
          : null
        }

        <label htmlFor='name'>Name</label>
        <input
          type='text'
          ref={(name) => this.nameInput = name}
          name='name'
          className='formElement'
          value={this.state.name}
          onChange={this.changeInput}
          placeholder='Project Name'
        />
        <div ref={(radio) => this.statusButtons = radio} className='formElement'>
          <input
            className='radioButton'
            type='radio'
            name='active'
            value={true}
            onChange={this.changeInput}
            checked={this.state.active ? true : false}
          />Public
          <input
            className='radioButton'
            type='radio'
            name='active'
            value={false}
            onChange={this.changeInput}
            checked={this.state.active ? false : true}
          />Private
        </div>
        <label htmlFor='description'>Description</label>
        <textarea
          name='description'
          ref={(text) => this.descriptionInput = text}
          rows='5'
          className='formElement'
          value={this.state.description}
          onChange={this.changeInput}
          placeholder='Project Description'
        />
        <label htmlFor='image'>Image</label>
        <input
          type='file'
          ref={(image) => this.imageInput = image}
          className='formElement file'
          onChange={this.changeInput}
          name='image'
          id='image'
          accept='image/*'
        />
        {this.state.isChanged
          && <input
            type='submit'
            className='formElement submit'
            value='Save Project'
          />
        }
        <style jsx>{`
          form {
            width: 100%;
            display: flex;
            flex-direction: column;
          }
          .radioButton {
            display: inline-block;
            width: auto
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
          .radioButton {
            margin: 0 5px;
            width:  auto;
            cursor: pointer
          }
          .file {
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
        `}</style>
      </form>
    )
  }
}

export default ProjectForm
