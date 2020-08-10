import React,{useState} from 'react'
import SpecialitiesUpdate from './SpecialitiesUpdate'
import SpecialityInfo from './SpecialityInfo'
import {Button} from 'reactstrap'
import Axios from 'axios'
const Speciality = (props) => {
    const {category,description,_id}=props.specialities
    const [updateSpeciality,setUpdateSpeciality]=useState(true)
    const [response,setResponse]=useState({success:false,msg:''})
    const [Category, setCategory]=useState({category:category})
    const [Specialities_Description,setSpecialities_Description ]=useState({specialities_description:description})

    function onChangeCategory({target}){
        setCategory({category:target.value})
    }

    function onChangeSpecialities_Description({target}){
        setSpecialities_Description({specialities_description:target.value})
    }
    const onClickSpecialities =() =>{
        setUpdateSpeciality(!updateSpeciality)
    }


    function onSubmit(e){

        e.preventDefault();
        Axios({method:'PATCH',url:`http://localhost:5000/nutritionist/updateSpeciality/${_id}`,
            data:{category:Category.category,description:Specialities_Description.specialities_description}
            ,headers:{'x-auth-token':localStorage.getItem('nutri-token')}})
        .then(res=>{

            setResponse(res.data)
            props.history()
        })
        .catch(err=>{

            setResponse(err.response.data)
        })
    }
    
    
    return ( 
    <div>
        <div style={{ display: "flex" }}>
            {!updateSpeciality?
            <Button variant="contained" color="primary" className="btn-position-times"  onClick={onClickSpecialities} >
             <span className='fa fa-times'></span>
             </Button>
             :
             <Button variant="contained" color="primary" className="btn-position-pencil"  onClick={onClickSpecialities} >
             <span className='fa fa-pencil'></span>
             </Button>
             }
        
        </div>
        {!updateSpeciality?
        <SpecialitiesUpdate 
        response={response}
        Category={Category} Specialities_Description={Specialities_Description}
        onChangeCategory={onChangeCategory} onChangeSpecialities_Description={onChangeSpecialities_Description}
        onSubmit={onSubmit}
       /> :
         <SpecialityInfo history={props.history} specialities={props.specialities} />
        }
    </div> );
}
 
export default Speciality;