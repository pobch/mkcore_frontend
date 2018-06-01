import React from 'react'


export default function SaveCompleteModal(props) {
  return (
    <div className={props.className} id={props.htmlId} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Notification</h4>
            <button type="button" className="close" data-dismiss="modal">&times;</button>
          </div>
          <div className="modal-body">
            Save Completed
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={props.onConfirm} data-dismiss="modal">
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}