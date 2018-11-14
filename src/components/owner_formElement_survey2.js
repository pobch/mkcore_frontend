import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import EachQuestion from '../components/owner_formElement_survey3'


export default class RenderSurvey extends Component {

  // Warning !!!! Initializing state from props will use props when first rendering only.
  //    When re-rendering, nextProps will not change this state.
  //    Therefore we have to make sure that this.props.currentMaxQuestionId has value at first render !!
  state = {
    newMaxQuestionId: this.props.currentMaxQuestionId + 1,
    wantScroll: false // set tot `true` to trigger scrolling
  }

  // *** Behavior of assigning new refs to the refs array when a <li> is moved will be
  //     different from the same task in owner_formElement_attachLinks.js because of
  //     `rerenderOnEveryChange` props of <FieldArray> (my guess). So, we need to use
  //     different logics for scrolling. ***
  // Pass ref to <EachQuestion/>, prepare for scrolling.
  liRefs = []
  bottomPageRef = React.createRef()

  // for scrolling
  focusQuestionId = 0 // save a question id that will be moved
  focusIndex = 0 // a target index that we want to scroll TO

  static propTypes = {
    currentMaxQuestionId: PropTypes.number.isRequired,
    fields: PropTypes.object.isRequired
  }

  componentDidUpdate(prevProps, prevState) {
    // Scroll to the moved <li> position, not include the case of scrolling to bottom by cloning a <li> 
    const { wantScroll } = this.state
    if (wantScroll) {
      if (this.props.fields.get(this.focusIndex).id === this.focusQuestionId) {
        window.scrollTo(0, this.liRefs[this.focusIndex].offsetTop)
        // after scrolling success, reset `wantScroll`
        this.setState({ wantScroll: false })
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
                    // redux-form's push() triggers re-render
                    fields.push({
                      ...defaultNewQuestion,
                      answerType: fields.get(index).answerType,
                      choices: _.cloneDeep(fields.get(index).choices)
                    })
                    // also trigger re-render
                    this.setState(prevState => {
                      return {
                        newMaxQuestionId: prevState.newMaxQuestionId + 1,
                      }
                    })
                    // scroll to bottom
                    this.bottomPageRef.current.scrollIntoView({ behavior: 'smooth' })
                  }}

                  moveToNewIndex={(newIndex) => {
                    // *** If we use `window.scrollTo(0, <refs>)` in this function, the result will not be
                    //     as expected. (maybe because of `rerenderOnEveryChange` props?) ***
                    
                    // Prepare to move
                    this.focusIndex = newIndex // target index to move TO
                    this.focusQuestionId = fields.get(index).id // question id which is moved to target
                    
                    // Move
                    this.setState({
                      wantScroll: true // trigger scrolling
                    }, () => {
                      // Use callback of `setState` to make sure that `fields.move()` will trigger re-render
                      // after `wantScroll` is set to `true`.
                      fields.move(index, newIndex)
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
