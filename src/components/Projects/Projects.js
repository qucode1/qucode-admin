import React    from 'react'
import { Link } from 'react-router-dom'
import axios    from 'axios'
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove }   from 'react-sortable-hoc'

import Project      from '../Project/Project'
import Loading  from '../Loading/Loading'
import Auth from '../../modules/Auth'

import variables from '../../../variables.json'

const DragHandle = SortableHandle((props) =>
  (<span style={{backgroundColor: props.handleColor}}>
    ↕
    <style jsx>{`
      font-size: 1.5em;
      padding: 0.5em 15px;
      cursor: n-resize
    `}</style>
  </span>)
)

const SortableItem = SortableElement((props) => {
  const matchingProject = props.projects.find(project => project._id === props.value)
  return (
    <div className='item'>
      <DragHandle handleColor = {props.handleColor}/>
      <Project key={props.value} {...matchingProject}/>
      <style jsx>{`
        .item {
        display: flex;
        align-items: center;
        // padding: 0 10px 0 0;
        height: 4.8rem;
        min-width: 200px;
        background-color: #fff;
        box-shadow: 0 0 4px rgb(173, 173, 173)
        }
      `}</style>
    </div>
  )
})

const SortableList = SortableContainer((props) => {
  return (
    <div style={{borderColor: props.color}}>
      {props.items.map((value, index) => (
        <SortableItem
          key         = {`project-${index}`}
          handleColor = {props.handleColor}
          index       = {index}
          value       = {value}
          projects    = {props.projects}/>
      ))}
      <style jsx>{`
          border: 4px solid #c5c5c5;
          border-radius: 9px;
          overflow: hidden;
          background-color: rgb(249, 249, 249);
          box-shadow: 0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24);
          width: auto;
          display: inline-block;
      `}</style>
    </div>
  )
})

class SortableComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = ({
      items: []
    })
    this.onSortEnd = this.onSortEnd.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items
    })
  }
  onSortEnd ({oldIndex, newIndex}) {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex)
    })
    const currentList = this.props.currentList === "active"
      ? variables.ACTIVEPROJECTS
      : variables.INACTIVEPROJECTS
    const postRoute = `${variables.PUBLICAPI}list/${currentList}`
    axios.post(postRoute, {items: this.state.items})
    .then(function(res) {
      console.log("list updated")
    }.bind(this))
    .catch(function(err) {
      console.error(err)
    }.bind(this))
  }
  render() {
    return (
      <SortableList
        items         = {this.state.items}
        color         = {this.props.color}
        handleColor   = {this.props.handleColor}
        onSortEnd     = {this.onSortEnd}
        useDragHandle = {true}
        lockAxis      = {'y'}
        projects          = {this.props.projects}/>
    )
  }
}

class Projects extends React.Component {
  constructor (props) {
    super(props)
    this.state = ({
      loading:       true,
      activeProjects:    [],
      inactiveProjects:  [],
      activeItems:   [],
      inactiveItems: []
    })
  }
  componentDidMount () {
    const myHeaders = new Headers({
      'Authorization': `bearer ${Auth.getToken()}`
    })
    const getProjects = async () => {
      try {
        let activeProjects   = await fetch(`${variables.PUBLICAPI}projects/active`)
        let inactiveProjects = await fetch(`${variables.PUBLICAPI}projects/inactive`, {
          headers: myHeaders
        })
        let activeList   = await fetch(`${variables.PUBLICAPI}list/${variables.ACTIVEPROJECTS}`)
        let inactiveList = await fetch(`${variables.PUBLICAPI}list/${variables.INACTIVEPROJECTS}`)
        activeProjects   = await activeProjects.json()
        inactiveProjects = await inactiveProjects.json()
        activeList       = await activeList.json()
        inactiveList     = await inactiveList.json()
        this.setState({
          activeProjects:    activeProjects,
          inactiveProjects:  inactiveProjects,
          activeItems:   activeList.items,
          inactiveItems: inactiveList.items,
          loading:       false
        })
      } catch(err) {
        console.error(err)
        this.setState({
          loading: false
        })
      }
    }
    getProjects()
  }
  render () {
    return (
      <div>
        {this.state.loading && <Loading /> }
        <div className='lists'>
          <div className='list'>
            <h2>Public Projects</h2>
            <SortableComponent
              projects        = {this.state.activeProjects}
              items       = {this.state.activeItems}
              color       = "rgb(73, 204, 73)"
              handleColor = "rgba(73, 204, 73, 0.6)"
              currentList = "active"
              loading     = {this.state.loading}/>
          </div>
          <div className='list'>
            <h2>Private Projects</h2>
            <SortableComponent
              projects        = {this.state.inactiveProjects}
              items       = {this.state.inactiveItems}
              color       = "rgb(255, 100, 100)"
              handleColor = "rgba(255, 100, 100, 0.6)"
              currentList = "inactive"
              loading     = {this.state.loading}/>
          </div>
        </div>
        <Link to='/cms/projects/add'><button className='addProjectButton'>+</button></Link>
        <style jsx>{`
          .lists {
            display:         flex;
            justify-content: center
          }
          .list {
            margin: 0 15px
          }
          h2 {
            text-align: center
          }
          .addProjectButton {
            position: absolute;
            bottom: 30px;
            right: 30px;
            color: #fff;
            background-color: rgb(244, 159, 16);
            border-radius: 50%;
            font-size: 2em;
            width: 1.5em;
            height: 1.5em;
            border: none;
            cursor: pointer;
            box-shadow: 0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24);
          }
        `}</style>
      </div>
    )
  }
}

export default Projects
