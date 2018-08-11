import _ from 'lodash'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'

import TopTabBar from '../components/topTabBar'
import ViewRoomInfo from '../components/room_view_info'
import AttachLinks from '../components/owner_formElement_attachLinks'
import ViewRoomSurvey from '../components/room_view_survey1'
import Loading from '../components/loading'
import Portal from '../components/portal'
import SaveCompleteModal from '../components/modal_save_complete'

import {fetchOwnRoom, updateRoom} from '../actions'


class OwnerViewRoom extends Component {

  state = {
    openSaveCompleteModal: false
  }

  componentDidMount() {
    window.scrollTo(0,0)
    this.props.fetchOwnRoom(this.props.match.params.id)
  }

  onSubmit = (values) => {
    const { id } = this.props.match.params
    const { attached_links } = values
    this.props.updateRoom(id, { attached_links })
    this.setState({openSaveCompleteModal: true})
  }

  render() {

    if(!this.props.room) {
      return <Loading />
    }

    const { handleSubmit } = this.props

    return (
      <div className="wrapper">
        <div className="wrapper-background fixed secondary-bg" />
        <div className="header fixed">รายละเอียดห้อง</div>
        <TopTabBar
          titleTab1="ข้อมูล"
          titleTab2="ไฟล์แนบ"
          titleTab3={ _.isEmpty(this.props.room.survey) ? '' : 'แบบสอบถาม' }
        />
        <form className="tab-content" onSubmit={handleSubmit(this.onSubmit)}>
          <div className="tab-body">
            <div className="tab-item">
              <ViewRoomInfo room={this.props.room}/>
            </div>
            <div className="tab-item">
              <AttachLinks />
            </div>
            <div className="tab-item">
              <ViewRoomSurvey room={this.props.room}/>
            </div>
          </div>
          <div className="tab-footer fixed clearfix spacing-side">
            <Link to="/owner/rooms" className="float-left">
              <i className="twf twf-arrow-bold-left" />
            </Link>
            <button type="submit" className="float-right plain">
              บันทึก
            </button>
          </div>
        </form>
        <Portal>
          <SaveCompleteModal
            className={this.state.openSaveCompleteModal ? 'show' : 'hide'}
            onConfirm={() => {
              this.setState({openSaveCompleteModal: false})
            }}
          />
        </Portal>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const roomData = _.find(state.ownRooms, ['id', +ownProps.match.params.id]) // return found 'object'
  const { attached_links } = roomData
  return {
    room: roomData,
    initialValues: { attached_links }
  }
}

export default connect(mapStateToProps, {fetchOwnRoom, updateRoom})(
  reduxForm({
    form: 'editPublishedRoomForm',
    enableReinitialize: true
  })(OwnerViewRoom)
)
