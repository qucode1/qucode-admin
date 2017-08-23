import React from 'react'
import Row from '../Row/Row'
import NotFound from '../NotFound/NotFound'
import Loading from '../Loading/Loading'
import { Route } from 'react-router-dom'
import variables from '../../../variables.json'

class RowDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      row: {},
      loading: true
    })
  }
  componentDidMount() {
    const getRow = async () => {
      try {
        let row = await fetch(`${variables.PUBLICAPI}about/rows/${this.props.match.params.id}`)
        row = await row.json()
        this.setState({
          row,
          loading: false
        })
      } catch(err) {
        console.error(err)
        this.setState({
          loading: false
        })
      }
    }
    getRow()
  }
  render() {
    return (
      <div>
        {this.state.loading
          ? <Loading />
          : (this.state.row
            ? <Row {...this.state.row} details />
            : <Route component={() => <NotFound message='Row not found' />} />
          )
        }
      </div>
    )
  }
}

export default RowDetail
