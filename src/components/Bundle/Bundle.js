import React, { Component } from 'react'
import Loading from '../Loading/Loading'

class Bundle extends Component {
  constructor (props) {
    // short for "module" but that's a keyword in js, so "mod"
    super(props)
    this.state = ({
      mod: null
    })
  }

  componentWillMount () {
    this.load(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load (props) {
    this.setState({
      mod: null
    })
    props.load((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render () {
    return this.state.mod ? this.props.children(this.state.mod) : <Loading />
  }
}

export default Bundle
