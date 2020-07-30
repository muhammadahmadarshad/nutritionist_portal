import React ,{useState,useEffect}from 'react';

import classNames from 'classnames'

import Sidebar from '../Sidebar/Sidebar';
import NavBar from '../Navbar/navbar';
import Loading from '../Loading/Loading';
import Axios from 'axios';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment'

  


export default function Query(props)  {

  const [isOpen,setOpen]=useState(false)
  const [loading,setLoading]=useState(true)
  const [data,setData]=useState([])
  const [err,setError]=useState(false) 
  let toggle=()=>{
      setOpen(!isOpen)
   }


   useEffect(()=>{
        setLoading(true)
        Axios({method:'get',url:'http://localhost:5000/query/get_all_conversation',headers:{'x-auth-token':localStorage.getItem('nutri-token')}})
        .then(res=>{
            setData(res.data)
            setLoading(false)
           
            setError(false)
        })
        .catch(()=>{
            setError(true)
            setLoading(false)


        })

   },[])

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


}  
    return (
        <div className="App wrapper content">  
       
       
       <Sidebar toggle={toggle} isOpen={isOpen}/>

       <div className={classNames('content container-fluid',{'is-open':isOpen})}>
       
       <NavBar toggle={toggle} isOpen={isOpen }/>
       <div className='container'>

            <h1 className='text-center'>Conversations</h1>


        <Table striped>

            <thead className='bg-primary text-white'>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Updated At</th>
                    <th>Queries</th>
                </tr>
            </thead>


            <tbody>
                {data.map(item=>{
                    let {_id,client}=item
                    
                    return(
                        <tr key={_id}>
                            <td>{client.first_name}</td>
                            <td>{client.last_name}</td>
                             <td>{client.email}</td>
                            <td>{moment(item.updatedAt).calendar()}</td>
                             <td><Link className='btn btn-success' to={`/conversation/${_id}`}>Show</Link></td>
                        </tr>

                    )
                })}
                
            </tbody>
        </Table>



       </div>


       </div>
        
        </div>

    );
  
}
