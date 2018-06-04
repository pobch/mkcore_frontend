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
          <div className="inline-button">
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
    // <div id="myModal">
    //   <div id="myModalContent">
    //     <div>
    //       <h4>Confirm</h4>
    //     </div>
    //     <div>
    //       <p>Are you sure?</p>
    //     </div>
    //     <div>
    //       <button type="button" className="btn btn-danger" onClick={props.onConfirm}>Confirm</button>
    //       <button type="button" className="btn btn-default" onClick={props.onCancel}>Cancel</button>
    //     </div>
    //   </div>
    // </div>
  )
}
