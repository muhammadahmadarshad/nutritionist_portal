import React ,{useState,useEffect}from 'react';

import classNames from 'classnames'

import Sidebar from '../Sidebar/Sidebar';
import NavBar from '../Navbar/navbar';
import Loading from '../Loading/Loading';
import Axios from 'axios';
import {  Button } from 'reactstrap';
import {  useParams } from 'react-router-dom';

import SendResponse from './SendResponse';

  


export default function Query(props)  {

  const [isOpen,setOpen]=useState(false)
  const [loading,setLoading]=useState(true)
  const [data,setData]=useState({})
  const [err,setError]=useState(false) 
  const {id}=useParams()
  const [modal,setModal]=useState(false)
  
  
  let toggle=()=>{
      setOpen(!isOpen)
   }

let getData=()=>{
    setLoading(true)
    Axios({method:"GET",url:'http://localhost:5000/query/message_by_id/'+id,headers:{
        'x-auth-token':localStorage.getItem('nutri-token')
    }}).then(res=>{
        console.log(res.data)
        setData(res.data)
        setLoading(false)
        
        setError(false)

    })
    .catch(err=>{


        setError(true)
        setLoading(false)
    })


   }
   useEffect(getData,[id])

if(loading){


    return (        
    <div className="App wrapper content">     
    <Sidebar toggle={toggle} isOpen={isOpen}/>
    <div className={classNames('content container-fluid',{'is-open':isOpen})}>
    <NavBar toggle={toggle} isOpen={isOpen }/>
        <Loading></Loading>
    </div>


            
     
     </div>
)


}  

else if(err){


    return (        
    <div className="App wrapper content">     
    <Sidebar toggle={toggle} isOpen={isOpen}/>
    <div className={classNames('content container-fluid',{'is-open':isOpen})}>
    <NavBar toggle={toggle} isOpen={isOpen }/>
        <h1 className='text-center text-danger'>Not Found</h1>
    </div>


            
     
     </div>
)


} else {
 
    return (
        <div className="App wrapper content">  
       
       
       <Sidebar toggle={toggle} isOpen={isOpen}/>

       <div className={classNames('content container-fluid',{'is-open':isOpen})}>
       
       <NavBar toggle={toggle} isOpen={isOpen }/>
       <div className='container'>

       <h3 className='text-center  text-primary'>Message</h3>

        <div className='jumbotron'>
        
            <p  className='p-2'>{data.query}
            </p>
    <span className='text-right'><strong>From: </strong>  {data.author_id.first_name +" "+data.author_id.last_name}</span>
        </div>

        
        <div >
               
                <SendResponse modal={modal} msg={data} getData={getData} name={data.author_id.first_name +" "+data.author_id.last_name} toggle={()=>{setModal(!modal)}}></SendResponse>
                {data.response?<div className='jumbotron'>
                    <h3 className='text-center text-primary'>Response</h3>
                    <p className='p-2'>{data.response}</p>
                    <Button className='mt-4' color='primary' block outline onClick={()=>{setModal(!modal)}}>Update</Button>
                    </div>:
                    <div className='m-auto  w-50'>
                        <Button color='primary' block outline onClick={()=>{setModal(!modal)}}>Send Response</Button>
                    </div>
                }
            


        </div>

       </div>


       </div>
        
        </div>

    );
  
}}
