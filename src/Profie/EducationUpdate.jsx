import React from 'react'
import './Updateform.css'
import {Form, Input, FormFeedback} from 'reactstrap'

function UpdateEducation(props){
    const {Title,From,To,Type,Institute,
        onChangeTitle,onChangeType,onChangeInstitute, 
        onChangeFrom,onChangeTo,onSubmit,handleBlur,response}=props
    const {type,title,institute,to,from}=props.errors
    return(
        <div className="update-form">
            <Form onSubmit={onSubmit}>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-12">
                            Title:<Input value={Title.title} name='title' onChange={onChangeTitle} type="text" className="form-control" placeholder="Title" 
                            valid={title===''} invalid={title!==''} onBlur={handleBlur}
                            />
                        <FormFeedback>{title}</FormFeedback>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6">
                            From:<Input value={From.from} onChange={onChangeFrom} type="date" className="form-control" placeholder="From"      
                              valid={from===''} invalid={from!==''} onBlur={handleBlur} name='from'
                            />
                        <FormFeedback>{from}</FormFeedback>
                        </div>
                        <div className="col-sm-6">
                            To:<Input value={To.to} onChange={onChangeTo} type="date" className="form-control" placeholder="To"                            
                            valid={to===''} invalid={to!==''} onBlur={handleBlur}
                            name='to'
                            />
                        <FormFeedback>{to}</FormFeedback>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6">
                            Type:<Input value={Type.type} onChange={onChangeType} type="text" className="form-control" placeholder="Type"                            
                            name='type' valid={type===''} invalid={type!==''} onBlur={handleBlur}
                            />
                        <FormFeedback>{type}</FormFeedback>
                        </div>
                        <div className="col-sm-6">
                            Institute:<Input value={Institute.institute} onChange={onChangeInstitute} type="text" className="form-control" placeholder="Institute"     
                                              name='institute'      
                                              valid={institute===''} invalid={institute!==''} onBlur={handleBlur}
                            />
                        <FormFeedback>{institute}</FormFeedback>
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


export default UpdateEducation;