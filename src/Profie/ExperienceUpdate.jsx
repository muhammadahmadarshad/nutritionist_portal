import React from 'react'
import './Updateform.css'
import {Form, Input,FormFeedback} from 'reactstrap'

function UpdateExperienced(props){
    const {Designation,Experience_From,Experience_To,Description,Company,
        onChangeDesignation,onChangeExperience_From,onChangeExperienced_To,
        onChangeDescription,onChangeCompany,onSubmit,handleBlur,response}=props

    const {from,designation,description,to,company} =props.errors

     
    return(
        <div className="update-form">
            
            <Form onSubmit={onSubmit}>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-12">
                            Designation:<Input value={Designation.designation} 
                            
                            name={'designation'} valid={designation===''} invalid={designation!==''} onBlur={handleBlur}
                            onChange={onChangeDesignation} type="text" className="form-control" placeholder="Designation" />
                            <FormFeedback>{designation}</FormFeedback>
                        
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6">
                            From:<Input 
                            valid={from===''}
                            invalid={from!==''}
                            name='from'
                            onBlur={handleBlur}
                            value={Experience_From.experience_from} onChange={onChangeExperience_From} type="date" className="form-control" placeholder="" />
                        <FormFeedback>{from}</FormFeedback>
                        </div>
                        <div className="col-sm-6">
                             To:<Input name='to'
                            valid={to===''} invalid={to!==''} onBlur={handleBlur}
                             value={Experience_To.experience_to} onChange={onChangeExperienced_To} type="date" className="form-control" placeholder=""/>
                            <FormFeedback>{to}</FormFeedback>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">

                        <div className="col-sm-12">
                            Company:<Input value={Company.company} 
                            name='company' valid={company===''} invalid={company!==''} onBlur={handleBlur}
                            onChange={onChangeCompany} type="text" className="form-control" placeholder="Company" />
                            <FormFeedback>{company}</FormFeedback>
                        </div>
                        <div className="col-sm-12">
                            Description:<Input value={Description.description} onChange={onChangeDescription} 
                            valid={description===''} invalid={description!==''} name={'description'} onBlur={handleBlur}

                            type="textarea" className="form-control" placeholder="Descritipn" />
                            <FormFeedback>{description}</FormFeedback>
                        
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                  <div className='col-sm-12'><button type="submit" className="btn btn-warning btn-md btn-block">Update</button> 
                </div>

                <div>
                <span className={response.success?'text-success text-center':'text-danger text-center'}>{response.msg}</span>

                </div>
                </div>

            </Form>

        </div>
    )






}


export default UpdateExperienced;