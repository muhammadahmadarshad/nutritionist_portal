import React ,{useState,useEffect}from 'react';

import classNames from 'classnames'
import Sidebar from '../Sidebar/Sidebar';
import NavBar from '../Navbar/navbar';
import Loading from '../Loading/Loading';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import { Table } from 'reactstrap';
import moment from 'moment'
  


export default function DietPlanDetails(props)  {

  const [isOpen,setOpen]=useState(false)
  const [loading,setLoading]=useState(true)
  const [err,setErr]=useState(false)
  const [data,setData]=useState()
  let toggle=()=>{
      setOpen(!isOpen)
   }

   let {id}=useParams()


   useEffect(()=>{

    Axios({method:'get',url:`http://localhost:5000/diet_plan/get_diet_plan_details/${id}`,headers:{'x-auth-token':localStorage.getItem('nutri-token')}})
    .then(res=>{
        setData(res.data)
        setLoading(false)
        setErr(false)
    })
    .catch(err=>{

        setErr(true)
        setLoading(false)
    })


   },[id])
if(loading)
{
    return (
        <div className="App wrapper content">  
       
       
       <Sidebar toggle={toggle} isOpen={isOpen}/>

       <div className={classNames('content container-fluid',{'is-open':isOpen})}>
       
       <NavBar toggle={toggle} isOpen={isOpen }/>
            <Loading/>

       </div>


               
        
        </div>

    );

}

else if(err){

    return(

    <div className="App wrapper content">  
       
       
    <Sidebar toggle={toggle} isOpen={isOpen}/>

    <div className={classNames('content container-fluid',{'is-open':isOpen})}>
    
    <NavBar toggle={toggle} isOpen={isOpen }/>
         <h1>Not Available</h1>

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
            <h3 className='text-primary' style={{textAlign:"center"}}>Diet Plan Details</h3>
            <hr/>
            <div className='m-auto w-75 jumbotron'>
            <Table striped >

                <tbody>
                    <tr>
                        <th>Owner Name</th>
                        <td>{data.owner_id.first_name+" "+data.owner_id.last_name}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{data.owner_id.email}</td>
                    </tr>
                    <tr>
                    <th>Gender</th>
                        <td>{data.owner_id.gender}</td>
                    </tr>
                    <tr>
                    <th>BMI</th>
                        <td>{data.owner_id.weight/Math.pow(data.owner_id.height/100,2)}</td>
                    </tr>
                    <tr>
                        <th>Diet Plan Purpose</th>
                        <td>{data.title}</td>
                    </tr>
                    <tr>
                        <th>Duration</th>
                    <td>{data.duration}</td>
                    </tr>

                    <tr>
                        <th>Started Date</th>
                        <td>
                            {moment(data.start_date).calendar()}
                        </td>
                    </tr>
                    <tr>
                        <th>End Date</th>
                        <td>
                            {(moment(data.start_date)).add(data.duration,'days').calendar()}
                        </td>
                    </tr>


                    <tr>
                        <th>Created By</th>
                        <td>{data.created_by.first_name+" "+data.created_by.last_name}</td>
                    </tr>
                </tbody>
            </Table>

            <div>



            </div>





            <div className="row">
                <div className="col-md-12 col-12">
                  <Link className='btn btn-primary btn-block' to={`/diet_plan/${data._id}/1`}>Show Diet Plan</Link>
                  <Link className='btn btn-info btn-block' to={`/diet_plan_performance/${data._id}`}>Check Performance</Link>
                </div>
            </div>
            </div>
            
        </div>

       </div>


               
        
        </div>

    );
  
}
