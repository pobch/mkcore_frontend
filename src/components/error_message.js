import React from 'react'
import _ from 'lodash'


// props :
//  errors <(string) or (object of array) or (object with string value)> **very confusing

export default function ErrorMessage(props) {
  return (
    <ul className="list-body error-message spacing-side">
      { typeof props.errors === 'string'
        ? <li className="list-item">{props.errors}</li>
        : _.map(props.errors, (value,key) => {
          if(key === 'detail') {
            // if key = detail, value will be string (e.g., 'Not found')
            return (
              <li className="list-item" key={key}>
                เกิดเหตุขัดข้อง {value}
              </li>
            )
          } else {
            // Validation Error 
            // e.g., key = room_code, value = [ 'room with this room code already exists.', 'error msg2' ]
            return (
              // Array of components:
              _.map(value, (arrayValue, arrayIndx) => {
                return (
                  <li className="list-item" key={`${key}${arrayIndx}`}>
                    เกิดเหตุขัดข้อง {arrayValue}
                  </li>
                )
              })
            )
          }
        })
      }
    </ul>
  )
}
