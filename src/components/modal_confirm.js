import React from 'react'


export default function ConfirmModal(props) {

  return (
    // // BootStrap 4
    <div className={`modal ${props.className}`}>
      <div className="modal-wrapper">
        <div className="modal-content">
          <div className="modal-body">
            {props.modalBody}
          </div>
          <div className="inline-child">
            <button type="button" className="btn" onClick={props.onConfirm}>
            ยืนยัน
            </button>
            <button type="button" className="btn basic" onClick={props.onCancel}>
            ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
