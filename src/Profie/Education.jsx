import React,{useState} from 'react'
import {Button} from 'reactstrap'
import EducationUpdate from './EducationUpdate'
import EducationInfo from './EducationInfo'
import moment from 'moment'
import Axios from 'axios'
const Education = (props) => {
    const [updateEducation,setUpdateEducation]=useState(true)
    const {title,from,to,type,institute,_id}=props.education
    const [touched,settouched]= React.useState({title:false,from:false,to:false,type:false,institute:false})
    const [Title,setTitle]=useState({title:title})
    const [From,setFrom]=useState({from:new moment(from).format('YYYY-MM-DD')})
    const [To,setTo]=useState({to:new moment(to).format('YYYY-MM-DD')})
    const [Type,setType]=useState({type:type})
    const [Institute,setInstitute]=useState({institute:institute})
    const [response,setResponse]=useState({success:false,mgs:""})
    let handleBlur =  evt => {
        settouched({ ...touched, [evt.target.name]: true }
        );
      };
    function onChangeTitle({target}){
        setTitle({title:target.value})
    }
    function onChangeFrom({target}){
        setFrom({from:target.value})
    }
    
    function onChangeTo({target}){
        setTo({to:target.value})
    }
    function onChangeType({target}){
        setType({type:target.value})
    }
    function onChangeInstitute({target}){
        setInstitute({institute:target.value})
    }
    const onClickEducation =() =>{
        setUpdateEducation(!updateEducation)
    }


    function   validate(title, to, type, from,institute) {
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
           
          errors.title = "title should be >= 3 characters";
            
        }
        if (touched.type && type.length < 3)
          errors.type = "type should be >= 3 characters";
    
        if (touched.to && to==='')
          errors.to = "to is required.";
        else if (touched.to && to_date.isAfter(m))
        { errors.to = `to date should be less than ${m.toDate()}`;
        }
        if (touched.from && from==='')
          errors.from = "from is required.";
        else if (touched.from && to_date.isBefore(from_date) || to_date.isSame(from_date))
         { 
             
            errors.from = `from date should be less than ${to_date.toDate()}`;
        }
        else if(touched.from &&(from_date.isAfter(m)|| from_date.isSame(m)))
        errors.from = `from date should be less than ${m.toDate()}`;
    
    
        if (touched.institute && institute.length < 3)
          errors.institute = "institute should be >= 3 characters";
    
        return errors;
      }

    function onSubmit(e){
        console.log('hello')
        e.preventDefault()
        let to= moment(To.to)
        to.minutes(0).hours(0).seconds(0)
        let from =moment(From.from)
        from.minutes(0).hours(0).seconds(0)

        let data={title:Title.title,institute:Institute.institute,type:Type.type,to,from}



        Axios({method:'PATCH',url:`http://localhost:5000/nutritionist/updateEducation/${_id}`,data,headers:{'x-auth-token':localStorage.getItem('nutri-token')}})

        .then(()=>{

            props.history()
        })
        .catch(err=>{

            setResponse(err.response.data)
        })
    }

    let errors= validate(Title.title,To.to,Type.type,From.from,Institute.institute)

    return ( <div>
            <div style={{ display: "flex" }}>
            {!updateEducation?
            <Button variant="contained" color="primary" className="btn-position-times"  onClick={onClickEducation} >
             <span className='fa fa-times'></span>
             </Button>
             :
             <Button variant="contained" color="primary" className="btn-position-pencil"  onClick={onClickEducation} >
             <span className='fa fa-pencil'></span>
             </Button>
             }
        
        </div>
        {!updateEducation?
        <EducationUpdate 
        handleBlur={handleBlur}
        errors={errors}
        Title={Title} From={From} To={To}
        Type={Type} Institute={Institute}
        onChangeTitle={onChangeTitle} onChangeFrom={onChangeFrom} onChangeTo={onChangeTo} 
        onChangeType={onChangeType} onChangeInstitute={onChangeInstitute}
        onSubmit={onSubmit}
        response={response}
       /> :
         <EducationInfo history={props.history}  education={props.education} />
        }
    </div> );
}
 
export default Education;