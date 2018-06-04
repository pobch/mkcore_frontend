import _ from 'lodash'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Field, FieldArray} from 'redux-form'
import {connect} from 'react-redux'


class EachQuestion extends Component {
  
  state = {
    accordionOpen: true,
    accordionClass: 'show',
    answerTypeText: this.props.answerType ? (this.props.answerType === 'text' ? true : false) : true,
    answerTypeChoices: this.props.answerType ? (this.props.answerType === 'choices' ? true : false) : false
  }

  static propTypes = {
    roomId: PropTypes.string.isRequired,
    onClickDelete: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    onClickText: PropTypes.func.isRequired,
    onClickChoices: PropTypes.func.isRequired
  }

  static defaultProps = {
    roomId: ''
  }

  onClickToggle = () => {
    if(this.state.accordionOpen) {
      this.setState({accordionOpen: false, accordionClass: 'hide'})
    } else {
      this.setState({accordionOpen: true, accordionClass: 'show'})
    }
  }

  renderQuestionField = (field) => {
    return <input type="text" placeholder="Enter the question" {...field.input}/>
  }
  
  renderChoiceField = ({fields}) => {
    return (
      <ul>
        {
          fields.map((value, index) => {
            return (
              <li key={index} className="form-inline">
                <button type="button" 
                  onClick={() => fields.remove(index)}
                  className="btn btn-outline-danger mb-1 btn-sm">
                  -
                </button>
                <label>{`Choice #${index + 1} : `}</label>
                <Field
                  name={`${value}.choiceText`}
                  component="input"
                  type="text"
                  className="form-control"
                />
              </li>
            )
          })
        }
        <button type="button"
          className="btn btn-outline-primary mb-1 btn-sm"
          onClick={() => {
            fields.push({})
          }}>
          +Choice
        </button>
      </ul>
    )
  }
  
  render() {
    return (
      <li className={`${this.state.accordionClass}`}>
        <span>
          <button type="button" 
            onClick={this.props.onClickDelete} 
            className="btn btn-danger mx-1 btn-sm"
          >Delete
          </button>
          
          <b>{`#${this.props.index + 1} : `}</b>

          <Field
            name={`${this.props.value}.question`}
            component={this.renderQuestionField}
          />

          <button type="button" onClick={this.onClickToggle}>Toggle</button>
        </span>
        
        <div>
          <div className="form-group form-inline">
            Answer Type : 
            <button type="button" className="btn btn-outline-info m-1 btn-sm"
              onClick={() => {
                this.props.onClickText()
                this.setState({answerTypeText: true, answerTypeChoices: false})
              }}
            >Text
            </button>

            <button type="button" className="btn btn-outline-info m-1 btn-sm"
              onClick={() => {
                this.props.onClickChoices()
                this.setState({answerTypeText: false, answerTypeChoices: true})
              }}
            >Choices
            </button>
          </div>

          <div className="form-group">
            Expected answer :
            <i> 
              { this.state.answerTypeText && ' Text Type'}
              { this.state.answerTypeChoices && ' Choice Type'}
            </i>
          </div>
          
          { this.state.answerTypeChoices && 
            <FieldArray
              name={`${this.props.value}.choices`}
              component={this.renderChoiceField}
            />
          }
        </div>

        <hr/>

      </li>
    )
  }
}

function mapStateToProps(state, ownProps) {
  // check whether this question is already in database, if so, initial state with current answerType in db
  // if this question is not in db, 2 cases can be implied : 
  // case 1 : roomId = '' and survey is empty because this is a new room (create room mode)
  // case 2 : this is the old room's new added question which is not POSTed to db yet (edit room mode)
  let survey = []
  if(ownProps.roomId) {
    survey = _.find(state.ownRooms, ['id', +ownProps.roomId]).survey || []
    // can be [] or [{answerType:'text', ...}, {answerType:'choices', ...}]
  }
  const result = ownProps.roomId 
    && survey[ownProps.index]
    && survey[ownProps.index].answerType
  return {
    answerType: result
  }
}

export default connect(mapStateToProps)(EachQuestion)
