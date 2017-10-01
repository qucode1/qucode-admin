import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import DeleteProject from '../DeleteProject/DeleteProject'
import axios from 'axios'
import variables from '../../../variables.json'

class ProjectForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name          : '',
      active        : false,
      description   : '',
      liveUrl       : '',
      github        : '',
      tags          : [],
      imageLink     : '',
      newTag        : '',
      isChanged     : false,
      projectAdded  : false,
      initialState  : {
        name        : '',
        active      : false,
        description : '',
        liveUrl     : '',
        github      : '',
        liveUrl     : '',
        github      : '',
        tags        : []
      }
    }
    this.changeInput        = this.changeInput.bind(this)
    this.handleSubmit       = this.handleSubmit.bind(this)
    this.handleChanges      = this.handleChanges.bind(this)
    this.handleChangedClass = this.handleChangedClass.bind(this)
    this.setInitialState    = this.setInitialState.bind(this)
    this.addTag             = this.addTag.bind(this)
  }
  setInitialState() {
    // console.log("set init state")
    const initialState = this.state
    this.initialState  = Object.assign({}, initialState)
    this.initialState.tags = [].concat(this.initialState.tags)
  }
  componentDidMount() {
    // console.log("comp did mount")
    if (this.props.project){
      this.setState({
        name:        this.props.project.name,
        active:      this.props.project.active,
        description: this.props.project.description,
        liveUrl    : this.props.project.liveUrl,
        github     : this.props.project.github,
        tags:        this.props.project.tags,
        imageLink:   this.props.project.image
      }, this.setInitialState)

    } else if (this.props.edit && this.props.match.params.id) {
      const getProject = async() => {
        try {
          let project = await fetch(`${variables.PUBLICAPI}projects/${this.props.match.params.id}`)
          project       = await project.json()
          this.setState({
            name:         project.name,
            active:       project.active,
            description:  project.description,
            liveUrl     : project.liveUrl,
            github      : project.github,
            tags:         project.tags,
            imageLink:    project.image
          })
          this.setInitialState()
        } catch(err) {
          console.error(err)
          res.json(err)
        }
      }
      getProject()
    } else {
      this.setInitialState()
    }
  }

  componentWillUpdate(nextProps, nextState) {
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
    formData.append('liveUrl'     , this.state.liveUrl)
    formData.append('github'      , this.state.github)
    formData.append('tags'        , this.state.tags)
    formData.append('active'      , this.state.active)
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    }
    const editRoute   = `${variables.PUBLICAPI}projects/${this.props.match
      ? this.props.match.params.id
      : ''
    }`
    const createRoute = `${variables.PUBLICAPI}projects`
    const postRoute   = this.props.edit ? editRoute : createRoute

    axios.post(postRoute, formData, config)
    .then(function(res) {
      if(postRoute === createRoute) {
        this.setState({
          projectAdded: res.data,
          info: {
            status: 'success',
            message: `Project: '${this.state.name}' has been created`
          },
          isChanged: false
        })
      } else {
        // console.log(res)
        this.setState({
          info: res.data,
          isChanged: false
        })
        this.setInitialState()
        this.handleChanges()
      }
    }.bind(this))
    .catch(function(err) {
      this.setState({
        info: {
          status: 'failure',
          message: `Project: '${this.initialState.name}' update failed. Please try again later.`
        }
      })
      setTimeout(() => this.setState({ info: null }), 10000)
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
      liveUrlInput: {
        ref:     this.liveUrlInput,
        changed: false
      },
      githubInput: {
        ref:     this.githubInput,
        changed: false
      },
      descriptionInput: {
        ref:     this.descriptionInput,
        changed: false
      },
      imageInput: {
        ref:     this.imageInput,
        changed: false
      },
      tagList: {
        ref    : this.tagList,
        changed: false
      }
    }
    const state       = this.state
    const first       = this.initialState
    const name        = state.name        !== first.name
    const description = state.description !== first.description
    const liveUrl     = state.liveUrl     !== first.liveUrl
    const github      = state.github      !== first.github
    const image       = state.image       !== first.image
    const tags        = state.tags.length !== first.tags.length
    const active      = state.active      !== first.active
    //compare each input and save in result in formFields
    name
      ? (formFields.nameInput.changed = true)
      : (formFields.nameInput.changed = false)
    description
      ? (formFields.descriptionInput.changed = true)
      : (formFields.descriptionInput.changed = false)
    liveUrl
      ? (formFields.liveUrlInput.changed = true)
      : (formFields.liveUrlInput.changed = false)
    github
      ? (formFields.githubInput.changed = true)
      : (formFields.githubInput.changed = false)
    image
      ? (formFields.imageInput.changed = true)
      : (formFields.imageInput.changed = false)
    active
      ? (formFields.statusButtons.changed = true)
      : (formFields.statusButtons.changed = false)
    tags
      ? (formFields.tagList.changed = true)
      : (formFields.tagList.changed = false)
    // if there are any changes set isChanged state and render save Btn
    if( name || description || liveUrl || github || image || active || tags) {
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

  addTag(e) {
    e.preventDefault()
    let tags = this.state.tags
    let newTag = this.newTag.value
    tags.push(newTag)
    this.setState({
        tags: tags,
        newTag: ''
    }, this.handleChanges)
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
              state: {
                project : this.state.projectAdded,
                info    : this.state.info
              }
            }} />
          : null
        }
        {this.props.info ? <div className={`status ${this.props.info ? this.props.info.status : ''}`}>{this.props.info.message}</div> : null}
        {this.state.info ? <div className={`status ${this.state.info ? this.state.info.status : ''}`}>{this.state.info.message}</div> : null}
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
        <label>Status</label>
        <div ref={(radio) => this.statusButtons = radio} className='formElement output'>
          <input
            className='radioButton'
            type='radio'
            name='active'
            value='true'
            onChange={this.changeInput}
            checked={this.state.active ? true : false}
          />Public
          <input
            className='radioButton'
            type='radio'
            name='active'
            value='false'
            onChange={this.changeInput}
            checked={this.state.active ? false : true}
          />Private
        </div>
        <label htmlFor='liveUrl'>Live Url</label>
        <input
          type='text'
          ref={(liveUrl) => this.liveUrlInput = liveUrl}
          name='liveUrl'
          className='formElement'
          value={this.state.liveUrl}
          onChange={this.changeInput}
          placeholder='Live Url'
        />
        <label htmlFor='github'>Github Repo</label>
        <input
          type='text'
          ref={(github) => this.githubInput = github}
          name='github'
          className='formElement'
          value={this.state.github}
          onChange={this.changeInput}
          placeholder='Github Repo'
        />
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
        {this.state.imageLink && <div className='formElement output'><img src={`${variables.AWSPROJECTS}thumbnails/${this.state.imageLink}`} className='thumbnail'></img></div>}
        <input
          type='file'
          ref={(image) => this.imageInput = image}
          className='formElement file'
          onChange={this.changeInput}
          name='image'
          id='image'
          accept='image/*'
        />
        <label>Tags</label>
        <ul
          ref={(tagList) => this.tagList = tagList}
          className='formElement output'
        >
          <input
            type='text'
            ref={(newTag) => this.newTag = newTag}
            name='newTag'
            value={this.state.newTag}
            onChange={this.changeInput}
            placeholder='New Tag'
          />
          <button onClick={this.addTag}>Add Tag</button>
          {this.state.tags.map((tag) => (
            <li key={tag} className={`tag ${tag}`}>
              {tag}
            </li>
          ))}
        </ul>
        {this.state.isChanged
          && <input
            type='submit'
            className='formElement submit'
            value='Save Project'
          />
        }
        {this.props.edit && <DeleteProject
          name = {'Delete ' + this.state.name}
          id   = {this.props.match.params.id}
          info = {this.state.info}
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
          .formElement:focus:not(.output), .formElement:active:not(.output) {
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
          .thumbnail {
            width: auto;
            height: auto;
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
