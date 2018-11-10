import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class LiAccordion extends Component {
  static propTypes = {
    extraLiClassName: PropTypes.string,
    extraHeaderClassName: PropTypes.string,
    extraBodyClassName: PropTypes.string,
    headerElement: PropTypes.element.isRequired,
    initialOpen: PropTypes.bool.isRequired,
    liRef: PropTypes.func,
    video_url: PropTypes.string
  }

  static defaultProps = {
    extraLiClassName: '',
    extraHeaderClassName: '',
    extraBodyClassName: '',
    video_url: ''
  }

  state = {
    accordionOpen: this.props.initialOpen,
    accordionClass: this.props.initialOpen ? 'show' : 'hide'
  }

  onClickToggle = () => {
    if(this.state.accordionOpen) {
      this.setState({accordionOpen: false, accordionClass: 'hide'})
    } else {
      this.setState({accordionOpen: true, accordionClass: 'show'})
    }
  }

  disableVidieoRightClick = (e) => {
    e.preventDefault();
    return false;
  }

  getVideoTemplate = (url) => {
    let videoUrl = false;
    let videoSrc = 'external';

    if (url.indexOf('youtube') !== -1) {
      let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      let match = url.match(regExp);

      if (match && match[2].length === 11) {
        videoUrl = '//www.youtube.com/embed/' + match[2];
      }
    } else if (url.indexOf('vimeo') !== -1) {
      let vimeoRegex = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
      let match = url.match(vimeoRegex);

      if (match && match[1]) {
        videoUrl = "//player.vimeo.com/video/" + match[1];
      }
    } else {
      videoUrl = url;
      if (url.indexOf('.mp4') !== -1) {
        videoSrc = 'self-host';
      }
    }

    if (videoUrl) {
      return (
        <div className={`${videoSrc}-video spacing-top`}>
          <div className="video-inner">
            {videoSrc === 'external'
              ? <iframe title="Attached video" width="1280" height="720" allowFullScreen
                  src={this.state.accordionOpen ? videoUrl : ''}
                />
              : <video onContextMenu={this.disableVidieoRightClick} width="1280" height="720" controls>
                  <source src={this.state.accordionOpen ? videoUrl : ''} type="video/mp4" />
                </video>
            }
            <div className="video-hidden-button" />
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <li 
        ref={this.props.liRef}
        className={`accordion ${this.props.extraLiClassName} ${this.state.accordionClass}`}
      >
        <div className={`accordion-header position-relative clearfix ${this.props.extraHeaderClassName}`}>
          {this.props.headerElement}
          <button
            type="button"
            className="plain accordion-arrow-absolute"
            onClick={this.onClickToggle}
          >
            <i className="twf twf-chevron-right" />
          </button>
        </div>
        <div className={`accordion-body no-spacing transparent ${this.props.extraBodyClassName}`}>
          {this.props.video_url && 
            this.getVideoTemplate(this.props.video_url)
          }
          {this.props.children}
        </div>
      </li>
    )
  }
}
