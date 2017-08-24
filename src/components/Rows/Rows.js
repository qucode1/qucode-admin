import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc'

import Row from '../Row/Row'
import Loading from '../Loading/Loading'

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
        padding: 5px;
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
        <SortableItem key={`row-${index}`} index={index} value={value} rows={props.rows}/>
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
    const postRoute = `${variables.PUBLICAPI}list/599edcc033594a3cc30d44bd`
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
      <SortableList items={this.state.items} onSortEnd={this.onSortEnd} useDragHandle={true} lockAxis={'y'} rows={this.props.activeRows}/>
    )
  }
}

class Rows extends React.Component {
  constructor (props) {
    super(props)
    this.state = ({
      rows: [],
      loading: true,
      activeItems: []
    })
  }
  componentDidMount () {
    const getRows = async () => {
      try {
        let rows = await fetch(`${variables.PUBLICAPI}about/rows/active`)
        let list = await fetch(`${variables.PUBLICAPI}list/599edcc033594a3cc30d44bd`)
        rows = await rows.json()
        list = await list.json()
        this.setState({
          rows,
          activeItems: list.items,
          loading: false
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
            <SortableComponent activeRows={this.state.rows} items={this.state.activeItems} loading={this.state.loading}/>
          </div>
        </div>
        <style jsx>{`
          .lists {
            display: flex;
            justify-content: space-around
          }
          .list {

          }
        `}</style>
      </div>
    )
  }
}

export default Rows
