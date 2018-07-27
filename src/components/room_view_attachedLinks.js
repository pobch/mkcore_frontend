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

  getEmbedVideoUrl = (url) => {
    let videoUrl = false;
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
    }

    if (videoUrl) {
      return (
        <div className="external-video"><iframe title="Attached video" width="1280" height="720" src={videoUrl} /></div>
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
              <li className="spacing-cover primary-bg stacked-child" key={indx}>
                <h3>{eachSection.link_title}</h3>
                { eachSection.video_url
                  &&
                  (eachSection.video_url.indexOf('.mp4') !== -1)
                    ? <video onContextMenu={this.disableVidieoRightClick} width="1280" height="720" controls><source src={encodeURI(eachSection.video_url)} type="video/mp4" /></video>
                    : this.getEmbedVideoUrl(encodeURI(eachSection.video_url))
                }
                { eachSection.link_url
                  && <div className="align-right"><a className="btn" href={encodeURI(eachSection.link_url)} download><i className={`twf twf-${contentTypeIcon[eachSection.content_type]} before`} />ดาวน์โหลดไฟล์แนบ</a></div>
                }
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
