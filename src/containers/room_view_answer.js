// case: guest already answered the survey
// return (
//   <div>
//     { this.props.initialValues && this.props.initialValues.answer && 
//       this.props.initialValues.answer.map((ans, indx) => {
//         return (
//           <div key={indx}>
//             <h4><b>{`#${indx+1} ${ans.question}`}</b></h4>
//             <div style={{color: 'grey'}}>
//               <i>Your Answer:</i> <b>{ans.answerText || ans.answerChoice}</b>
//             </div>
//             <hr/>
//           </div>
//         )
//       })
//     }
//     <div style={{color:'red'}}>
//       <i>You have already answered this survey 
//         -OR- There is no survey created in this room</i>
//     </div>
//     <Link to="/guest/rooms" className="btn btn-danger">Cancel</Link>
//   </div>
// )