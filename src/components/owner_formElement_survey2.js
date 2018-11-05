import React, {Component} from 'react'
import PropTypes from 'prop-types'

import EachQuestion from '../components/owner_formElement_survey3'


export default class RenderSurvey extends Component {

  // Warning !!!! Initializing state from props will use props when first rendering only.
  //    When re-rendering, nextProps will not change this state.
  //    Therefore we have to make sure that this.props.currentMaxQuestionId has value at first render !!
  state = {
    newMaxQuestionId: this.props.currentMaxQuestionId + 1,
    focusIndex: 0 // Save an Index that we want to scroll to
  }

  // Use ref to set scroll position after move element in FieldArray which is in <EachQuestion/>
  liRefs = []
  bottomPageRef = React.createRef()

  static propTypes = {
    currentMaxQuestionId: PropTypes.number.isRequired,
    fields: PropTypes.object.isRequired
  }

  componentDidUpdate(prevProps, prevState) {
    // Scroll to the updated <li>
    const { focusIndex } = this.state
    if (prevState.focusIndex !== focusIndex) {
      if (this.liRefs[focusIndex]) {
        // a <li> is moved
        window.scrollTo(0, this.liRefs[focusIndex].offsetTop)
      } else if (!this.liRefs[focusIndex] && focusIndex > 0) {
        // a <li> is added to the bottom by our cloning feature
        this.bottomPageRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  render () {
    const {fields} = this.props

    // Important !! this is the initial structor of every question
    const defaultNewQuestion = {
      id: this.state.newMaxQuestionId,
      answerType: 'text',
      choices: null
    }

    return (
      <div className="survey-edit spacing-side">
        <ul className="survey-list">
          {
            fields.map((value,index) => {
              return (
                <EachQuestion
                  key={fields.get(index).id}

                  liRef={(node) => {this.liRefs[index] = node}}
                  index={index}
                  arrayLength={fields.length}
                  value={value}
                  answerType={fields.get(index).answerType}

                  onClickDelete={() => {fields.remove(index)}}

                  onClickAddNewQuestionWithCloneChoices={() => {
                    // We want to move to bottom of the page, but the component has not re-rendered yet.
                    // So we have to save a future last index, which is `fields.length`, instead of
                    //   a current last index, which is `fields.length - 1`.
                    const focusIndex = fields.length
                    
                    // redux-form's push() triggers re-render
                    fields.push({
                      ...defaultNewQuestion,
                      answerType: fields.get(index).answerType,
                      choices: fields.get(index).choices
                    })
                    // also trigger re-render
                    this.setState(prevState => {
                      return {
                        newMaxQuestionId: prevState.newMaxQuestionId + 1,
                        focusIndex
                      }
                    })
                  }}

                  moveToNewIndex={(newIndex) => {
                    fields.move(index, newIndex) // redux-form's move() also trigger re-render
                    this.setState({
                      focusIndex: newIndex
                    })
                  }}

                  onClickText={() => {
                    const wantedValue = {...fields.get(index), answerType:'text', choices:null}
                    fields.remove(index)
                    fields.insert(index, wantedValue)
                  }}

                  onClickChoices={() => {
                    // initial with 1 choice:
                    const wantedValue = {...fields.get(index), answerType: 'choices', choices:[{}]}
                    fields.remove(index)
                    fields.insert(index, wantedValue)
                  }}
                />
              )
            })
          }
        </ul>
        <button
          ref={this.bottomPageRef}
          type="button"
          onClick={() => {
            fields.push(defaultNewQuestion)
            this.setState(prevState => {
              return { newMaxQuestionId: prevState.newMaxQuestionId + 1 }
            })
          }}
          className="full large brand-basic"
        >
          <i className="twf twf-minimal-plus before" />
          เพิ่มคำถาม
        </button>
      </div>
    )
  }
}
