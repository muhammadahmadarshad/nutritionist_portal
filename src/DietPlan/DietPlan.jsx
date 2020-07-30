import React from 'react';
import Sidebar from '../Sidebar/Sidebar'
import NavBar from '../Navbar/navbar'
import classNames from 'classnames'

import axios from 'axios'
import DietPlanTable from './DietPlanTable';
import { useParams } from 'react-router-dom';

const DietPlan = (props) => {
    const [isOpen,setOpen]=React.useState(false)
    const [err,setError]=React.useState(false)
    const [plan,setDietPlan]= React.useState()
    const [loading,setLoading]= React.useState(true)

    const {page,id}=useParams()

    


    const getDietPlan=()=>{
        setLoading(true)
        if(parseInt(page)>0 && page){
            setLoading(true)
        
            
        axios({url:`http://localhost:5000/diet_plan//nutri-diet-plan/${id}/${page}`,
            headers:{'x-auth-token':localStorage.getItem('nutri-token')},
            method:'get'
    }).then(res=>{
       console.log(res.data)
        setDietPlan(res.data)
        setLoading(false)
        setError(false)
    }).catch(err=>{
        setError(true)
        setLoading(false)
    })
}

    else{

        props.history.push(`/diet_plan/${id}/1`)
    }

    }

    React.useEffect(

        getDietPlan
    ,[page,id])

    
    let toggle= ()=>{
        setOpen(!isOpen)
     }
    return ( <div className='App wrapper content'>
    <Sidebar toggle={toggle} isOpen={isOpen}/>
    <div className={classNames('content container-fluid',{'is-open':isOpen})}>
    <NavBar toggle={toggle} isOpen={isOpen }/>
    <div className='container' >

        <div className='m-auto' >

            
            <DietPlanTable 
            match={props.match} 
            history={props.history}
            url={`/diet_plan/${id}/`}
            plan={plan} getDietPlan={getDietPlan}  loading={loading} err={err}/>
            </div> 
        </div>
        </div>
        
    </div> );
}
 
export default DietPlan;