import React ,{useState,useEffect}from 'react';

import classNames from 'classnames'

import Sidebar from '../Sidebar/Sidebar';
import NavBar from '../Navbar/navbar';
import Loading from '../Loading/Loading';
import Axios from 'axios';
import { Table } from 'reactstrap';

import moment from 'moment'

import { useParams, Link } from 'react-router-dom';
import Paginate from './paginate';

  


export default function Queries(props)  {

  const [isOpen,setOpen]=useState(false)
  const [loading,setLoading]=useState(true)
  const [data,setData]=useState([])

  const [err,setError]=useState(false) 


  let {page}=useParams()

  let toggle=()=>{
      setOpen(!isOpen)
   }

let getData=()=>{
    setLoading(true)
 
    Axios({method:'get',url:'http://localhost:5000/query/get_all_messages/'+page,headers:{'x-auth-token':localStorage.getItem('nutri-token')}})
    .then(res=>{
        console.log(res.data)
        
        setData(res.data)
        setLoading(false)
       
        setError(false)
    })
    .catch(()=>{
        setError(true)
        setLoading(false)


    })

}
   useEffect(getData,[page])

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

            <h1 className='text-center'>Query</h1>

        <Table striped>

            <thead className='bg-primary text-white'>
                <tr>
                    <th>Sender</th>
                    <th>Time</th>
                    <th></th>
                </tr>
            </thead>


            <tbody>
                {data.messages.map(item=>{
                    let {createdAt,_id,author_id}=item
                    let {first_name,last_name}=author_id
                    return(
                        <tr key={_id}>
                            
                            <td data-label='Sender'>{`${first_name} ${last_name}`}</td>
                            <td data-label='Time'>{moment(createdAt).calendar()}</td>
                            <td><Link to={`/query_detail/${_id}`} className='btn btn-primary'>
                                Show
                            </Link></td>
                            
                        </tr>

                    )
                })}
                
            </tbody>
        </Table>

                <Paginate total_results={data.total_results} history={props.history} match={props.match}>

                </Paginate>


       </div>


       </div>
        
        </div>

    );
  
}
