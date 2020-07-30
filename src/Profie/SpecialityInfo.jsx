import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {Table, Button} from 'reactstrap';
import Axios from 'axios';

const SpecialityInfo=(props)=>{
    const {_id,category,description}=props.specialities
  
    function Delete(){

        Axios({method:'DELETE',url:`http://localhost:5000/nutritionist//deleteSpeciality/${_id}`,headers:{'x-auth-token':localStorage.getItem('nutri-token')}})
        .then(()=>{


            props.history()
        })
    }
    
    return(
        <div className='m-6' style={{textAlign:'center'}}>
          
            <Table striped bordered className='m-auto' style={{width:"50%"}}>
                <tbody>
                    <tr>
                        <th>Category</th>
                        <td>{category}</td>
                    </tr>
                    <tr>
                        <th>Description</th>
                        <td>{description}</td>
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

export default SpecialityInfo;