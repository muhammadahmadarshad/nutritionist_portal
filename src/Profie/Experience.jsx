import React,{useState} from 'react'
import ExperienceUpdate from './ExperienceUpdate'
import {Button} from 'reactstrap'
import moment from 'moment'
import ExperienceInfo from './ExperienceInfo'
import Axios from 'axios'
const Experience = (props) => {
    const {_id,designation,from,to,description,company}=props.experience

    let to_date=moment(to)
    let from_date=moment(from)
  
    const [Designation,setDesignation]=useState({designation:designation})
    const [Experience_From,setExperience_From]=useState({experience_from:from_date.format('YYYY-MM-DD')})
    const [Experience_To,setExperience_To]=useState({experience_to:to_date.format('YYYY-MM-DD')})
    const [Description,setDescription]=useState({description:description})
    const [Company,setCompany]=useState({company:company})
    const [touched,settouched]= React.useState({designation:false,from:false,to:false,description:false,company:false})
    const [response,setResponse]=React.useState({success:false,msg:''})

    const [updateExperience,setUpdateExperience]=useState(true)

    
 

    function   validate(designation, to, description, from,company) {
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
        else if (touched.from && ( to_date.isBefore(from_date) || to_date.isSame(from_date)))
         { 
             
            errors.from = `from date should be less than ${to_date.toDate()}`;
        }
        else if(touched.from &&(from_date.isAfter(m)|| from_date.isSame(m)))
        errors.from = `from date should be less than ${m.toDate()}`;
    
    
        if (touched.company && company.length < 3)
          errors.company = "company should be >= 3 characters";
    
        return errors;
      }

    const onClickExperience =() =>{
        setUpdateExperience(!updateExperience)
    }

    function onChangeDesignation({target}){
        setDesignation({designation:target.value})
    }
    function onChangeExperience_From({target}){
        setExperience_From({experience_from:target.value})
    }
    function onChangeExperienced_To({target}){
        setExperience_To({experience_to:target.value})
    }
    function onChangeDescription({target}){
        setDescription({description:target.value})
    }
    function onChangeCompany({target}){
        setCompany({company:target.value})
    }

    let handleBlur =  evt => {
        settouched({ ...touched, [evt.target.name]: true }
        );
      };
    
function onSubmit(e){
    
    e.preventDefault()
    let to= moment(Experience_To.experience_to)
    to.minutes(0).hours(0).seconds(0)
    let from =moment(Experience_From.experience_from)
    from.minutes(0).hours(0).seconds(0)
    let data={designation:Designation.designation,from,to,description:Description.description,company:Company.company}
  
    to.minutes(0).hours(0).seconds(0)
    Axios({method:'PATCH',url:`http://localhost:5000/nutritionist/updateExperience/${_id}`,data,headers:{'x-auth-token':localStorage.getItem('nutri-token'),

    
}}).then(()=>{

    props.history()

}).catch(err=>{


    setResponse(err.response.data)
})
}

let errors=validate(Designation.designation, Experience_To.experience_to,Description.description, Experience_From.experience_from,Company.company)
    return ( 
    <div>

        <div style={{ display: "flex" }}>
            {!updateExperience?
            <Button variant="contained" color="primary" className="btn-position-times"  onClick={onClickExperience} >
             <span className='fa fa-times'></span>
             </Button>
             :
             <Button variant="contained" color="primary" className="btn-position-pencil"  onClick={onClickExperience} >
             <span className='fa fa-pencil'></span>
             </Button>
             }
        </div>
        {!updateExperience?
        <ExperienceUpdate 
        Designation={Designation} Experience_From={Experience_From}
        Experience_To={Experience_To} Description={Description}
        handleBlur={handleBlur}
        Company={Company} 
        errors={errors}
        onChangeDesignation={onChangeDesignation} onChangeExperience_From={onChangeExperience_From}
        onChangeExperienced_To={onChangeExperienced_To} onChangeDescription={onChangeDescription}
        onChangeCompany={onChangeCompany} onSubmit={onSubmit}
        response={response}
       /> :
         <ExperienceInfo history={props.history}   experience={props.experience}  /> 
        }




    </div> );
}
 
export default Experience;