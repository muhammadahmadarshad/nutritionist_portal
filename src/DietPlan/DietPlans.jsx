import React ,{useState,useEffect}from 'react';

import classNames from 'classnames'

import Sidebar from '../Sidebar/Sidebar';
import NavBar from '../Navbar/navbar';
import Loading from '../Loading/Loading'
import { Table } from 'reactstrap';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import Paginate from './Paginate'
  


export default function DietPlans(props)  {

  const [isOpen,setOpen]=useState(false)
  const [loading,setLoading]=useState(true)
  const [data,setData]=useState({})
  let {page}=useParams()
  const [err,setErr]=useState(false)
  let toggle=()=>{
      setOpen(!isOpen)
   }

   useEffect(()=>{

Axios({method:'get',url:`http://localhost:5000/diet_plan/nutri/get_diet_plans/${page}`,headers:{'x-auth-token':localStorage.getItem('nutri-token')}})
.then(res=>{

    console.log(res.data)
    setData(res.data)
    setLoading(false)
    setErr(false)

}).catch(()=>{

    setErr(true)
    setLoading(false)
})



   },[page])
   if(loading){

    return (
        <div className="App wrapper content">  
       
       
        <Sidebar toggle={toggle} isOpen={isOpen}/>
 
        <div className={classNames('content container-fluid',{'is-open':isOpen})}>
        
        <NavBar toggle={toggle} isOpen={isOpen }/>
         <div className='container'>
 
             <Loading/>
             
         </div>
 
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
     <div className='container'>

         <h1 className='text-danger' style={{textAlign:'center'}}>Not Found</h1>
         
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

            <h1 className='bg-dark text-primary p-2 text-shaded rounded-lg' style={{textAlign:'center'}}>Active Diet Plans</h1>

            <div className='mt-3'>
                <Table striped dark>

                    <thead>
                        <tr>
                            <th>Owner</th>
                            <th>Purpose</th>
                            <th>Start Date</th>
                            <th>Updated At</th>
                            <th>Details</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.diet_plans.map(diet_plan=>{

                            return (<tr>

                            <td data-label='Owner'>{diet_plan.owner_id.first_name+" "+diet_plan.owner_id.last_name}</td>
                            <td data-label='Purpose'>{diet_plan.title}</td>
                            <td data-label='Start Date'>{moment(diet_plan.start_date).calendar()}</td>
                            <td data-label='Updated At' >{moment(diet_plan.updatedAt).calendar()}</td>
                            <td><Link className='btn btn-sm btn-primary' to={`/diet_plan_details/${diet_plan._id}`}> Show</Link></td>
                            </tr>)

                        })}
                        
                    </tbody>



                </Table>

                <Paginate match={props.match} history={props.history} total_results={data.total_results} url={'/active_diet_plans/'} >



                </Paginate>
            </div>            
        </div>

       </div>


               
        
        </div>

    );
  
}
