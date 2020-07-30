import React ,{useState,useEffect}from 'react';

import classNames from 'classnames'
import Sidebar from '../Sidebar/Sidebar';
import NavBar from '../Navbar/navbar';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import Loading from '../Loading/Loading';
import { Table, Button } from 'reactstrap';
import moment from 'moment'
import MakeDietPlan from './MakeDietPlan';

  


export default function DietPlanOrderDetails(props)  {

  const [isOpen,setOpen]=useState(false)
  const [loading,setLoading]=useState(true)
  const [err,setError]= useState(false)
  const [data,setData]=useState({})
  const [modal, setModal] = useState(false);
  const [title,setTitle]=React.useState({value:'',err:false,msg:"Required"})
  const [start_date,setStartDate]=React.useState({value:'',err:false,msg:""})
  const [duration,setDuration]=React.useState({value:'',err:false,msg:""})
  function onChangeTitle(e){
    setTitle({value:e.target.value,err:false,msg:''})
}

function onChangeStartDate(e){
    setStartDate({value:e.target.value,err:false,msg:''})
}
function onChangeDuration(e){
    setDuration({value:e.target.value,err:false,msg:''})
}


  const modaltoggle = () => setModal(!modal);
  let toggle=()=>{
      setOpen(!isOpen)
   }
   let {id} =useParams();
   let getData=()=>{
    setLoading(true)

    Axios({method:'get',url:`http://localhost:5000/diet_plan_order/order_details/${id}`, headers:{'x-auth-token':localStorage.getItem('nutri-token')}})
    .then(res=>{
  
      setData(res.data)
      setTitle({...title,value:res.data.purpose})
      setLoading(false)
      setError(false)
    })
    .catch(()=>{
      setLoading(false)
      setError(true)
    })

 }
 useEffect(getData,[id])

 function onSubmit(e){
    e.preventDefault();
    
    let data1={start_date:new Date(start_date.value),title:title.value,duration:duration.value,client_id:data.order_by._id,order_id:data._id}
    Axios({url:'http://localhost:5000/diet_plan/nutri/make_diet_plan',
        method:'post',
        data:data1,
        headers:{'x-auth-token':localStorage.getItem('nutri-token')}        
    }).then(res=>{
            getData()
            modaltoggle()
    }).catch(err=>{
        
       let {data}=err.response

        if (!data['path']){


        }
        else if(data['path'][0]==='title'){

            setTitle({...title,err:true,msg:data.message})
        }
        else if(data.path[0]==='start_date'){

            setStartDate({...start_date,err:true,msg:data.message})
        }

        else if(data.path[0]==='duration'){

            setDuration({...duration,err:true,msg:data.message})
        }


    })
}

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

            <MakeDietPlan modal={modal} onSubmit={onSubmit} toggle={modaltoggle} title={title} loading={loading} start_date={start_date} data={data} duration={duration} onChangeDuration={onChangeDuration} onChangeTitle={onChangeTitle} onChangeStartDate={onChangeStartDate}/>
            <h3 className='text-primary' style={{textAlign:"center"}}>Order Details</h3>
            <hr/>
            <div className='m-auto w-75 jumbotron'>
            <Table striped >

                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{data.order_by.first_name+" "+data.order_by.last_name}</td>
                    </tr>
                    <tr>
                        <th>Phone No.</th>
                        <td>{data.phone}</td>
                    </tr>
                    <tr>
                    <th>Gender</th>
                        <td>{data.order_by.gender}</td>
                    </tr>
                    <tr>
                    <th>BMI</th>
                        <td>{data.order_by.weight/Math.pow(data.order_by.height/100,2)}</td>
                    </tr>
                    <tr>
                        <th>Diet Plan Purpose</th>
                        <td>{data.purpose}</td>
                    </tr>
                    <tr>
                        <th>Diet Plan Description</th>
                        <td>{data.description}</td>
                    </tr>
                    <tr>
                        <th>Status</th>
                    <td>{data.status}</td>
                    </tr>

                    <tr>
                        <th>Ordered Date</th>
                        <td>
                            {moment(data.createdAt).calendar()}
                        </td>
                    </tr>
                </tbody>
            </Table>
            <div className="row">
                <div className="col-md-12 col-12">
                   { data.status==='Pending'?<Button onClick={modaltoggle} block color='success'>Make Diet Plan</Button>
                    :<Link className='btn btn-primary btn-block'>Show Diet Plan</Link>
                }
                </div>
            </div>
            </div>
            
        </div>

       </div>


               
        
        </div>

    );
  
}
