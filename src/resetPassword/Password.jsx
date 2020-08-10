import React,{useState} from 'react'
import ResetPassword from './ResetPassword'
import Verification from './Verificationcode'
import Forgetpassword from './ForgetPassword'
import Axios from 'axios'

const Password = (props) => {
    /*Email */
    const [loading,setLoading]=useState(false)
    const[email,setEmail]=useState({email:'',verified:false,invalid:false,msg:"Email Not Found"})
    function changeEmail({target}){
        setEmail({...email,email:target.value,verified:false,invalid:false,msg:""})
    }

    /*Opt*/
    const[opt,setOpt]=useState({opt:'',verified:false,invalid:false,msg:"Invalid OPT"})
    function changeOpt(value){
        setOpt({...opt,opt:value,verified:false,invalid:false})
    }


    /*Password*/

    const[password,setPassword]=useState({password:'',invalid:false, msg:'Not Matched'})
    const[confirmpassword,setConfirmpassword]=useState({confirmpassword:'',invalid:false, msg:'Not Matched'})

function changePassword({target}){
    setPassword({...password,password:target.value})
}
function changeConfirmPassword({target}){

    if(password.password!==target.value){
        setConfirmpassword({...confirmpassword,confirmpassword:target.value,invalid:true, msg:'Not Matched'})
        setPassword({...password,invalid:true})
   
}

    else {

        setConfirmpassword({...confirmpassword,invalid:false,confirmpassword:target.value})
        setPassword({...password,invalid:false})
    }
}
   
     const handleForm=(e)=> { 

        e.preventDefault()
        setLoading(true)
        Axios({method:'post',url:'http://localhost:5000/nutritionist/forgotPassword',
    
    
        data:{email:email.email}


    }).then(res=>{


        setEmail({...email,verified:true,invalid:false})
        setLoading(false)
    
    }).catch(err=>{
        
        setEmail({...email,invalid:true,msg:"Email Not Found."})

        setLoading(false)

    })



     }
     const handleVerification=(e)=> {

        e.preventDefault()
        setLoading(true)
        Axios({method:'post',url:'http://localhost:5000/nutritionist/verify_opt',
    
    
        data:{email:email.email,opt:opt.opt}


    }).then(res=>{
        setOpt({...opt,verified:true,invalid:false})
        setLoading(false)
    }).catch(err=>{
        setOpt({...opt,invalid:true,msg:"Invalid Verification Code"})
        setLoading(false)
    })


      }


      const handleReset=(e)=> {

        e.preventDefault()
        if(!confirmpassword.invalid){

            setLoading(true)
        Axios({method:'post',url:'http://localhost:5000/nutritionist/resetPassword',
    
    
        data:{email:email.email,password:password.password}


    }).then(res=>{
        setEmail({...email,email:'',verified:false,invalid:false,msg:""})
        setOpt({...opt,opt:'',verified:true,invalid:false})
        props.history.push('/login')
        setLoading(false)
    }).catch(err=>{
        setLoading(false)
    })}
}


     



if(email.verified){

    if(opt.verified)
    return ( <div>


        <ResetPassword handleForm={handleReset} loading={loading} confirmpassword={confirmpassword} password={password} changeConfirmPassword={changeConfirmPassword} changePassword={changePassword}/>
        
        

    </div> );

    else {

        return(
            <div>
                <Verification opt={opt} loading={loading} handleForm={handleVerification} handleChange={changeOpt}/>
            </div>
        )
    }
}

else {
    return(<div>
    <Forgetpassword  email={email} loading={loading}  changeEmail={changeEmail} handleForm={handleForm}/>
    </div>)


}}
 
export default Password;