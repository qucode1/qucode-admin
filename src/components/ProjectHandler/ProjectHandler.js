import React from 'react'
import Project from '../Project/Project'
import NotFound from '../NotFound/NotFound'
import Loading from '../Loading/Loading'
import { Route } from 'react-router-dom'
import variables from '../../../variables.json'

class ProjectHandler extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      project: {},
      loading: true
    })
  }
  componentDidMount () {
    const getProject = async () => {
      try {
        let project = await fetch(`${variables.PUBLICAPI}projects/${this.props.match.params.id}`)
        project = await project.json()
        this.setState({
          project,
          loading: false
        })
      } catch(err) {
        console.error(err)
        this.setState({
          loading: false
        })
      }
    }
    getProject()
  }
  render() {
    return (
      <div>
        {this.state.loading
          ? <Loading />
          : (this.state.project.name !== "CastError"
            ? <Project {...this.state.project} details />
            : <Route component={() => <NotFound message='Project not found' />} />
          )
        }
      </div>
    )
  }
}

export default ProjectHandler
