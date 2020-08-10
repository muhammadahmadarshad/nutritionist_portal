import React from 'react';
import Sidebar from '../Sidebar/Sidebar'
import NavBar from '../Navbar/navbar'
import classNames from 'classnames'
import moment from 'moment'
import {Form,Input,FormFeedback, Spinner} from 'reactstrap'
import Axios from 'axios';
  


export default function AddExperience(props)  {

  const [isOpen,setOpen]=React.useState(false)

  const [formData,setFormData]= React.useState({designation:"",from:'',to:"",description:"",company:''})
  const [touched,settouched]= React.useState({designation:false,from:false,to:false,description:false,company:false})
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
    Axios({method:'post',data:{...formData,to,from},headers:{'x-auth-token':localStorage.getItem('nutri-token')},url:'http://localhost:5000/nutritionist/addExperience'})
    .then(res=>{

      setResponse(res.data)
    setLoading(false)
    })
  .catch(err=>{

   setResponse(err.response.data?err.response.data:{success:false,msg:"Network Error"})
    setLoading(false)
  })
  }

function   validate({designation, to, description, from,company}) {
    const errors = {
      designation: "",
      to: "",
      from: "",
      description: "",
      company:''
    };

    let m=moment()
    m.hours(0)
    m.minutes(0)
    m.seconds(0)
    let to_date=moment(to) 
    let from_date= moment(from)
    
    if (touched.designation && designation.length < 3)
    {
      errors.designation = "designation should be >= 3 characters";
        
    }
    if (touched.description && description.length < 3)
      errors.description = "description should be >= 3 characters";

    if (touched.to && to==='')
      errors.to = "to is required.";
    else if (touched.to && to_date.isAfter(m))
    { errors.to = `to date should be less than ${m.toDate()}`;
    }
    if (touched.from && from==='')
      errors.from = "from is required.";
    else if (touched.from && (to_date.isBefore(from_date) || to_date.isSame(from_date)))
     { 
         
        errors.from = `from date should be less than ${to_date.toDate()}`;
    }
    else if(touched.from &&(from_date.isAfter(m)|| from_date.isSame(m)))
    errors.from = `from date should be less than ${m.toDate()}`;


    if (touched.company && company.length < 3)
      errors.company = "company should be >= 3 characters";

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
            <h1 className='text-center'>Add Experience</h1>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-12">
                            designation:<Input name='designation' value={formData.designation} onChange={onChange} description="text" className="form-control" placeholder="designation" required
                            
                                valid={errors.designation===''}
                                invalid={errors.designation!==''}
                                onBlur={handleBlur}
                            
                            />
                            <FormFeedback>{errors.designation}</FormFeedback>
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
                            description:<Input description="text" name='description' value={formData.description} onChange={onChange} className="form-control" placeholder="description" required 
                                                                                                valid={errors.description===''}
                                                                                                invalid={errors.description!==''}
                                                                                                onBlur={handleBlur}
                            
                            /><FormFeedback>{errors.description}</FormFeedback>
                        </div>
                        <div className="col-sm-6">
                            company:<Input  description="text" name='company'
                                         valid={errors.company===''}
                                        invalid={errors.company!==''}
                                        onBlur={handleBlur}
                            value={formData.company} onChange={onChange}
                            className="form-control" placeholder="company"
                            required
                            />

                            <FormFeedback>{errors.company}</FormFeedback>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                <div className='col-sm-12'><button type="submit" className="btn btn-success btn-md btn-block">{loading?<Spinner/>:'Add Experience'}</button> 
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
