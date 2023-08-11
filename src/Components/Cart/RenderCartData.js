import React from 'react'
import AxiosRequest from '../../axios'
const RenderCartData = ({props}) => {
    const each = props
    console.log(each)



    const deleteCartItem = async(id) => {
        const deleteCartItem = await AxiosRequest.delete(`/shareme/cart/${id}`)
                            .then((res) => {
                                
                            })
                            .catch((err) => {console.log(err)})
    }   


    return (
         
            <div style={{backgroundColor:"white", borderRadius:"25px",margin:"25px",padding:"25px"}} key={each.id} >
                <div className='d-flex' style={{justifyContent:"space-between"}}>
                <p style={{fontSize:"23px",textAlign:"left"}} className='lead'>{each.title}</p>
                <div className='d-flex'>
                <i className='large red close icon' onClick={() => {deleteCartItem(each.id)}}></i>
                </div>
                </div>
                <div style={{textAlign:"left"}} className="row">
                <div className='col-md-6'>
                <p style={{fontSize:"16px"}}> Quantity: {each.quantity}</p>
                <p style={{fontSize:"16px"}}>NetPrice: {each.net_price}</p>
                </div> 
                </div>
            </div>            
        );
  }
export default RenderCartData;