import React, {Component} from 'react'
import PropTypes from 'prop-types'


export default class ViewAttachedLinks extends Component {

  static propTypes = {
    room: PropTypes.object.isRequired
  }

  disableVidieoRightClick = (e) => {
    e.preventDefault();
    return false;
  }

  getVideoTemplate = (url) => {
    let videoUrl = false;
    let videoSrc = 'self-host';
    if (url.indexOf('youtube') !== -1) {
      let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      let match = url.match(regExp);

      if (match && match[2].length === 11) {
        videoUrl = '//www.youtube.com/embed/' + match[2];
        videoSrc = 'external';
      }
    } else if (url.indexOf('vimeo') !== -1) {
      let vimeoRegex = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
      let match = url.match(vimeoRegex);

      if (match && match[1]) {
        videoUrl = "//player.vimeo.com/video/" + match[1];
        videoSrc = 'external';
      }
    } else if (url.indexOf('.mp4') !== -1) {
      videoUrl = url
    }

    if (videoUrl) {
      return (
        <div className={`${videoSrc}-video spacing-top`}>
          <div className="video-inner">
            {videoSrc == 'external' ?
              <iframe title="Attached video" width="1280" height="720" src={videoUrl} /> :
              <video onContextMenu={this.disableVidieoRightClick} width="1280" height="720" controls><source src={encodeURI(videoUrl)} type="video/mp4" /></video>
            }
          </div>
        </div>
      );
    }
  }

  render () {
    const contentTypeIcon = {
      'audio': 'music',
      'doc': 'file-pdf-o',
      'others': 'download',
    };

    return (
      <div className="spacing-side">
        <ul className="stacked-child">
          { this.props.room.attached_links.map( (eachSection, indx) => {
            return (
              <li className="spacing-cover primary-bg" key={indx}>
                <h3>{eachSection.link_title}</h3>
                <span className="divider" />
                { eachSection.video_url && this.getVideoTemplate(encodeURI(eachSection.video_url)) }
                { eachSection.link_url
                  &&
                  <div className="inline-child spacing-top">
                    <h4>ไฟล์แนบ :</h4>
                    <a className="plain" href={encodeURI(eachSection.link_url)} download><i className={`twf twf-${contentTypeIcon[eachSection.content_type]} before`} />ดาวน์โหลด</a>
                  </div>
                }
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
