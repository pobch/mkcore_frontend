import _ from 'lodash'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'

import TopTabBar from '../components/topTabBar'
// ============ iOS facebook messenger bug work around ===================
import RoomInfoEdit from '../components/owner_formElement_roomInfo'
import {validateOwnRoomCreateEdit} from '../form_validators'
// import ViewRoomInfo from '../components/room_view_info'
// =======================================================================
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
    // ================ iOS facebook messenger bug work around =================
    const { attached_links, social_urls } = values
    this.props.updateRoom(id, { attached_links, social_urls })
    // const { attached_links } = values
    // this.props.updateRoom(id, { attached_links })
    // =========================================================================
    this.setState({openSaveCompleteModal: true})
  }

  render() {

    if (!this.props.room) {
      return <Loading />
    }

    const { handleSubmit } = this.props

    return (
      <div className="wrapper">
        <div className="wrapper-background fixed secondary-bg" />
        <div className="header fixed">รายละเอียดห้อง</div>
        <TopTabBar
          titleTab1="ข้อมูล"
          titleTab2={ _.isEmpty(this.props.room.attached_links) ? '' : "ไฟล์แนบ"}
          titleTab3={ _.isEmpty(this.props.room.survey) ? '' : 'แบบสอบถาม' }
        />
        <form className="tab-content" onSubmit={handleSubmit(this.onSubmit)}>
          <div className="tab-body">
            <div className="tab-item">
              {/* =========== iOS facebook messenger bug work around ======== */}
              {/* <ViewRoomInfo room={this.props.room}/> */}
              <RoomInfoEdit roomCodeDisabled={true}/>
              {/* ============================================================ */}
            </div>
            {_.isEmpty(this.props.room.attached_links) ||
              <div className="tab-item">
                <AttachLinks />
              </div>
            }
            {_.isEmpty(this.props.room.survey) ||
              <div className="tab-item">
                <ViewRoomSurvey room={this.props.room}/>
              </div>
            }
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
  try {
    const roomData = _.find(state.ownRooms, ['id', +ownProps.match.params.id]) // return found 'object'
    const { attached_links } = roomData
    return {
      room: roomData,
      // ================ iOS facebook messenger bug work around ==============
      initialValues: _.pick(roomData, [
        'title', 'description', 'room_code', 'room_password', 'instructor_name', 
        'survey', 'start_at', 'end_at', 'last_date_to_join', 'guest_ttl_in_days',
        'image_url', 'attached_links', 'social_urls'
      ])
      // initialValues: { attached_links }
      // =======================================================================
    }
  } catch(error) {
    return
  }
}

export default connect(mapStateToProps, {fetchOwnRoom, updateRoom})(
  reduxForm({
    form: 'editPublishedRoomForm',
    enableReinitialize: true,
    // ================ iOS facebook messenger bug work around ==============
    validate: validateOwnRoomCreateEdit
    // =======================================================================
  })(OwnerViewRoom)
)
