import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Field, FieldArray} from 'redux-form'

import Portal from '../components/portal'
import SaveCompleteModal from '../components/modal_save_complete'
import MoveQuestionInputModal from '../components/modal_move_question'


export default class EachQuestion extends Component {

  state = {
    accordionOpen: true,
    accordionClass: 'show',
    inputValueOfMoveTo: '',
    invalidQuestionNumToMovePopup: false,
    inputQuestionNumToMovePopup: false
  }

  static propTypes = {
    liRef: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    arrayLength: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    answerType: PropTypes.string.isRequired,
    onClickDelete: PropTypes.func.isRequired,
    onClickAddNewQuestionWithCloneChoices: PropTypes.func.isRequired,
    moveToNewIndex: PropTypes.func.isRequired,
    onClickText: PropTypes.func.isRequired,
    onClickChoices: PropTypes.func.isRequired
  }

  // ----------------------------------- Move question section: --------------------------- //
  // 1. click button to open modal:
  onClickMoveQuestion = () => {
    this.setState({inputQuestionNumToMovePopup:true})
  }

  // 2.1 click confirm on modal:
  onConfirmedMoveQuestion = () => {
    const { inputValueOfMoveTo } = this.state
    if(inputValueOfMoveTo && inputValueOfMoveTo > 0 && inputValueOfMoveTo <= this.props.arrayLength) {
      let newIndex = inputValueOfMoveTo - 1
      this.props.moveToNewIndex(newIndex)
    } else {
      // open another modal if receive invalid question order:
      this.setState({invalidQuestionNumToMovePopup: true})
    }
    this.setState({inputValueOfMoveTo: '', inputQuestionNumToMovePopup: false})
  }

  // 2.2 click cancel on modal:
  closeModal = () => {
    this.setState({inputQuestionNumToMovePopup: false})
  }
  // ----------------------------------- End section ---------------------------------------//

  onClickToggle = () => {
    if(this.state.accordionOpen) {
      this.setState({accordionOpen: false, accordionClass: 'hide'})
    } else {
      this.setState({accordionOpen: true, accordionClass: 'show'})
    }
  }

  dropdownToggle = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    // ใส่ class active ที่ button ให้หน่อยครับ พอกดปุ่ม dropdownclick แล้วถ้าไปคลิกที่อื่น หรือที่ปุ่มเดิมเอา class active ออกครับ
  }

  renderQuestionField = (field) => {
    return <input type="text" id={field.id} placeholder="ตั้งคำถามที่นี่" {...field.input}/>
  }

  renderChoiceField = ({fields}) => {
    return (
      <div className="survey-choice">
        <button
          type="button"
          className="choice-add iconize anmt-fadein"
          onClick={() => {
            fields.push({})
          }}>
          <i className="twf twf-minimal-plus" />
        </button>
        <ul className="choice-list">
          {
            fields.map((value, index) => {
              return (
                <li key={index} className="form-group children-3 secondary spacing-side anmt-fadein">
                  <label htmlFor={`survey-choice-${index + 1}`}>{index + 1}</label>
                  <Field
                    name={`${value}.choiceText`}
                    component="input"
                    type="text"
                    id={`survey-choice-${index + 1}`}
                    placeholder={`ใส่ตัวเลือกที่ ${index + 1}`}
                    className="form-control"
                  />
                  <button
                    type="button"
                    onClick={() => fields.remove(index)}
                    className="delete plain"
                  >
                    <i className="twf twf-trash-o" />
                  </button>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  render() {
    return (
      <li ref={this.props.liRef} className={`list-item accordion form-minimal number ${this.state.accordionClass}`}>
        <div className="accordion-header form-group children-3 two-icons clearfix spacing-side">
          <label htmlFor={`survey-item-${this.props.index + 1}`}>{this.props.index + 1}</label>
          <Field
            id={`survey-item-${this.props.index + 1}`}
            name={`${this.props.value}.question`}
            component={this.renderQuestionField}
          />
          <div className="inline-child">
            <span className="position-relative">
              <button
                type="button"
                onClick={ (e) => {this.dropdownToggle(e)} }
                className="dropdown-toggle iconize small"
              >
                <i className="twf twf-ellipsis" />
              </button>
              <ul className="dropdown-list">
                <li>
                  <button
                    type="button"
                    onClick={this.props.onClickAddNewQuestionWithCloneChoices}
                    className="plain"
                  >
                    คัดลอก
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={this.props.onClickDelete}
                    className="invalid"
                  >
                    ลบ
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={this.onClickMoveQuestion}
                    className="plain"
                  >
                    Move
                  </button>
                </li>
              </ul>
            </span>
            <button
              type="button"
              className="plain"
              onClick={this.onClickToggle}
            >
              <i className="twf twf-chevron-right" />
            </button>
          </div>
        </div>

        <div className="accordion-body spacing-side">
          <div className="survey-type">
            <label>ชนิด :</label>
            <div className="button-group">
              <button
                type="button"
                className={ this.props.answerType === 'text' ? 'active' : null }
                onClick={this.props.onClickText}
              >
                พิมพ์ตอบ
              </button>
              <button
                type="button"
                className={ this.props.answerType === 'choices' ? 'active' : null }
                onClick={this.props.onClickChoices}
              >
                เลือกตอบ
              </button>
            </div>
          </div>
          { this.props.answerType === 'choices' &&
            <FieldArray
              name={`${this.props.value}.choices`}
              component={this.renderChoiceField}
            />
          }
        </div>

        <Portal>
          {/* Input target question number to move modal  */}
          <MoveQuestionInputModal
            className={this.state.inputQuestionNumToMovePopup ? 'modal show' : 'modal hide'}
            onCancel={ this.closeModal }
            onConfirm={ this.onConfirmedMoveQuestion }
          >
            Reorder this question to : #
            <input
              onChange={(e) => {this.setState({inputValueOfMoveTo: e.target.value})}}
              value={this.state.inputValueOfMoveTo}
            />
          </MoveQuestionInputModal>
        </Portal>

        <Portal>
          {/* Wrong move-to question number modal */}
          <SaveCompleteModal
            className={this.state.invalidQuestionNumToMovePopup ? 'show' : 'hide'}
            textBody="ตำแหน่งที่ต้องการย้าย ไม่ถูกต้อง"
            onConfirm={(event) => {
              this.setState({invalidQuestionNumToMovePopup: false})
            }}
          />
        </Portal>

      </li>
    )
  }
}
