import React,{useState,useEffect} from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router'
import { Link } from 'react-router-dom'
import { DecodeToken } from '../token_decode'
import AxiosRequest from '../../axios'
import { Axios } from 'axios'



const Chat = () => {

    const user_id = DecodeToken(localStorage.getItem("access_token")).user_id
    const [socketDetails,setSocketDetails] = useState({user_id:null,username:null,ws_api:null})
    const location = useLocation()
    const chat_id = location.pathname.slice(14)
    const yy =location.pathname.slice(14)
    const [message,setMessage] = useState("")
    const [messageData,setMessageData] = useState([])
    const [accountData,setAccountData] = useState([])
    const [id,setId] = useState(location.pathname.slice(14))
    const navigate = useNavigate();


    if(socketDetails.ws_api){

    socketDetails.ws_api.onopen = () => {console.log("connection established")}
    socketDetails.ws_api.onclose = () => {console.log("disconnected")}

    socketDetails.ws_api.onmessage = (res) => {
        if(res.data){
            console.log(res.data)
            retrieveMessages();
        }
    }}

    const socketMessages = () => {
        if(message.length>0){
            const msg_data = JSON.stringify({"data":message,"code":chat_id,"type":"send"})
            if(msg_data.data !== ""){
                socketDetails.ws_api.send(msg_data);
            }
            setMessage("");
        }
    }

    const getUsers = async() => {
        const users = await AxiosRequest.get(`/accounts/retrieve_profiles/${user_id}`)
                        .then((res)=> {console.log(res.data); setAccountData(res.data)})
                        .catch((err) => {console.log(err)})
    }

    const changeText = (sender) => {
        navigate(`/shareme/text/${user_id}-${sender}`);
        setId(user_id+"-"+sender);
    }

    const RenderAccounts = accountData.map((each) => {
        return(
            <div key={each.id}  onClick={ () => changeText(each.user)} className='sm:text-lg md:xl lg:text-xl col-md-3 mt-4 mb-4 bg-blue-200 p-2 rounded-xl shadow-md hover:scale-110 ' >
             {each.name}     
            </div>
        );
    })



    
    
   


    const retrieveMessages = async() => {
        const getMessage = await AxiosRequest.get(`/chat/text/${chat_id}`)
                            .then((res) => {
                                console.log(res.data)
                                setMessageData(res.data);
                            })

        // ws request to get message
        // const messagesList = JSON.stringify({"data":message,"code":chat_id,"type":"fetch"})
        // ws_api.send(messagesList); 

    }
    // http request to store message
    // const sendMessages = async() => {
    //     const sendMessage = await AxiosRequest.post(`/chat/text/${chat_id}`,{"data":message})
    //                         .then((res) => {retrieveMessages();})
    // }




    let RenderMessages = messageData.map((each) => {
        if(user_id == each.sender){
            return(
               
                <div  key={each.id} className='col-md-5 mt-3 mb-3' style={{backgroundColor:"lightGreen",borderRadius:"10px", padding:"5px",textAlign:"left",marginRight:"20px"}}>
                <div className='d-flex' style={{justifyContent:"space-between"}}>
                <p style={{fontSize:"13px"}}><b>You</b></p> 
                <p style={{fontSize:"10px", marginLeft:"10px"}}>{each.time.slice(0,10)}  {each.time.slice(11,16)}</p>
                </div>
                <p style={{fontSize:"15px"}}>{each.data}</p>
                </div>
              

            );
        }
        else{
            return(
               <div  key={each.id} align="right">
                <div className='col-md-5 mt-3 mb-3' style={{backgroundColor:"yellow",borderRadius:"10px", padding:"5px",textAlign:"right",marginRight:"20px"}}>
                    <div className='d-flex' style={{justifyContent:"space-between"}}>
                    <p style={{fontSize:"10px"}}>{each.time.slice(0,10)}  {each.time.slice(11,16)}</p>
                    <p style={{fontSize:"13px"}}><b>{each.sender_name}</b></p> 
                    </div>
                    <p style={{fontSize:"15px"}}>{each.data}</p>
                </div>
                </div>
               
            )
        }
    })

    

    useEffect(() => {
        const user_id = DecodeToken(localStorage.getItem("access_token")).user_id
        const username = DecodeToken(localStorage.getItem("access_token")).username
        const ws_api = new WebSocket(`ws://localhost:8000/ws/chat/${window.location.pathname.slice(14)}`);
        setSocketDetails({user_id:user_id,username:username,ws_api:ws_api})
        retrieveMessages();
        getUsers();
    }, [id])

   
    
    return (
    <div className='container-fluid mt-4'>
       
        <div className='row'>
            <div className='col-md-4'>
                {RenderAccounts}
            </div>
            <div className='col-md-8'>
                <div className='d-flex'>
                <input className='form-control' style={{width:"20rem"}} value={message} placeholder='Enter the message' onChange={(e) => {setMessage(e.target.value)}}></input>
                <button className='btn btn-dark ml-5' onClick={socketMessages}>Send</button>
                </div>
                {RenderMessages}
            </div>
           
        </div>
      
    </div>
  )
}


export default Chat;


