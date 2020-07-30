import React from 'react'
import './Updateform.css'
import {Form, Input} from 'reactstrap'
import { specialities } from './specialities'

function UpdateSpecialities(props){
    const {Category,Specialities_Description,
        onChangeCategory,onChangeSpecialities_Description,onSubmit,response}=props
    

    return(
        <div className="update-form">
            <h1>Update Specialities</h1>
            <Form onSubmit={onSubmit}>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-12">
                            Category:<Input required  value={Category.category} onChange={onChangeCategory} type="select" className="form-control" placeholder="Category" >
            {specialities.map((item,index)=><option key={index} value={item}>{item}</option>)}
                                
                                </Input>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-12">
                        Description:<Input required value={Specialities_Description.specialities_description} onChange={onChangeSpecialities_Description} type="textarea" className="form-control" placeholder="Description..." />
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                  <div className='col-sm-12'><button type="submit" className="btn btn-warning btn-md btn-block">Update</button> 
                </div>

                <div>
                <span className={response.success?'text-center text-success':'text-center text-danger'}>{response.msg}</span>
                </div>
                </div>

            </Form>

        </div>
    )






}


export default UpdateSpecialities;