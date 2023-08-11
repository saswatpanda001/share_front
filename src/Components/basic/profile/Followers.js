import React from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'


const ProfileFollowers = ({props}) => {
  const data = props.followers
  const navigation = useNavigate()
  const RenderFollowers = data.map((each) => {

    return(
      <div>
       <a href={`/shareme/profile/${each[1]}`}><p className='lead' >{each[0]}</p></a>
      </div>
    );
  })
  
  return (
    <div>
      <div>
      <div class="modal fade" id="profilefollowers" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable  ">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="postlikeusersmodal">Followers</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              {RenderFollowers}
              
                         
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default ProfileFollowers;
