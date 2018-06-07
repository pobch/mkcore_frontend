import React, {Component} from 'react'
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form'

import Portal from '../components/portal'
import SaveCompleteModal from '../components/modal_save_complete'

import {updateProfile} from '../actions'
import icon from '../static/hello-2.svg'


class FormProfileInfo extends Component {

  state = {
    openSaveCompleteModal: false
  }

  renderField = (field) => {
    return (
      <div className={ field.type === 'disabled' ? "form-group disabled" : "form-group" }>
        <label htmlFor={field.input.name}>{field.label}</label>
        { field.type === 'disabled'
          ? <input id={field.input.name} className="form-control" type='text' {...field.input} disabled/>
          : field.type === 'textarea'
          ? <textarea id={field.input.name} className="form-control" {...field.input} rows="5" cols="25"/>
          : <input id={field.input.name} className="form-control" type={field.type} {...field.input} autoComplete="new-username"/>
        }
        { field.meta.touched && field.meta.error ? <span className="feedback invalid anmt-fadein">*{field.meta.error}</span> : '' }
      </div>
    )
  }

  onSubmit = async (values) => {
    await this.props.updateProfile(values)
    this.setState({openSaveCompleteModal: true})
  }

  imageUploadClick = () => {
    console.log('ihar');
  }

  render() {

    if(!this.props.profile) {
      return <div>Loading...</div>
    }

    const {handleSubmit} = this.props
    const {imageUploadClick} = this.props
    return (
      <div className="form-minimal">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div
            className="image-upload"
            onClick={() => {this.imageUploadClick()}}
          >
            <img src={icon} width="150" height="150" alt="Icon"/>
          </div>
          <div className="spacing-cover">
            <h3>ข้อมูลส่วนตัว</h3>
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
          </div>
        </form>

        <Portal>
          <SaveCompleteModal
            className={this.state.openSaveCompleteModal ? 'show' : 'hide'}
            onConfirm={(event) => {
              this.setState({openSaveCompleteModal: false})
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

export default connect(mapStateToProps, { updateProfile })(
  reduxForm({
    form: 'editProfileInfoForm',
    enableReinitialize: true
  })(FormProfileInfo)
)
