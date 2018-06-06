import React, {Component} from 'react'
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form'

import TopTabBar from '../components/topTabBar'
import BotNavbar from '../components/botNavbar'
import Portal from '../components/portal'
import SaveCompleteModal from '../components/modal_save_complete'
import ConfirmModal from '../components/modal_confirm'

import {fetchProfile, updateProfile, logOutAction} from '../actions'

class Profile extends Component {

  state = {
    openSaveCompleteModal: false,
    openConfirmLogOutModal: false
  }

  componentDidMount() {
    window.scrollTo(0,0)
    this.props.fetchProfile()
  }

  renderField = (field) => {
    return (
      <div className={ field.type === 'disabled' ? "form-group disabled" : "form-group" }>
        { field.meta.touched && field.meta.error ? <span className="feedback invalid anmt-fadein">*{field.meta.error}</span> : '' }
        <label htmlFor={field.input.name}>{field.label}</label>
        { field.type === 'disabled'
          ? <input id={field.input.name} className="form-control" type='text' {...field.input} disabled/>
          : field.type === 'textarea'
          ? <textarea id={field.input.name} className="form-control" {...field.input} rows="5" cols="25"/>
          : <input id={field.input.name} className="form-control" type={field.type} {...field.input}/>
        }
      </div>
    )
  }

  onSubmit = async (values) => {
    await this.props.updateProfile(values)
    this.setState({openSaveCompleteModal: true})
  }

  render() {
    if(!this.props.profile) {
      return <div>Loading...</div>
    }

    const {handleSubmit} = this.props
    return (
      <div className="wrapper">
        <div className="wrapper-background fixed custom-bg" />
        <div className="header fixed">บัญชีของฉัน</div>
        <TopTabBar
          titleTab1="ทั่วไป"
          titleTab2="รหัสผ่าน"
        />
        <div className="tab-content form-minimal">
          <div className="tab-body">
            <form
              className='tab-item spacing-side'
              onSubmit={handleSubmit(this.onSubmit)}
            >
              <Field
                name='email'
                component={this.renderField}
                label="อีเมล"
                type="disabled"
              />
              <Field
                name='first_name'
                component={this.renderField}
                label="ชื่อ"
                type="text"
              />
              <Field
                name='last_name'
                component={this.renderField}
                label="นามสกุล"
                type="text"
              />
              <button type="submit" className="spacing-top">บันทึก</button>
            </form>
            <div className='tab-item spacing-side'>
              This is going to be a password change
            </div>
          </div>
        </div>
        <div className="tab-footer fixed clearfix spacing-side">
          <button type="button" 
            className="float-right"
            onClick={() => this.setState({openConfirmLogOutModal: true})}
          ><i className="twf twf-sign-out" />
          </button>
        </div>
        <BotNavbar/>

        <Portal>
          <SaveCompleteModal
            className={this.state.openSaveCompleteModal ? 'show' : 'hide'}
            onConfirm={(event) => {
              this.setState({openSaveCompleteModal: false})
            }}
          />
        </Portal>

        <Portal>
          <ConfirmModal
            className={this.state.openConfirmLogOutModal ? 'show' : 'hide'}
            modalBody="คุณต้องการออกจากระบบ?"
            onCancel={ () => this.setState({openConfirmLogOutModal: false})}
            onConfirm={ () => {
              this.props.logOutAction(() => {this.props.history.push('/')})
            }}
          />
        </Portal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {email, first_name, last_name} = state.profile
  return {
    profile: state.profile,
    initialValues: {email, first_name, last_name}
  }
}

export default connect(mapStateToProps, {fetchProfile, updateProfile, logOutAction})(
  reduxForm({
    form: 'editProfileForm',
    enableReinitialize: true
  })(Profile)
)
