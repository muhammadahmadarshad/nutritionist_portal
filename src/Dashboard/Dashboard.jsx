import React ,{useState}from 'react';

import classNames from 'classnames'
import './Dashboard.css'
import Sidebar from '../Sidebar/Sidebar';
import NavBar from '../Navbar/navbar';
import { Link } from 'react-router-dom';
  
import {FastfoodOutlined,FavoriteOutlined,DescriptionOutlined
    , ListAltOutlined,AccountBoxOutlined,MessageOutlined} from '@material-ui/icons'
  


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
        <div className='container' >
          <div className='mt-5'>
 
       
         <div className='m-auto'>
         <div className='row text-center '>
 
         <div className='col-md-4 mt-4 col-6'>
           <Link className='btn ' style={{background:"#b80096",color:"#fff"}} to='/account'>
           <span className='text-center'>
 
           <AccountBoxOutlined style={{fontSize:120,color:'#fff'}}/>
            
           
           </span>
           <br/>
           Profile
           </Link>
           </div>
 
           <div className='col-md-4 mt-4 col-6'>
           <Link className='btn ' style={{background:"#06313d",color:"#fff"}} to='/search_food'>
           <span className='text-center'>
 
           <FastfoodOutlined style={{fontSize:120,color:'#fff'}}/>
            
           
           </span>
           <br/>
           Search Foods
           </Link>
           </div>
 
           <div className='col-md-4 mt-4 col-6'>
           <Link className='btn  ' style={{background:'#0a883d',color:'#fff'}} to='/my_foods/1'>
           <span className='text-center'>
 
           <FavoriteOutlined style={{fontSize:120,color:'#fff'}}/>
            
           
           </span>
           <br/>
           Favorite Foods
           </Link>
           </div>
 
 
       
 
           <div className='col-md-4 col-6 mt-4'>
           <Link className='btn' style={{background:'#1e0121', color:'#fff'}} to='/active_diet_plans/1'>
           <span className='text-center'>
 
           <DescriptionOutlined style={{fontSize:120,color:'#fff'}}/>
            
           
           </span>
           <br/>
           Active Diet Plans
           </Link>
           </div>
 
           <div className='col-md-4 col-6 mt-4'>
           <Link className='btn ' style={{background:'#474447',color:'#fff'}} to='/orders'>
           <span className='text-center'>
 
           <ListAltOutlined style={{fontSize:120,color:'#fff'}}/>
            
           
           </span>
           <br/>
            Orders
          
           </Link>
           </div>
 
           <div className='col-md-4 col-6 mt-4'>
           <Link className='btn bg-primary ' style={{background:'#87e447',color:'#fff'}} to='/queries/1'>
           <span className='text-center'>
 
           <MessageOutlined style={{fontSize:120,color:'#fff'}}/>
            
           
           </span>
           <br/>
            Queries
          
           </Link>
           </div>

 
 
 
 
         </div>
           </div>
 
        </div>
         </div>
 
         </div>
         
         </div>

    );
  
}
