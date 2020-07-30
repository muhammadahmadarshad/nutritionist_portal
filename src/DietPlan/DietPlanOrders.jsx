import React ,{useState,useEffect}from 'react';

import classNames from 'classnames'

import Sidebar from '../Sidebar/Sidebar';
import NavBar from '../Navbar/navbar';
import Loading from '../Loading/Loading';
import { useParams } from 'react-router-dom';
import Ordertable from './DietPlanOrderTable';
import Axios from 'axios';


  


export default function DietPlanOrders(props)  {

  const [isOpen,setOpen]=useState(false)
  const [loading,setLoading]=useState(true)
  const [err,setError]= useState(false)
  const [data,setData]=useState({orders:[],total_results:0})

  let {page}=useParams()
  let toggle=()=>{
      setOpen(!isOpen)
   }

   let getData=()=>{
      setLoading(true)
      if(page===undefined){

        page=1
      }

      Axios({method:'get',url:`http://localhost:5000/diet_plan_order/orders/${page}`, headers:{'x-auth-token':localStorage.getItem('nutri-token')}})
      .then(res=>{

        setData(res.data)
        setLoading(false)
        setError(false)
      })
      .catch(()=>{
        setLoading(false)
        setError(true)
      })

   }
   useEffect(getData,[page])

   if(loading)
   {

    return(        
    <div className="App wrapper content">     
    <Sidebar toggle={toggle} isOpen={isOpen}/>

    <div className={classNames('content container-fluid',{'is-open':isOpen})}>
    
    <NavBar toggle={toggle} isOpen={isOpen }/>
     <div>
          <Loading/>
     </div>

    </div>


            
     
     </div>)


   }


   else if(err)
   {

    return(        
    <div className="App wrapper content">        
    <Sidebar toggle={toggle} isOpen={isOpen}/>

    <div className={classNames('content container-fluid',{'is-open':isOpen})}>
    
    <NavBar toggle={toggle} isOpen={isOpen }/>
     <div >
          <h1 className='text-danger text-center'>No Orders Available</h1>
     </div>

    </div>         
     </div>)


   }

   else
    return (
        <div className="App wrapper content">  
       
       
       <Sidebar toggle={toggle} isOpen={isOpen}/>

       <div className={classNames('content container-fluid',{'is-open':isOpen})}>
       
       <NavBar toggle={toggle} isOpen={isOpen }/>
        <div className='container'>
            <Ordertable data={data} match={props.match} history={props.history}/>
        </div>

       </div>


               
        
        </div>

    );
  
}
