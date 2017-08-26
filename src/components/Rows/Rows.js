import React    from 'react'
import { Link } from 'react-router-dom'
import axios    from 'axios'
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove }   from 'react-sortable-hoc'

import Row      from '../Row/Row'
import Loading  from '../Loading/Loading'

import variables from '../../../variables.json'

const DragHandle = SortableHandle(() =>
  (<span>
    ↕
    <style jsx>{`
      font-size: 1.5em;
      padding: 0.5em 10px;
      cursor: n-resize
    `}</style>
  </span>)
)

const SortableItem = SortableElement((props) => {
  const matchingRow = props.rows.find(row => row._id === props.value)
  return (
    <div>
      <DragHandle/>
      <Row key={props.value} {...matchingRow}/>
      <style jsx>{`
        display: flex;
        align-items: center;
        padding: 0 10px;
        background-color: #fff
        box-shadow: 0 0 2px rgb(162, 162, 162)
      `}</style>
    </div>
  )
})

const SortableList = SortableContainer((props) => {
  return (
    <div>
      {props.items.map((value, index) => (
        <SortableItem
          key   ={`row-${index}`}
          index ={index}
          value ={value}
          rows  ={props.rows}/>
      ))}
      <style jsx>{`
        border: 1px solid #c5c5c5;
        border-radius: 5px;
        overflow: hidden;
        background-color: rgb(249, 249, 249);
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
      ? variables.ACTIVEROWS
      : variables.INACTIVEROWS
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
        items={this.state.items}
        onSortEnd={this.onSortEnd}
        useDragHandle={true}
        lockAxis={'y'}
        rows={this.props.rows}/>
    )
  }
}

class Rows extends React.Component {
  constructor (props) {
    super(props)
    this.state = ({
      loading:       true,
      activeRows:    [],
      inactiveRows:  [],
      activeItems:   [],
      inactiveItems: []
    })
  }
  componentDidMount () {
    const getRows = async () => {
      try {
        let activeRows   = await fetch(`${variables.PUBLICAPI}about/rows/active`)
        let inactiveRows = await fetch(`${variables.PUBLICAPI}about/rows/inactive`)
        let activeList   = await fetch(`${variables.PUBLICAPI}list/${variables.ACTIVEROWS}`)
        let inactiveList = await fetch(`${variables.PUBLICAPI}list/${variables.INACTIVEROWS}`)
        activeRows       = await activeRows.json()
        inactiveRows     = await inactiveRows.json()
        activeList       = await activeList.json()
        inactiveList     = await inactiveList.json()
        this.setState({
          activeRows:    activeRows,
          inactiveRows:  inactiveRows,
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
    getRows()
  }
  render () {
    return (
      <div>
        {this.state.loading && <Loading />}
        <div className='lists'>
          <div className='list'>
            <h2>Public Rows</h2>
            <SortableComponent
              rows    ={this.state.activeRows}
              items   ={this.state.activeItems}
              currentList = "active"
              loading ={this.state.loading}/>
          </div>
          <div className='list'>
            <h2>Private Rows</h2>
            <SortableComponent
              rows    ={this.state.inactiveRows}
              items   ={this.state.inactiveItems}
              currentList = "inactive"
              loading ={this.state.loading}/>
          </div>
        </div>
        <style jsx>{`
          .lists {
            display:         flex;
            justify-content: flex-start
          }
          .list {
            margin: 0 15px
          }
        `}</style>
      </div>
    )
  }
}

export default Rows
