import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form,Input } from 'reactstrap';

const MakeDietPlan = (props) => {
    let {title,modal,toggle,start_date,onSubmit,duration,onChangeDuration,onChangeTitle,onChangeStartDate,data}= props

    return (       
    <Modal backdrop='static' isOpen={modal} toggle={toggle}>
        <ModalHeader  toggle={toggle}><span style={{textAlign:'center'}}>Make Diet Plan For {data.order_by.first_name+""+data.order_by.last_name}</span></ModalHeader>
        <ModalBody>
        <Form onSubmit={onSubmit} >
          <div className='form-group'>
              <div className='row'>
                  <div className='col-md-12'>
                     Purpose/Title: <Input type='text' invalid={title.err} value={title.value} onChange={onChangeTitle} placeholder='Purpose of your Diet Plan'>
                         </Input>
                  {title.err&&<span className='text-danger'>{title.msg}</span>}
                  </div>
              </div>
          </div>

          <div className='form-group'>
              <div className='row'>
                  <div className='col-md-6'>
                     Start Date: <Input invalid={start_date.err} value={start_date.value} onChange={onChangeStartDate} type='date'/>
                     {start_date.err&&<span className='text-danger'>{start_date.msg}</span>}
                  </div>
                  <div className='col-md-6'>
                   Duration:   <Input type='number' value={duration.value} invalid={duration.err} onChange={onChangeDuration} placeholder='Enter Duration (Days)'/>
                   {duration.err&&<span className='text-danger'>{duration.msg}</span>}
                  </div>
              </div>
          </div>
          
          <div className='form-group'>
              <div className='row'>
                  <div className='col-md-12'>
                      <Input title='Make Diet Plan' className='btn btn-success btn-block' type='Submit'/>
                  <span></span>
                  </div>
              </div>
          </div>

      </Form>
        </ModalBody>
      </Modal> );
}
 
export default MakeDietPlan;