import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import AxiosRequest from '../../../axios';
import { useLocation } from 'react-router';
import { Axios } from 'axios';
import { DecodeToken } from '../../token_decode';
import LikeCommentUsers from './likecommentusers';
import { Icon } from 'semantic-ui-react'

const ReviewMangement = (props) => {

    const location = useLocation()
    const [comments,setComments] = useState([]); 
    const [postComment,setPostComment] = useState("");
    const key = parseInt(location.pathname.slice(15,))
    
    
    
    const retriveComments = async() => {
        const fetchComments = await AxiosRequest.get(`/shareme/posts/${key}/comments`)
            .then(res => {
                setComments(res.data);
                
                props.props(res.data.length)
            })

            .catch(err => console.log(err))
    }


    const [commentId,setCommentId] =useState(null)
    const [commentData,setCommentData] = useState({})

    const user_id = DecodeToken(localStorage.getItem("access_token")).user_id

    
    

    const LikeComments = async(idd) => {
        const comment_like =await AxiosRequest.post(`/shareme/posts/${key}/comments/likes`,{"user_id":user_id,"comment_id":idd})
                            .then((res) => {
                                console.log(res.data)
                                setCommentData({"res":res.data.res,"data":res.data.data});
                               
                                }); 
    }

    const handleReviewDelete = async(id) => {
        console.log(id);
        const a = await AxiosRequest.delete(`/shareme/posts/${id}/comments`)
                    .then((res) => {
                        console.log(res.data);
                        retriveComments();
                    
                    })
                    .catch((err) => {console.log(err.data)})

    }


    
   
    const RenderComments = comments.map((each) => {
        
        let likeIconStyle = "outline"
        each.likes.map((a) => {
            if(a === user_id){
                likeIconStyle = ""
            }
        
        })
        console.log(each.user,user_id)

        const DeleteReviewIcon = () => {
            if(each.user ==user_id){
                return(
                    <div>
                        <i className='large red close icon' onClick={() => handleReviewDelete(each.id)}></i>
                    </div>
                );
            }
            else{
                return null;
            }
        }
        

        return(
                <div  class="mt-5 hover:scale-105  py-8 px-4 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
               
                <div className="text-right space-y-2 sm:text-left ">
                <div className="space-y-0.5">

                    <div className='d-flex justify-between mb-1'>
                        
                    <div className='d-flex gap-2'>
                    <img className="block mx-auto sm:h-3  md:h-8 lg:h-9 rounded-full sm:mx-0 sm:shrink-0" src={`http://localhost:8000${each.user_image}`} alt="Woman's Face"/>
                    <Link to={`/shareme/profile/${each.user}`}><p className="text-xl font-semibold text-black ">{each.username}</p></Link>
                    </div>

                    <div className='d-flex ml-10 '>
                    <DeleteReviewIcon></DeleteReviewIcon>
                    
                    <Icon name={`thumbs up ${likeIconStyle}`} size="large" onClick={()=>{LikeComments(each.id);}} />
                    
                    <p data-bs-toggle="modal" data-bs-target="#commentlikeusersmodal">{each.likes.length}</p> 
                    </div>

                    

                    
                   
                    </div>

                    <p className="text-sm text-black ">{each.content}</p>
                    <div className='d-flex gap-3 mt-2'>
                    <p className="text-xs font-extralight text-black ">{each.comment_time.slice(5,7)}/{each.comment_time.slice(8,10)}/{each.comment_time.slice(0,4)}</p>
                    <p className="text-xs font-extralight text-black ">{each.comment_time.slice(11,16)}</p>
                    </div>
                </div>
                </div>
                </div>
        );
    })



    const handleComment = async() => {

        const commentRequest =await AxiosRequest.post(`/shareme/posts/${key}/comments`,{content:postComment,user_id:user_id})
                            .then(res => console.log(res))
                            .catch(err => console.log(err))
        retriveComments();
        setPostComment("")
    }


    useEffect(() => {    
        retriveComments();
    }, [commentData]);


    

    

    return(
        <div>
        <p style={{fontSize:"20px", marginTop:"30px"}}>Reviews</p>
       
        <div className='d-flex gap-3 items-center justify-start'>
            <input placeholder='   Write a review' className='form-control' value={postComment} onChange={(e) => setPostComment(e.target.value)} style={{borderRadius:"15px",height:"35px",width:"30rem",marginTop:"10px"}}></input>
            <button className='btn btn-dark mt-3' onClick={handleComment}>Post</button>
           
        </div>
        {RenderComments}
        </div>
    );
}

export default ReviewMangement;




