import React from 'react'


export default function SaveCompleteModal(props) {
  return (
    <div className="modal fade" id="myModal" tabIndex="-1">
      <div className="modal-dialog" id="myModalContent">
        <div>
          <h4>Notification</h4>
        </div>
        <div>
          <p>Save Completed</p>
        </div>
        <div>
          <button type="button" className="btn btn-danger" onClick={props.onConfirm}>Ok</button>
        </div>
      </div>
    </div>
  )
}