import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router';
import {DecodeToken} from '../token_decode'
import AxiosRequest from '../../axios'

const Create = () => {
  
  const navigate = useNavigate();
  const {user_id,username,email}= DecodeToken(localStorage.getItem("access_token"))
  const [newPostDetails,setNewPostDetails] = useState({title:"",content:"",category:"",data:"",author:user_id,username:username,email:email,price:null,image:"",image_a:"",image_b:"",image_c:""})
  const [categories,setCategories] = useState([])

  const getCategories = async() => {
    const categories = await AxiosRequest.get("shareme/posts/categories")
                    .then((res) => {
                      setCategories(res.data)
                    })
  }

  useEffect(() => {
    getCategories();
  }, [])
  


  const handleSubmit = async() =>{
    let form_data = new FormData();
    
    if(newPostDetails.content !== "" && newPostDetails.title!=="" && newPostDetails.image!="" && newPostDetails.image_a!="" && newPostDetails.image_b!="" && newPostDetails.image_c !=""){
      form_data.append('image', newPostDetails.image, newPostDetails.image.name);
      form_data.append('image_a', newPostDetails.image_a, newPostDetails.image_a.name);
      form_data.append('image_b', newPostDetails.image_b, newPostDetails.image_b.name);
      form_data.append('image_c', newPostDetails.image_c,newPostDetails.image_c.name);
      form_data.append('title',newPostDetails.title);
      form_data.append('content', newPostDetails.content);
      
      
      const newPostData = JSON.stringify(newPostDetails);
      console.log(form_data)
      const a = await AxiosRequest.post('shareme/posts/new',form_data)
          .then((res) => {console.log(res);navigate("/shareme/posts");})
          .catch((err) => {console.log(err);})  
      }
      else{
        alert("Fill all the credentials");
      }
    }

  const handleChange = (e) =>{
    

    if(e.target.name == "category"){
      newPostDetails[e.target.name] = parseInt(e.target.value);
    }
    if(e.target.name == "image" || e.target.name == "image_a" || e.target.name == "image_b" || e.target.name == "image_c" ){
      newPostDetails[e.target.name] =e.target.files[0];
    }
    else{
      newPostDetails[e.target.name] = e.target.value;
    }
    setNewPostDetails(newPostDetails);    
    console.log(newPostDetails)
  }



  const CategoryOptions = categories.map((each) => {
    
    return(
      <option key={each.id} value={each.id}>{each.name}</option>
    );
  })
  
  const RenderCategory = () => {
    return(
      <div>
        <select name='category' class="form-select" aria-label="Default select example" onChange={handleChange}>
          {CategoryOptions}
          </select>
      </div>
    );
  }
  
  
  
  
  
  


  




  
  return(
  
  <div className='container-fluid col-md-5'  style={{backgroundColor:"white",padding:"3%",borderRadius:"25px",marginTop:"25px"}}>
  <p style={{fontSize:"24px"}}>Create a new Product</p>
  
  <div class="form-group" style={{marginTop:"2%"}}>
    <p className='lead'>Title</p>
    <input type="text" name="title" class="form-control" placeholder="Title"  onChange={handleChange}/>
  </div>
  <div class="form-group" style={{marginTop:"2%"}}>
  <p className='lead'>Content</p>
    <textarea name="content"  type="text" class="form-control" rows="4" placeholder="Content"  onChange={handleChange}/>
  </div>
  <div class="form-group" style={{marginTop:"2%"}}>
  <p className='lead'>Price</p>
    <input name="price" type="number" class="form-control" rows="1" placeholder="Enter the Price"  onChange={handleChange}/>
  </div>

  <div  style={{marginTop:"2%"}}>
  <p className='lead'>Category: </p>
  <RenderCategory/>
  </div>
  




  <div class="mb-3" style={{marginTop:"2%"}}>
  <p className='lead mb-1'>Image</p>
  <input class="form-control" name="image" accept="image/png, image/jpeg" type="file" id="formFile" onChange={handleChange}/>
  </div>

  <div class="mb-3" style={{marginTop:"2%"}}>
  <p className='lead mb-1'>Image</p>
  <input class="form-control" name="image_a" accept="image/png, image/jpeg" type="file" id="formFile" onChange={handleChange}/>
  </div>

  <div class="mb-3" style={{marginTop:"2%"}}>
  <p className='lead mb-1'>Image</p>
  <input class="form-control" name="image_b" accept="image/png, image/jpeg" type="file" id="formFile" onChange={handleChange}/>
  </div>

  <div class="mb-3" style={{marginTop:"2%"}}>
  <p className='lead mb-1'>Image</p>
  <input class="form-control" name="image_c" accept="image/png, image/jpeg" type="file" id="formFile" onChange={handleChange}/>
  </div>


  <div align="right" style={{marginTop:"3%"}}>
  <i class="red check icon" onClick={handleSubmit}></i>
  </div>
  </div>
  );
};






























export default Create;
