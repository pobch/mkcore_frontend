import React from 'react'


export default function ConfirmModal(props) {
  return (
    // // BootStrap 4
    <div className={props.className} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h4 className="modal-title">{props.modalTitle}</h4>
            <button type="button" 
              className="close" 
              onClick={props.onCancel}
            >&times;
            </button>
          </div>

          <div className="modal-body">{props.modalBody}</div>

          <div className="modal-footer">
            <button type="button" 
              className="btn btn-danger" 
              onClick={props.onConfirm}
            >Confirm
            </button>
            <button type="button" 
              className="btn btn-primary" 
              onClick={props.onCancel}
            >Cancel
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
