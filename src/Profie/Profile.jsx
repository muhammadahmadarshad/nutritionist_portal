import React, { useEffect,useState } from 'react'
import Loading from '../Loading/Loading'
import NUTProfile from './NutritionistProfile'
import axios from 'axios'
import Sidebar from '../Sidebar/Sidebar'
import NavBar from '../Navbar/navbar'
import classNames from 'classnames'


function Profile(props){
const [isOpen,setOpen]=React.useState(false)
const [data,setData]=useState({})
const [loading,setLoading]=useState(true)
const [err,setError]=useState(false)
let toggle=()=>{
    setOpen(!isOpen)
 }


function getProfile(){
    setLoading(true)
    axios({method:'get', url:'http://localhost:5000/nutritionist/me',headers:{'x-auth-token':localStorage.getItem('nutri-token')}})
    .then(res=>{
        setData(res.data)
        setLoading(false)
        setError(false)
    }).catch(err=>{
        setError(true)
        setLoading(false)
        
    })
}

useEffect(getProfile,[])

if(loading){


    return  (   <div className="App wrapper content">  
       
       
    <Sidebar toggle={toggle} isOpen={isOpen}/>

    <div className={classNames('content container-fluid',{'is-open':isOpen})}>
    
    <NavBar toggle={toggle} isOpen={isOpen }/>
    <div className="conatiner">
    <Loading/>
    </div>
    </div>
    </div>
);
}
else if(err){
  


        return  (   <div className="App wrapper content">  
           
           
        <Sidebar toggle={toggle} isOpen={isOpen}/>
    
        <div className={classNames('content container-fluid',{'is-open':isOpen})}>
        
        <NavBar toggle={toggle} isOpen={isOpen }/>
        <div className="conatiner">
        <h1 style={{textAlign:'center'}} className='text-danger text-center'>Profile Not Found</h1>
        </div>
        </div>
        </div>
    );
}




return(
    <div className="App wrapper content">  
       
       
    <Sidebar toggle={toggle} isOpen={isOpen}/>

    <div className={classNames('content container-fluid',{'is-open':isOpen})}>
    
    <NavBar toggle={toggle} isOpen={isOpen }/>
    <div className="conatiner">
    <NUTProfile history={getProfile} data={data} education={data.education} experience={data.experience} specialities={data.specialities}  />
    </div>
    </div>
    </div>
);
}

export default Profile;