import React ,{useState,useEffect}from 'react';

import classNames from 'classnames'
import './Dashboard.css'
import Sidebar from '../Sidebar/Sidebar';
import NavBar from '../Navbar/navbar';


  


export default function Dashboard(props)  {

  const [isOpen,setOpen]=useState(false)
   
  let toggle=()=>{
      setOpen(!isOpen)
   }

  
    return (
        <div className="App wrapper content">  
       
       
       <Sidebar toggle={toggle} isOpen={isOpen}/>

       <div className={classNames('content container-fluid',{'is-open':isOpen})}>
       
       <NavBar toggle={toggle} isOpen={isOpen }/>
        <div className='jumbotron'>
            
        </div>

       </div>


               
        
        </div>

    );
  
}
