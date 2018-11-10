import React, {Component} from 'react'
import PropTypes from 'prop-types'

import LiAccordion from '../components/li_accordion'

export default class ViewAttachedLinks extends Component {

  static propTypes = {
    room: PropTypes.object.isRequired
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
                  </React.Fragment>
                )}
                initialOpen={indx === 0 ? true : false}
                video_url={eachSection.video_url}
              >
                { eachSection.link_url || eachSection.link_description ?
                  <table className="table alternate first-8em spacing-top">
                    <tbody>
                      { eachSection.link_url &&
                        <tr>
                          <td>ไฟล์แนบ :</td>
                          <td><a className="plain" href={eachSection.link_url} download><i className={`twf twf-${contentTypeIcon[eachSection.content_type]} before`} />ดาวน์โหลด</a></td>
                        </tr>
                      }
                      { eachSection.link_description &&
                        <tr>
                          <td>รายละเอียด :</td>
                          <td style={{ whiteSpace: 'pre-wrap' }}>{eachSection.link_description}</td>
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
