import React, {Component} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'

import { fetchJoinReqsOfOwnRoom, acceptJoinReq } from '../actions'


class ViewJoinReqs extends Component {
  componentDidMount() {
    const {id} = this.props.match.params
    this.props.fetchJoinReqsOfOwnRoom(id)
  }

  render() {
    return (
      <div>
        <ul>
          { _.map(this.props.joinReqsInfo, (req) => {
            return (
              <li key={req.id}>
                <button type="button" onClick={() => {this.props.acceptJoinReq(req.id)}}>
                  Accept
                </button>
                {`${req.user_email} / ${req.user_first_name} / ${req.user_last_name}`}
              </li>
            )
          }) }
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    joinReqsInfo: state.joinReqsInfo
  }
}

export default connect(mapStateToProps, {fetchJoinReqsOfOwnRoom, acceptJoinReq})(ViewJoinReqs)