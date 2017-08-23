import React from 'react'
import { Link } from 'react-router-dom'
import Row from '../Row/Row'
import Loading from '../Loading/Loading'
import variables from '../../../variables.json'

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
        <h1>Rows</h1>
        {this.state.loading && <Loading />}
        {this.state.rows.map(row => (
          <Row key={row._id} {...row} />
        ))}
      </div>
    )
  }
}

export default Rows
