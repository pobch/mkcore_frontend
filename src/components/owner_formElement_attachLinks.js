import React, {Component} from 'react'
import {Field, FieldArray} from 'redux-form'

import LiAccordion from './li_accordion'

export default class AttachLinks extends Component {
  state = {
    focusIndex: 0 // Save an Index that we want to scroll to
  }

  liRefs = []

  componentDidUpdate(prevProps, prevState) {
    // Scroll to the updated <li>
    const { focusIndex } = this.state
    if (prevState.focusIndex !== focusIndex && this.liRefs[focusIndex]) {
      window.scrollTo(0, this.liRefs[focusIndex].offsetTop)
    }
  }

  renderField = (field) => {
    let formGroupClass = field.type === 'disabled' ? "form-group disabled" : "form-group";

    return (
      <div className={formGroupClass}>
        { field.meta.touched && field.meta.error ? <span className="feedback invalid anmt-fadein">*{field.meta.error}</span> : '' }
        <label htmlFor={field.input.name}>{field.label}</label>
        { field.type === 'disabled'
          ? <input id={field.input.name} className="form-control" type='text' {...field.input} disabled placeholder={field.placeholder}/>
          : field.type === 'textarea'
          ? <textarea id={field.input.name} className="form-control" {...field.input} rows="5" cols="25" placeholder={field.placeholder}/>
          : <input id={field.input.name} className="form-control" type={field.type} {...field.input} autoComplete="off" placeholder={field.placeholder}/>
        }
      </div>
    )
  }

  renderDropdownList = (field) => {
    return (
      // Set initialValues in reduxForm() HOC
      <div className="form-group">
        <label>{field.label}</label>
        <select {...field.input}>
          <option value="">--โปรดเลือก--</option>
          <option key="doc" value="doc">เอกสาร</option>
          <option key="audio" value="audio">ไฟล์เสียง</option>
          <option key="others" value="others">อื่นๆ</option>
        </select>
      </div>
    )
  }

  renderAttachedLinksField = ({fields}) => {
    return (
      <div className="form-attachment">
        <ul>
          { fields.map( (name, indx) => {
            return (
              <LiAccordion
                key={indx}
                liRef={(ref) => {this.liRefs[indx] = ref}}
                headerElement={(
                  <React.Fragment>
                    <Field
                      name={`${name}.link_title`}
                      component={this.renderField}
                      label="ชื่อไฟล์แนบ"
                      type="text"
                    />
                    <button
                      type="button"
                      onClick={() => fields.remove(indx)}
                      className="accordion-delete-absolute delete iconize"
                    >
                      <i className="twf twf-trash-o" />
                    </button>
                    {indx > 0 &&
                      <button
                        type="button"
                        onClick={() => {
                          // save a new index that we want to scroll to, then use it in componentDidUpdate()
                          this.setState({
                            focusIndex: indx-1
                          })
                          // redux-form's move() also triggers re-render
                          fields.move(indx, indx-1)                
                        }}
                      >
                        Up
                      </button>
                    }
                    {indx < fields.length - 1 &&
                      <button
                        type="button"
                        onClick={() => {
                          // same logic as above, use `indx + 1` instead
                          this.setState({
                            focusIndex: indx+1
                          })
                          fields.move(indx, indx+1)
                        }}
                      >
                        Down
                      </button>
                    }
                  </React.Fragment>
                )}
                initialOpen
              >
                <Field
                  name={`${name}.video_url`}
                  component={this.renderField}
                  label="URL วิดีโอ"
                  type="text"
                  placeholder="ใส่ URL ของวิดีโอ (ถ้ามี)"
                />
                <Field
                  name={`${name}.link_url`}
                  component={this.renderField}
                  label="URL ไฟล์แนบ"
                  type="text"
                  placeholder="ใส่ URL ของไฟล์แนบ (ถ้ามี)"
                />
                <Field
                  name={`${name}.content_type`}
                  component={this.renderDropdownList}
                  label="ประเภทไฟล์"
                />
                <Field
                  name={`${name}.link_description`}
                  component={this.renderField}
                  label="รายละเอียด"
                  type="textarea"
                />
              </LiAccordion>
            )
          })}
        </ul>
        <button
          type="button"
          onClick={() => fields.push({})}
          className="full large brand-basic"
        >
          <i className="twf twf-minimal-plus before" />
          เพิ่มไฟล์แนบ
        </button>
      </div>
    )
  }

  render() {
    return (
      <div className="form-minimal spacing-side">
        <FieldArray
          name="attached_links"
          component={this.renderAttachedLinksField}
        />
      </div>
    )
  }
}
