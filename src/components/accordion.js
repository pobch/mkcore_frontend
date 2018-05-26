import React, {Component} from 'react'


export default class Accordion extends Component {
  
  state = {
    open: true,
    class: 'show'
  }

  onToggle = () => {
    if(this.state.open) {
      this.setState({open: false, class: 'hide'})
    } else {
      this.setState({open: true, class: 'show'})
    }
  }
  
  render() {
    return (
      <div>
        <button type="button" onClick={this.onToggle}>Toggle</button>
        <div className={`${this.state.class}`}>
          {this.props.children}
        </div>
      </div>
    )
  }
}