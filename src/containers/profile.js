import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {reduxForm, Field} from 'redux-form'

import BotNavbar from '../components/botNavbar'
import Portal from '../components/portal'
import SaveCompleteModal from '../components/modal_save_complete'

import {fetchProfile, updateProfile} from '../actions'

class Profile extends Component {

  state = {
    openSaveCompleteModal: false
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
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name='email'
            component={this.renderField}
            label="E-mail"
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
          <div>
            <button type="submit" className="btn">Save Profile</button>
          </div>
        </form>
        <Link className="btn btn-danger" to="/logout">Log Out</Link>
        <BotNavbar/>

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

export default connect(mapStateToProps, {fetchProfile, updateProfile})(
  reduxForm({
    form: 'editProfileForm',
    enableReinitialize: true
  })(Profile)
)