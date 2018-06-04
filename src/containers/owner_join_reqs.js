import React, {Component} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import {Link} from 'react-router-dom'

import { fetchJoinReqsOfOwnRoom, acceptJoinReq, denyJoinReq, RESET_JOINREQS_LIST } from '../actions'


class ViewJoinReqs extends Component {
  componentDidMount() {
    const {id} = this.props.match.params
    this.props.fetchJoinReqsOfOwnRoom(id)
  }

  componentWillUnmount() {
    this.props.resetJoinReqsList()
  }

  render() {
    return (
      <div>
        <h5>Join Requests</h5>
        {`Room Title : ${this.props.location.state.room_title} (id : ${this.props.location.state.room_id})`}
        
        <ul style={{color: 'grey'}} className="list-group list-group-flush">
          { _.isEmpty(this.props.joinReqsInfo) ? 
            <i>There is no join request.</i> :
            _.map(this.props.joinReqsInfo, (req) => {
            return (
              <li key={req.id} className="list-group-item">
                <div>
                  E-mail : <span style={{color: 'black'}}>{req.user_email}</span>
                  <br/>
                  Name : <span style={{color: 'black'}}>{req.user_first_name} {req.user_last_name}</span>
                </div>
                <button type="button" 
                  onClick={() => {this.props.acceptJoinReq(req.id)}}
                  className="btn btn-primary btn-sm">
                Accept
                </button>
                <button type="button" 
                  onClick={() => {this.props.denyJoinReq(req.id)}}
                  className="btn btn-danger btn-sm">
                Deny
                </button>
              </li>
            )
          }) }
        </ul>
        
        <Link to="/owner/rooms">Cancel</Link>
        
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    joinReqsInfo: state.joinReqsInfo,
    ownRooms: state.ownRooms
  }
}

export default connect(mapStateToProps, 
  {
    fetchJoinReqsOfOwnRoom, 
    acceptJoinReq, 
    denyJoinReq,
    resetJoinReqsList: () => ({type: RESET_JOINREQS_LIST})
  }
)(ViewJoinReqs)