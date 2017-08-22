import React from 'react'
import { Link } from 'react-router-dom'
import variables from '../../../variables.json'

class Rows extends React.Component {
  constructor (props) {
    super(props)
    this.state = ({
      rows: []
    })
  }
  componentDidMount () {
    const getRows = async () => {
      try {
        let rows = await fetch(`${variables.PUBLICAPI}about/rows`)
        rows = await rows.json()
        this.setState({
          rows
        })
      } catch(err) {
        console.error(err)
      }
    }
    getRows()
  }
  render () {
    return (
      <div>
        <h1>Rows</h1>
        {this.state.rows.map(row => (
          <div key={row._id}>
            <h3>{row.name}</h3>
            <p>{row._id}</p>
          </div>
        ))}
      </div>
    )
  }
}

export default Rows
