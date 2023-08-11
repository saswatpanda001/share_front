import React,{useState,useEffect} from 'react'
import AxiosRequest from '../../axios'
import { DecodeToken } from '../token_decode'
import {useNavigate} from 'react-router-dom'




const Orders = () => {

  const navigation = useNavigate()

  const user_id = DecodeToken(localStorage.getItem("access_token")).user_id
  const [ordersData,setOrdersData] = useState([])

  const RetrieveOrders = async() => {
    const orders_dt = await AxiosRequest.get(`/sales/orders/${user_id}`)
                    .then((res)=> {
                      console.log(res.data)
                      setOrdersData(res.data)     
                    })
                    .catch((err) => {console.log(err)})
  }




  const RenderOrders = ordersData.map((each) => {
    console.log(each)
    return(

      <div  class="mt-5 hover:scale-110  py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
        <img onClick={() => {navigation(`/shareme/profile/${"1"}`)}} className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" src={`http://localhost:8000${each.image}`} alt="Woman's Face"/>
        <div className="text-right space-y-2 sm:text-left ">
          <div className="space-y-0.5">
            <p className="text-xl font-normal text-black ">{each.title}</p>
            <p className="text-md text-black ">Quantity: {each.quantity}</p>
            <p className="text-md text-black ">Rs: {each.net_price}</p>
          </div>
         
      </div>
      </div>


    
    );
  })

  useEffect(() => {
    RetrieveOrders();
  }, [])


  


  return (
    <div>
      <div className='row'>
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {RenderOrders}
        </div>

      </div>
      

    </div>
  )
}

export default Orders;
