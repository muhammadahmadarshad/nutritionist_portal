import React from 'react'
import './Updateform.css'
import {Form, Input} from 'reactstrap'

function UpdateAccount(props){
    const {Firstname,Lastname,Fee,
    onChangeFirstname,onChangeLastname,
    onChangeFee,onSubmit,phone,onChangePhone}=props
        console.log(Fee)

    return(
        <div className="update-form">
            <h1>Update Account</h1>
            <Form onSubmit={onSubmit}>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6">
                            First Name:<Input value={Firstname.firstname} onChange={onChangeFirstname} type="text" className="form-control" placeholder="First Name" required />
                        </div>
                        <div className="col-sm-6">
                            Last Name:<Input value={Lastname.lastname} onChange={onChangeLastname} type="text" className="form-control" placeholder="Last Name" required />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-12">
                           Fee:<Input value={Fee.fee} onChange={onChangeFee} type="number" className="form-control" placeholder="Enter Fee Amount" required  />
                        </div>

                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-12">
                           Phone No.:<Input value={phone} onChange={onChangePhone} type="text" className="form-control" placeholder="Enter Phone No." required />
                        </div>

                    </div>
                </div>
                <div className="row mt-3">
                  <div className='col-sm-12'><button type="submit" className="btn btn-warning btn-md btn-block">Update</button> 
                </div>
                </div>

            </Form>

        </div>
    )






}


export default UpdateAccount;