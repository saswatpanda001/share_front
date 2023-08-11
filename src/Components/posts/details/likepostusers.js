import React from 'react'
import { Link } from 'react-router-dom';





const LikePostsUsers = ({props}) => {
  console.log("like post")
  let y =null;
  console.log(props)
  if(props){
    y = props.map((each) => {
        return(
            <div key={each[1]}>
                <Link to={`/shareme/profile/${each[1]}`}><p data-bs-dismiss="modal">{each[0]}</p></Link>
            </div>
        )
    })
  }
  return (
    <div>
      <div class="modal fade" id="postlikeusersmodal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable  ">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="postlikeusersmodal">Likes</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              {y}
                         
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default LikePostsUsers;
