import React from 'react';
import Sidebar from '../Sidebar/Sidebar'
import NavBar from '../Navbar/navbar'
import classNames from 'classnames'
import moment from 'moment'
import {Form,Input,FormFeedback} from 'reactstrap'
import Axios from 'axios';
import { specialities } from './specialities';
  


export default function AddSpecialization(props)  {

  const [isOpen,setOpen]=React.useState(false)

  const [formData,setFormData]= React.useState({category:"",description:""})
  const [touched,settouched]= React.useState({category:false,description:false,})
  const [response,setResponse]=React.useState({success:false,msg:''})
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

    Axios({method:'post',data:formData,headers:{'x-auth-token':localStorage.getItem('nutri-token')},url:'http://localhost:5000/nutritionist/addSpeciality'})
    .then(res=>{

        setResponse(res.data)
    })
    .catch(err=>{

        setResponse(err.response.data)

    })
  }

function   validate({category, to, description, from,company}) {
    const errors = {
      category: "",
      description: "",
    
    };

    let m=moment()
    m.hours(0)
    m.minutes(0)
    m.seconds(0)

    
    if (touched.category && category.length < 3)
    {
      errors.category = "category should be >= 3 characters";
        
    }
    if (touched.description && description.length < 3)
      errors.description = "description should be >= 3 characters";

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
            <h1 className='text-center'>Add Specialization</h1>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-12">
                            category:<Input name='category' value={formData.category} onChange={onChange} type="select" className="form-control" placeholder="category" required
                                valid={errors.category===''}
                                invalid={errors.category!==''}
                                onBlur={handleBlur}
                            >
                                <option value=''>Select Speciality</option>
                                {specialities.map((sp,index)=>
                                    <option key={index} value={sp}>{sp}</option>
                                )}

                            </Input>
                            <FormFeedback>{errors.category}</FormFeedback>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-12">
                            description:<Input type="textarea" name='description' value={formData.description} onChange={onChange} className="form-control" placeholder="description" required 
                                                                                                valid={errors.description===''}
                                                                                                invalid={errors.description!==''}
                                                                                                onBlur={handleBlur}
                            
                            /><FormFeedback>{errors.description}</FormFeedback>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                  <div className='col-sm-12'><button description="submit" className="btn btn-success btn-md btn-block">Add</button> 
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
