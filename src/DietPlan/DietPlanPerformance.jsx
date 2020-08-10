import React,{useState,useEffect} from 'react'
import Loading from '../Loading/Loading'
import Axios from 'axios'
import classNames from 'classnames'
import Sidebar from '../Sidebar/Sidebar';
import NavBar from '../Navbar/navbar';
import {useParams} from 'react-router-dom'
import {Bar,BarChart,XAxis,YAxis,Tooltip,Legend} from 'recharts'
const Performance = () => {
    const [isOpen,setOpen]=useState(false)
    const [loading,setLoading]=useState(true)
    const [data,setData]=useState({})
    const [err,setErr] =useState(false)
    let toggle=()=>{
        setOpen(!isOpen)
     }
  
     let {id}=useParams()

     useEffect(()=>{
        setLoading(true)
        Axios({method:'get',url:`http://localhost:5000/nutritionist/diet_plan_report/${id}`
        ,headers:{'x-auth-token':localStorage.getItem('nutri-token')}
    })
    .then(res=>{
       
        setData(res.data)
        setLoading(false)
        setErr(false)      
    
    })
    .catch(()=>{


        setErr(true)
        setLoading(false)
    })
     },[id])

     if(loading){
         
        return(
            <div className="App wrapper content">  
         
         
            <Sidebar toggle={toggle} isOpen={isOpen}/>
     
            <div className={classNames('content container-fluid',{'is-open':isOpen})}>
            
            <NavBar toggle={toggle} isOpen={isOpen }/>
                <Loading/>
            </div>
            
            
            </div>
        )
     }

    else if(err){
         
        return(
            <div className="App wrapper content">  
         
         
            <Sidebar toggle={toggle} isOpen={isOpen}/>
     
            <div className={classNames('content container-fluid',{'is-open':isOpen})}>
            
            <NavBar toggle={toggle} isOpen={isOpen }/>
                <h1 className="text-center text-danger">Diet Plan Not Found</h1>
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

          <h2 className='text-center text-primary mt-2 bg-dark p-1'>Today's Report</h2>
                    <div style={{overflowX:"auto"}}>
                    <BarChart className=' m-auto' width={1000} height={300} data={data.daily_report}  
                        margin={{
                                top: 5, right: 20, left: 20, bottom: 5,
                            }}>
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={"calories"} fill="#ada611" /> 
                        <Bar dataKey={"sugar"} fill="#084a1a" />   
                        <Bar dataKey={"protein"} fill="#2c39c9" />   
                        <Bar dataKey={"calcium"} fill="#220038" /> 
                        <Bar dataKey={"carbohydrate"} fill="#5e3805" />  
                        <Bar dataKey={"fiber"} fill="#ae4705" />   
                    </BarChart>

                    </div>
                    <h2 className='text-center text-primary bg-dark p-1'>Weekly Report</h2>
                    <div style={{overflowX:"auto"}}>
                    <BarChart className='m-auto' width={1200} height={300} data={data.week_report}  
                        margin={{
                                top: 5, right: 20, left: 20, bottom: 5,
                            }}>
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={"calories"} fill="#ada611" /> 
                        <Bar dataKey={"sugar"} fill="#084a1a" />   
                        <Bar dataKey={"protein"} fill="#2c39c9" />   
                        <Bar dataKey={"calcium"} fill="#220038" /> 
                        <Bar dataKey={"carbohydrate"} fill="#5e3805" />             
                    </BarChart>
                


                    </div>

                    <h2 className='text-center text-primary bg-dark mt-2 p-1'>Complete Report</h2>
                    <div style={{overflowX:"auto"}}>
                    <BarChart className='m-auto' width={1200} height={300} data={data.plan_report}  
                        margin={{
                                top: 5, right: 20, left: 20, bottom: 5,
                            }}>
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={"calories"} fill="#ada611" /> 
                        <Bar dataKey={"sugar"} fill="#084a1a" />   
                        <Bar dataKey={"protein"} fill="#2c39c9" />   
                        <Bar dataKey={"calcium"} fill="#220038" /> 
                        <Bar dataKey={"carbohydrate"} fill="#5e3805" />             
                    </BarChart>
                


                    </div>
                </div>
          </div>
          
          
          </div>
          
          )
}
 
export default Performance;