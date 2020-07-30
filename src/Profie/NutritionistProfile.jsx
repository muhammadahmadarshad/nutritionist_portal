import React,{useState} from 'react'
 import AccountUpdate from './UpdateAccount'
import {Button} from 'reactstrap'
import AccountInfo from './AccountInfo'
import './Updateform.css'
import Education from './Education'
import Experience from './Experience'
import Speciality from './Speciality'
import Axios from 'axios'



function NutritionistProfile (props){
const {first_name,last_name,fee,phone}=props.data
const [Firstname,setFirstname]=useState({firstname:first_name})
const [Lastname,setLastname]=useState({lastname:last_name})
const [Fee,setFee]=useState({fee})
const [Phone,setPhone]=useState(phone)
const [response,setResponse]=useState({success:false,msg:""})
let {history}=props


const onClickAccount =() =>{
    setUpdate(!update)


}

const [update,setUpdate]=useState(true)



function onChangeFirstname({target}){
    setFirstname({firstname:target.value})
}
function onChangeLastname({target}){
    setLastname({lastname:target.value})
}
function onChangeFee({target}){
    setFee({fee:target.value})
}

function onSubmit(e){
    e.preventDefault()
    let data={
        fee:Fee.fee,
        first_name:Firstname.firstname,
        last_name:Lastname.lastname,
        phone:Phone
    }
    
    

    console.log(data)
    Axios({method:'PUT',url:'http://localhost:5000/nutritionist/update',
        headers:{'x-auth-token':localStorage.getItem('nutri-token')},
        data}
    
    )
    .then(res=>{


        props.history()
    })
    .catch(err=>{


        setResponse(err.response.data)
    })

}









return(
    <div>

        
<div style={{ display: "flex" }}>
            {!update?
            <Button variant="contained" color="primary" className="btn-position-times"  onClick={onClickAccount} >
             <span className='fa fa-times'></span>
             </Button>
             :
             <Button variant="contained" color="primary" className="btn-position-pencil"  onClick={onClickAccount} >
             <span className='fa fa-pencil'></span>
             </Button>
             }
        
        </div>


        {
         

         !update?
        <AccountUpdate 
        Firstname={Firstname} Lastname={Lastname}
        Fee={Fee}
        response={response}
        onChangeFirstname={onChangeFirstname} onChangeLastname={onChangeLastname}
        phone={Phone}
        onChangePhone={(e)=>{setPhone(e.target.value)}}
        onChangeFee={onChangeFee} onSubmit={onSubmit}
       /> :<AccountInfo data={props.data} />

        }
        {props.education.length>0&&<div className='mt-5'>
            <h1 className='text-center text-primary'>Education</h1>
        {props.education.map(edu=><Education history={history} education={edu}/>)}
        </div>}
            
            {props.experience.length>0&&<div className='mt-5'>
                <h1 className='text-center'>Experience</h1>

                {props.experience.map(exp=><Experience history={history} experience={exp}></Experience>)}

            </div>}
        { props.specialities.length>0&& 
        <div className='mt-5 mb-5'>
        <h1 className="text-center text-primary">

            Specilaization

        </h1>
        {props.specialities.map(sp=><Speciality history={history} specialities={sp}/>)}


        </div>}
            

                
    </div>
)










}


export default NutritionistProfile;