import React           from 'react'
import axios           from 'axios'
import {
  Route,
  Link,
  Redirect
}                      from 'react-router-dom'
import NotFound        from '../NotFound/NotFound'
import DeleteProject   from '../DeleteProject/DeleteProject'
import variables       from '../../../variables.json'

class Project extends React.Component {
  constructor(props) {
    super(props)

    this.state = ({
      name:         this.props.name,
      description:  this.props.description,
      image:        this.props.image,
      tags:         this.props.tags,
      active:       this.props.active,
      redirect:     false
    })
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
  }
  handleClick() {
    this.setState({ redirect: true })
  }
  render() {
    const details = this.props.details
    const skills  = this.state.skills
    return (
      <div className='project'>
        {this.state.redirect
          ? <Redirect push to={{
              pathname: `/cms/projects/${this.props._id}`,
              state: this.props}} />
          : null
        }
        <div tabIndex='0' className='projectLink' onClick={this.handleClick}>
          <h3>{this.props.name}</h3>
        </div>

        <style jsx>{`
          .project {
            width: 100%;
            height: 100%;
          }
          .projectLink {
            color: #0084de;
            padding: 0 5px;
            outline: none;
            cursor: pointer;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center
          }
          .projectLink:hover, .projectLink:focus {

            background-color: #fefdbd;
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
