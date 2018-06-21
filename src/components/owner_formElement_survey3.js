import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Field, FieldArray} from 'redux-form'

import Portal from '../components/portal'
import SaveCompleteModal from '../components/modal_save_complete'


export default class EachQuestion extends Component {

  state = {
    accordionOpen: true,
    accordionClass: 'show',
    inputValueOfMoveTo: '',
    wrongMoveToQuestionNumPopup: false
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

  onClickMoveTo = () => {
    const { inputValueOfMoveTo } = this.state
    if(inputValueOfMoveTo && inputValueOfMoveTo > 0 && inputValueOfMoveTo <= this.props.arrayLength) {
      let newIndex = inputValueOfMoveTo - 1
      this.props.moveToNewIndex(newIndex)
      this.setState({inputValueOfMoveTo: ''})
    } else {
      this.setState({wrongMoveToQuestionNumPopup: true})
    }
  }

  onClickToggle = () => {
    if(this.state.accordionOpen) {
      this.setState({accordionOpen: false, accordionClass: 'hide'})
    } else {
      this.setState({accordionOpen: true, accordionClass: 'show'})
    }
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
        <div className="accordion-header form-group children-3 spacing-side">
          <label htmlFor={`survey-item-${this.props.index + 1}`}>{this.props.index + 1}</label>
          <Field
            id={`survey-item-${this.props.index + 1}`}
            name={`${this.props.value}.question`}
            component={this.renderQuestionField}
          />
          <button type="button" onClick={this.props.onClickAddNewQuestionWithCloneChoices}>
            Clone
          </button>
          <span>
            <button type="button" onClick={this.onClickMoveTo}>Move</button>
            <span>to:</span>
            <input 
              onChange={(e) => {this.setState({inputValueOfMoveTo: e.target.value})}} 
              value={this.state.inputValueOfMoveTo}
            />
          </span>
          <div className="inline-child">
            <button
              type="button"
              onClick={this.props.onClickDelete}
              className="plain delete"
            >
              <i className="twf twf-trash-o" />
            </button>
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
          {/* Wrong move-to question number modal */}
          <SaveCompleteModal
            className={this.state.wrongMoveToQuestionNumPopup ? 'show' : 'hide'}
            textBody="ตำแหน่งที่ต้องการย้าย ไม่ถูกต้อง"
            onConfirm={(event) => {
              this.setState({wrongMoveToQuestionNumPopup: false})
            }}
          />
        </Portal>

      </li>
    )
  }
}

// function mapStateToProps(state, ownProps) {
//   // check whether this question is already in database, if so, initial state with current answerType in db
//   // if this question is not in db, 2 cases can be implied :
//   // case 1 : roomId = '' and survey is empty because this is a new room (create room mode)
//   // case 2 : this is the old room's new added question which is not POSTed to db yet (edit room mode)
//   let survey = []
//   if(ownProps.roomId) {
//     survey = _.find(state.ownRooms, ['id', +ownProps.roomId]).survey || []
//     // can be [] or [{answerType:'text', ...}, {answerType:'choices', ...}]
//   }
//   const result = ownProps.roomId
//     && survey[ownProps.index]
//     && survey[ownProps.index].answerType
//   return {
//     answerType: result
//   }
// }

// export default connect(mapStateToProps)(EachQuestion)
