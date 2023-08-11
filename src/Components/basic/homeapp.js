import React,{useState,useReducer} from 'react'
import ReduxCounter from '../Redux/Counter'
import Auth from '../Redux/Auth'
import Header from '../Redux/Header'
import { useSelector } from 'react-redux'

const HomeApp = () => {
  const AuthState = useSelector(state => state.auth.login)

  const Even = () => {
    return(
      <div>
          <h3 className='display-6'>Even Page</h3>
      </div>
    );
  }

  const Odd = () => {
    return(
      <div>
           <h3 className='display-5'>Odd Page</h3>
      </div>
    );
  }


  const DecreaseHandler = () => {
    if(state.count>0){
      dispatch({type:"decrement"}); 
      dispatch({type:"toggletext"})
    }
  }



  const IncreaseHandler = () => {
    dispatch({type:"increment"}); 
    dispatch({type:"toggletext"})
  }
  


  const reducer = (state,action) => {
    if(action.type === "increment"){
      return {count: state.count+1,displayText:state.displayText}
    }  
    if(action.type === "decrement"){
      return {count: state.count-1,displayText:state.displayText}
    }
    if(action.type === "toggletext"){
      return {count: state.count,displayText:!state.displayText}
    }
  }

  const [state,dispatch] = useReducer(reducer, {count:0,displayText:true})


  const ComponentCounter = () => {
    return(
      <div className='col-md-3 mt-5'  style={{boxShadow:"0 1px 8px rgba(0, 0, 0, 0.2)",backgroundColor:"#f4f0fa",borderRadius:"15px",color:"brown",margin:"4%",padding:"25px"}}>
      {state.displayText ? <Even/> : <Odd/>}
      <h2 className='display-6'>No: {state.count}</h2>
      <div className='d-flex mt-4 gap-10'>
      <button className='btn btn-dark' onClick={IncreaseHandler}>Next Page</button>
      <button className='btn btn-dark' onClick={DecreaseHandler}>Back Page</button>
      </div>
      </div>
    );
  }

  const authState = useSelector(state => console.log(state))

  
  return (  
  <div>
    
    
    {AuthState ? <Header/> : <Auth/>}
    
    {/* <div className='row' >
  
        <ComponentCounter/>
        <ReduxCounter/>
       
    </div>      */}
   
  </div>

  
  )
}

export default HomeApp



// const HomeApp = () => {
//   return(
//     <div>Home</div>
//   );
// }

// export default HomeApp