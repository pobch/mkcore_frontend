import React from 'react'


export default function ViewAttachedLinks(props) {
  return (
    <div className="spacing-side">
      <div className="spacing-cover  primary-bg">
        <div className="stacked-child">
          <ul className="spacing-top stacked-child">
            { props.room.attached_links.map( (eachSection, indx) => {
              return (
                <li key={indx}>
                  <div>{eachSection.link_title}</div>
                  { eachSection.video_url
                    && <a href={encodeURI(eachSection.video_url)} target="_blank">Video</a>
                  }
                  { eachSection.link_url
                    && <a href={encodeURI(eachSection.link_url)} target="_blank">ลิงค์ไปยัง {eachSection.content_type}</a>
                  }
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
} 