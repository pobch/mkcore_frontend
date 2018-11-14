import React, {Component} from 'react'
import {Field, FieldArray} from 'redux-form'

import LiAccordion from './li_accordion'

export default class AttachLinks extends Component {

  // *** Behavior of assigning new refs to the refs array when a <li> is moved will be
  //     different from the same task in owner_formElement_survey2.js because of
  //     `rerenderOnEveryChange` props of <FieldArray> (my guess). So, we need to use
  //     different logics for scrolling. ***
  // Create ref and pass to child component preparing for scrolling
  liRefs = []

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
                          // Scroll to the new position of the moved <li>
                          // *** `window.scrollTo()` can be placed either before or after `fields.move()` ***
                          window.scrollTo(0, this.liRefs[indx-1].offsetTop)
                          // Move
                          fields.move(indx, indx-1) // redux-form's move() triggers re-render
                        }}
                      >
                        Up
                      </button>
                    }
                    {indx < fields.length - 1 &&
                      <button
                        type="button"
                        onClick={() => {
                          // Scroll to the new position of the moved <li>
                          // *** `window.scrollTo()` can be placed either before or after `fields.move()` ***
                          window.scrollTo(0, this.liRefs[indx+1].offsetTop)
                          // Move
                          fields.move(indx, indx+1) // trigger re-render
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
