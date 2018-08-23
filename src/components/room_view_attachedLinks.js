import React, {Component} from 'react'
import PropTypes from 'prop-types'

import LiAccordion from '../components/li_accordion'

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
            {videoSrc === 'external' ?
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
              <LiAccordion key={indx} 
                extraLiClassName="spacing-cover primary-bg"
                headerElement={(
                  <React.Fragment>
                    <h3 className="float-left">{eachSection.link_title}</h3>
                    <button
                      type="button"
                      className="plain"
                      onClick={this.onClickToggle}
                    >
                      <i className="twf twf-chevron-right" />
                    </button>
                  </React.Fragment>
                )}
              >               
                { eachSection.video_url && this.getVideoTemplate(encodeURI(eachSection.video_url)) }
                { eachSection.link_url || eachSection.link_description ?
                  <table className="table alternate first-8em spacing-top">
                    <tbody>
                      { eachSection.link_url &&
                        <tr>
                          <td>ไฟล์แนบ :</td>
                          <td><a className="plain" href={encodeURI(eachSection.link_url)} download><i className={`twf twf-${contentTypeIcon[eachSection.content_type]} before`} />ดาวน์โหลด</a></td>
                        </tr>
                      }
                      { eachSection.link_description &&
                        <tr>
                          <td>รายละเอียด :</td>
                          <td>{eachSection.link_description}</td>
                        </tr>
                      }
                    </tbody>
                  </table> :
                  ""
                }
              </LiAccordion>
            )
          })}
        </ul>
      </div>
    )
  }
}
