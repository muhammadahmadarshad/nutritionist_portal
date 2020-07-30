import React from 'react'
import {Table} from 'reactstrap';

const AccountInfo=(props)=>{
    const {first_name,last_name,email,phone,fee,balance}=props.data
    
    return(
        <div className='m-6' style={{textAlign:'center'}}>
            <h1>Account</h1>
            <Table striped bordered className='m-auto' style={{width:"50%"}}>
                <tbody>
                    <tr>
                        <th>First Name</th>
                        <td>{first_name}</td>
                    </tr>
                    <tr>
                        <th>Last Name</th>
                        <td>{last_name}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{email}</td>
                    </tr>

                    <tr>
                        <th>Phone</th>
                        <td>{phone}</td>
                    </tr>
                    <tr>
                        <th>Diet Plan Fee</th>
                        <td>{fee} $</td>
                    </tr>

                    <tr>
                        <th>Earning</th>
                        <td>{balance} $</td>
                    </tr>

                </tbody>
            </Table>
        </div>

        
        
    )

}

export default AccountInfo;