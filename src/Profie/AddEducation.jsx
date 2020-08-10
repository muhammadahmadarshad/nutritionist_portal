import React from 'react';
import Sidebar from '../Sidebar/Sidebar'
import NavBar from '../Navbar/navbar'
import classNames from 'classnames'
import moment from 'moment'
import {Form,Input,FormFeedback, Spinner} from 'reactstrap'
import Axios from 'axios';
  


export default function AddEducation(props)  {

  const [isOpen,setOpen]=React.useState(false)

  const [formData,setFormData]= React.useState({title:"",from:'',to:"",type:"",institute:''})
  const [touched,settouched]= React.useState({title:false,from:false,to:false,type:false,institute:false})
  const [response,setResponse]=React.useState({success:false,msg:''})
  const [loading,setLoading]=React.useState(false) 
  
  const onChange=(e)=>{

    let {name,value}= e.target

    setFormData({...formData,[name]:value})

   }
 

  let toggle=()=>{
      setOpen(!isOpen)
   }


   let handleBlur =  evt => {
    settouched({ ...touched, [evt.target.name]: true }
    );
  };


  function onSubmit(e){

    e.preventDefault()
    let to= moment(formData.to)
    to.minutes(0).hours(0).seconds(0)
    let from =moment(formData.from)
    from.minutes(0).hours(0).seconds(0)
    setLoading(true)
    Axios({method:'post',data:{...formData,from,to},headers:{'x-auth-token':localStorage.getItem('nutri-token')},url:'http://localhost:5000/nutritionist/addEducation'})
    .then(res=>{

        setResponse(res.data)
      setLoading(false)
      })
    .catch(err=>{

     setResponse(err.response.data?err.response.data:{success:false,msg:"Network Error"})
      setLoading(false)
    })
  }

function   validate({title, to, type, from,institute}) {
    const errors = {
      title: "",
      to: "",
      from: "",
      type: "",
      institute:''
    };

    let m=moment()
    m.hours(0)
    m.minutes(0)
    m.seconds(0)
    let to_date=moment(to) 
    let from_date= moment(from)
    
    if (touched.title && title.length < 3)
    {
      errors.title = "Title should be >= 3 characters";
        
    }
    if (touched.type && type.length < 3)
      errors.type = "Type should be >= 3 characters";

    if (touched.to && to==='')
      errors.to = "to is required.";
    else if (touched.to && to_date.isAfter(m))
    { errors.to = `to date should be less than ${m.toDate()}`;
    }
    if (touched.from && from==='')
      errors.from = "from is required.";
    else if (touched.from && ( to_date.isBefore(from_date) || to_date.isSame(from_date)))
     { 
         
        errors.from = `from date should be less than ${to_date.toDate()}`;
    }
    else if(touched.from &&(from_date.isAfter(m)|| from_date.isSame(m)))
    errors.from = `from date should be less than ${m.toDate()}`;


    if (touched.institute && institute.length < 3)
      errors.institute = "Institute should be >= 3 characters";

    return errors;
  }

    let errors=validate(formData)
   
  
    return (
        <div className="App wrapper content">  
       
       
       <Sidebar toggle={toggle} isOpen={isOpen}/>

       <div className={classNames('content container-fluid',{'is-open':isOpen})}>
       <NavBar toggle={toggle} isOpen={isOpen }/>
       <div className='container text-center'>
          
       <div className="update-form">
      
            <Form onSubmit={onSubmit} >
            <h1 className='text-center'>Add Education</h1>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-12">
                            Title:<Input name='title' value={formData.title} onChange={onChange} type="text" className="form-control" placeholder="Title" required
                            
                                valid={errors.title===''}
                                invalid={errors.title!==''}
                                onBlur={handleBlur}
                            
                            />
                            <FormFeedback>{errors.title}</FormFeedback>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6">
                            From:<Input name='from' value={formData.from} onChange={onChange}  type='date' className="form-control" placeholder="From"
                                                                valid={errors.from===''}
                                                                invalid={errors.from!==''}
                                                                onBlur={handleBlur}
                            required />
                            <FormFeedback>{errors.from}</FormFeedback>
                        </div>
                        <div className="col-sm-6">
                            To:<Input  type="date" value={formData.to} onChange={onChange} name='to' className="form-control" placeholder="To" required
                                                                                                valid={errors.to===''}
                                                                                                invalid={errors.to!==''}
                                                                                                onBlur={handleBlur}
                            
                            />
                            <FormFeedback>{errors.to}</FormFeedback>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6">
                            Type:<Input type="text" name='type' value={formData.type} onChange={onChange} className="form-control" placeholder="Type" required 
                                                                                                valid={errors.type===''}
                                                                                                invalid={errors.type!==''}
                                                                                                onBlur={handleBlur}
                            
                            /><FormFeedback>{errors.type}</FormFeedback>
                        </div>
                        <div className="col-sm-6">
                            Institute:<Input  type="text" name='institute'
                                         valid={errors.institute===''}
                                        invalid={errors.institute!==''}
                                        onBlur={handleBlur}
                            value={formData.institute} onChange={onChange}
                            className="form-control" placeholder="Institute"
                            required
                            />

                            <FormFeedback>{errors.institute}</FormFeedback>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                  <div className='col-sm-12'><button type="submit" className="btn btn-success btn-md btn-block">{loading?<Spinner/>:'Add Education'}</button> 
                </div>
                </div>

                <div>
                <span className={response.success?'text-success text-center':'text-danger text-center'}>{response.msg}</span>

                </div>

            </Form>

        </div>
            

       </div>


       </div>    
        
        </div>

    );
  
}
