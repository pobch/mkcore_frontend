import React, {Component} from 'react'

import {fetchGuestRoom, submitAnswer, fetchAnswer, resetError} from '../actions'


export default class GuestEditRoom extends Component {

  componentDidMount() {
    window.scrollTo(0,0)
    const roomId = this.props.match.params.id
    this.props.fetchAnswer(roomId)
    this.props.fetchGuestRoom(roomId)
  }

  componentWillUnmount() {
    this.props.resetError()
  }
  
  onSubmit = (values) => {
    const roomId = this.props.match.params.id
    this.props.submitAnswer(roomId, values)
  }

  render() {
    return (
      <div>Test</div>
    )
  }
}