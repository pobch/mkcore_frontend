import React from 'react'


export default function ConfirmDeleteModal(props) {
  return (
    // // BootStrap 4
    // <div className="modal fade" id="myModal">
    //   <div className="modal-dialog">
    //     <div className="modal-content">

    //       <div className="modal-header">
    //         <h4 className="modal-title">Modal Heading</h4>
    //         <button type="button" className="close" data-dismiss="modal">&times;</button>
    //       </div>

    //       <div className="modal-body">
    //         Modal body..
    //       </div>

    //       <div className="modal-footer">
    //         <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
    //       </div>

    //     </div>
    //   </div>
    // </div>
    <div id="myModal">
      <div id="myModalContent">
        <div>
          <h4>Confirm</h4>
        </div>
        <div>
          <p>Are you sure?</p>
        </div>
        <div>
          <button type="button" className="btn btn-danger" onClick={props.onConfirm}>Confirm</button>
          <button type="button" className="btn btn-default" onClick={props.onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
