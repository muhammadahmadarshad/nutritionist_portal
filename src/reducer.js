export const reducer = (state, action) => {

    if(action.type === "set_token" ){
      return {...state,token:action.payload}
    }
  
    else if(action.type==='remove_token')
    {
      return {...state,token:""}
    }
    else if(action.type==='inc')
    {
      return {...state,value:state.value+1}
    }
  
  
  
      
    }