import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {Table,Button} from 'reactstrap';
 import moment from 'moment'
import Axios from 'axios';
const EducationInfo=(props)=>{
    const {_id,title,from,to,type,institute}=props.education
    let from_date=moment(from)
    let to_date= moment(to)
    function Delete(){

        Axios({method:'DELETE',url:`http://localhost:5000/nutritionist/deleteEducation/${_id}`,headers:{'x-auth-token':localStorage.getItem('nutri-token')}})
        .then(()=>{


            props.history()
        })
    }

    
    return(
        <div className='m-6' style={{textAlign:'center'}}>

            <Table striped bordered className='m-auto' style={{width:"50%"}}>
                <tbody>
                    <tr>
                        <th>Title</th>
                        <td>{title}</td>
                    </tr>
                    <tr>
                        <th>From</th>
                        <td>{from_date.toString()}</td>
                    </tr>
                    <tr>
                        <th>To</th>
                        <td>{to_date.toString()}</td>
                    </tr>
                    <tr>
                        <th>Type</th>
                        <td>{type}</td>
                    </tr>
                    <tr>
                        <th>Institute</th>
                        <td>{institute}</td>
                    </tr>
                    <tr>
                        <th></th>
                        <td className='text-right'><Button onClick={Delete} color='danger' >remove</Button></td>
                    </tr>
                </tbody>
            </Table>
        </div>

        
        
    )

}

export default EducationInfo;