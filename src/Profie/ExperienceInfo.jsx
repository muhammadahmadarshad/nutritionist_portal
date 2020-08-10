import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {Table,Button} from 'reactstrap';
import moment from 'moment'
import Axios from 'axios';

const ExperienceInfo=(props)=>{
    const {_id,designation,from,to,description,company}=props.experience
    let from_date=moment(from)
    let to_date= moment(to)
    
    function Delete(){

        Axios({method:'DELETE',url:`http://localhost:5000/nutritionist/deleteExperience/${_id}`,headers:{'x-auth-token':localStorage.getItem('nutri-token')}})
        .then(()=>{


            props.history()
        })
    }


    return(
        <div className='m-6' style={{textAlign:'center'}}>
          
            <Table striped bordered className='m-auto' style={{width:"50%"}}>
            <tbody>
                    <tr>
                        <th>Designation</th>
                        <td>{designation}</td>
                    </tr>
                    <tr>
                        <th>From</th>
                        <td>{`${from_date.date()}/${from_date.month()+1}/${from_date.year()}`}</td>
                    </tr>
                    <tr>
                        <th>To</th>
                        <td>{`${to_date.date()}/${to_date.month()+1}/${to_date.year()}`}</td>
                    </tr>
                    <tr>
                        <th>Description</th>
                        <td>{description}</td>
                    </tr>
                    <tr>
                        <th>Company</th>
                        <td>{company}</td>
                    </tr>

                    <tr>
                        <th></th>
                        <td className='text-right'><Button color='danger' onClick={Delete} >remove</Button></td>
                    </tr>
                </tbody>
            </Table>

        </div>

        
        
    )

}

export default ExperienceInfo;