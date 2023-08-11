import React,{useState,useEffect} from 'react'
import { DecodeToken } from '../token_decode'
import AxiosRequest from '../../axios'
import CartProductRecommendation from './CartProductRecommendation'
import { useNavigate } from 'react-router'
import { Axios } from 'axios'


const CartDetails = () => {
    const navigate = useNavigate()
    const user_id = DecodeToken(localStorage.getItem("access_token")).user_id;
    const [cartData,setCartData] = useState([])
    const [category,setCategory] = useState([])
    const [productRecommendation,setProductRecommendation] = useState([])
   


    const calculateNetPrice = () => {
        let totalAmount = 0
        for(let i=0;i<cartData.length;i++){
            totalAmount += (parseInt(cartData[i].net_price))
        }
        
        return totalAmount;
    }


    
    
    
    


    
    const retrieveCart = async() => {
        const cartProducts = await AxiosRequest.get(`/shareme/cart/${user_id}`)
                            .then((res) => {
                                setCartData(res.data)
                                retrieveRecommendation();
                            })
                            .catch((err) => {console.log(err)})        
    }


    const retrieveRecommendation = async() => {
            const recProducts = await AxiosRequest.post("/shareme/posts/recommend",{user_id})
                            .then((res) => {
                                setProductRecommendation(res.data)    
                            })
                            .catch((err) => {console.log(err)})
    }



        // const handleQuantity = async(id,price) => {
        //     const setQuantity = await AxiosRequest.put(`/shareme/cart/${id}`,{"quantity":quantity,"net_price":price})
        //                         .then((res) => {retrieveCart();})
        //                         .catch((err) => {console.log(err)})
        // }

    const saveLaterHandler = async(id,del_id) => {
        const addToSave =await AxiosRequest.post(`shareme/savelater/${id}`,{"buyer":user_id,"id":id})
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err))

        deleteCartItem(del_id);
    }


    const deleteCartItem = async(id) => {
            const deleteCartItem = await AxiosRequest.delete(`/shareme/cart/${id}`)
                                .then((res) => {
                                    retrieveCart();
                                })
                                .catch((err) => {console.log(err)})
    }


    const handleOrder = async() => {
            const passOrder = await AxiosRequest.post(`/sales/orders/${user_id}`,cartData)
                            .then((res) => {console.log(res);})
                            .catch((err) => {console.log(err)})
            navigate(`/shareme/orders/${user_id}`)
    }
    

    const RenderCartData = cartData.map((each) => { 
            console.log(each)

            
            return(            
                <div className='lg:ml-3 mt-4' key={each.id} >
                    <div className='d-flex' >

                    <div>
                    <img src={`http://localhost:8000${each.image}`} className="w-25" onClick={() => navigate(`/shareme/posts/${each.product}`)}></img>
                    </div>


                    <div>
                    <p style={{fontSize:"23px",textAlign:"left"}} className='lead'>{each.title}</p>
                    
                    <i className='large red close icon' onClick={() => deleteCartItem(each.id)}></i>
                    <i className='large red save icon' onClick={() => saveLaterHandler(each.product,each.id)}></i>
                    <p style={{fontSize:"16px"}}> Quantity: {each.quantity}</p>
                    <p style={{fontSize:"16px"}}>NetPrice: {each.net_price}</p>


                    </div>
                    </div>
                   
                </div>            
            );
    })


    useEffect(() => {
      retrieveCart();
      calculateNetPrice();
    }, [])


    return (
    <div align="center">
       
        <div className='container row'>


        <div className='col-md-8'>
        <p className='lg:text-4xl mt-3 mb-3 lg:ml-3 text-left'>Shopping Bag</p>
        {RenderCartData}
        </div>


        <div className='col-md-3' style={{textAlign:"left", marginLeft:"25px", marginTop:"25px"}} >

            <p style={{fontSize:"22px"}}>Total Quantity: {cartData.length}</p>
            <p style={{fontSize:"22px"}}>Total Amount: {calculateNetPrice()} </p>
            <button className='btn btn-dark' onClick={handleOrder}> Place you order</button>
        </div>
        </div>

        <div>
            <CartProductRecommendation props={productRecommendation}/>
        </div>

    </div>
  )
}

export default CartDetails;
