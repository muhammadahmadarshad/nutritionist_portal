import React,{useState} from 'react';
import {Input,InputGroup,InputGroupAddon,InputGroupText} from 'reactstrap'
import {Link} from 'react-router-dom' 
import './Login.css'
import {useAuth} from '../auth'
import axios from 'axios'
export default function Login (props) {

 let [email,setEmail]=useState('')
 let [password,setPassword]=useState('')
let [error,setError]=useState({error:false,msg:""})

 const {dispatch}=useAuth()
  const changeEmail=(e)=>{


    setEmail(e.target.value)


  }

 const changePassword=(e)=>{


    setPassword(e.target.value)


  }


  const onLogin=(e)=>{

    e.preventDefault()

    axios({url:"http://localhost:5000/nutritionist/login",method:'post',data:{email,password}}).then((res)=>{
    console.log(res.data)
   dispatch({type:'set_token',payload:res.data.token})
    localStorage.setItem('nutri-token',res.data.token)
    props.history.push('/')
    }).catch(err=>{
      
      setError({error:true,msg:err.response.data.msg})
    })


  }



  
    return (
      <div className='layout'>

        <h1 className='text-center text-dark mt-5'>Nutritionist Portal</h1>
      <div  className='box' >
      <h2 className='text-center text-design text-dark mb-2 text-shadow'>Health Portal</h2>
      <div  className='jumbotron  login-center'>
      
      <i className='fa  avatar fa-user'></i>
       
      <form onSubmit={onLogin}>
          
        <div className='mt-2'>
      
        <InputGroup>
          <InputGroupAddon addonType='prepend'>
            <InputGroupText className='bg-white ' > <span className='pt-1 pb-1 text-center  fa fa-envelope-o '></span></InputGroupText>

          </InputGroupAddon>
          <Input onChange={changeEmail} invalid={error.error} value={email} placeholder="Enter Email" type='email' />
        </InputGroup>
        
        </div>
        <div className='mt-2'>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
          <InputGroupText className='bg-white ' > <span className='p-1  fa fa-lock '></span></InputGroupText>

        </InputGroupAddon>
       
      

        <Input onChange={changePassword}invalid={error.error} value={password} placeholder="Enter Password" type='password' />
        </InputGroup>
        </div>
        <div className='mt-4 btn-center'> 
        <Input type='submit' value='Login'  className='bg-success text-white'></Input>
        
       
        </div>
        <div className='text-center mt-4'>
        <Link className='text-primary' to='/forget_password'>Forgot Password?</Link>
        
        </div>
        <div className='text-center mt-4'>
        {error&&<span className='text-center text-danger'>{error.msg}</span>}
        </div>
        </form>
        
      </div>
      </div>
      </div>
    );
 
}
