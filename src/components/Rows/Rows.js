import React from 'react'
import { Link } from 'react-router-dom'
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
  constructor(props) {
    super(props)
    this.state = ({
      items: ['599afd98d741302596bcc8c3', '599b024fdd595e261fe25504', '599b02d3dd595e261fe25506', '599b03527bd9c72b1058a319', '599b05ae7bd9c72b1058a31b']
    })
    this.onSortEnd = this.onSortEnd.bind(this)
  }
  onSortEnd ({oldIndex, newIndex}) {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex)
    })
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
      loading: true
    })
  }
  componentDidMount () {
    const getRows = async () => {
      try {
        let rows = await fetch(`${variables.PUBLICAPI}about/rows`)
        rows = await rows.json()
        this.setState({
          rows,
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
            <SortableComponent activeRows={this.state.rows} />
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
