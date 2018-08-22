import React, {Component} from 'react'
import {Field, FieldArray} from 'redux-form'


export default class AttachLinks extends Component {

  state = {
    accordionOpen: true,
    accordionClass: 'show'
  }

  // Accordion
  onClickToggle = () => {
    if(this.state.accordionOpen) {
      this.setState({accordionOpen: false, accordionClass: 'hide'})
    } else {
      this.setState({accordionOpen: true, accordionClass: 'show'})
    }
  }

  renderField = (field) => {
    let formGroupClass = field.type === 'disabled' ? "form-group disabled" : "form-group";

    return (
      <div className={ field.isAccordionHeader ? "accordion-header children-3 clearfix " + formGroupClass : formGroupClass }>
        { field.meta.touched && field.meta.error ? <span className="feedback invalid anmt-fadein">*{field.meta.error}</span> : '' }
        <label htmlFor={field.input.name}>{field.label}</label>
        { field.type === 'disabled'
          ? <input id={field.input.name} className="form-control" type='text' {...field.input} disabled placeholder={field.placeholder}/>
          : field.type === 'textarea'
          ? <textarea id={field.input.name} className="form-control" {...field.input} rows="5" cols="25" placeholder={field.placeholder}/>
          : <input id={field.input.name} className="form-control" type={field.type} {...field.input} autoComplete="off" placeholder={field.placeholder}/>
        }
        { field.isAccordionHeader &&
          <button
            type="button"
            className="plain"
            onClick={this.onClickToggle}
          >
            <i className="twf twf-chevron-right" />
          </button>
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
              <li key={indx} className={`attachment-fields accordion ${this.state.accordionClass}`}>
                <div className="align-right">
                  <button
                    type="button"
                    onClick={() => fields.remove(indx)}
                    className="delete size-small"
                  >
                    <i className="twf twf-trash-o" />ลบ
                  </button>
                </div>
                <Field
                  name={`${name}.link_title`}
                  component={this.renderField}
                  label="ชื่อไฟล์แนบ"
                  type="text"
                  isAccordionHeader
                />
                <div className="accordion-body no-spacing">
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
                </div>
              </li>
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
