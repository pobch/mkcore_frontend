import React from 'react'


export default function SaveCompleteModal(props) {
  return (
    <div className={`modal ${props.className}`} id={props.htmlId}>
      <div className="modal-wrapper">
        <div className="modal-content">
          <div className="modal-body">บันทึกเรียบร้อย</div>
          <div className="inline-child">
            <button type="button" className="btn" onClick={props.onConfirm}>ตกลง</button>
          </div>
        </div>
      </div>
    </div>
  )
}
