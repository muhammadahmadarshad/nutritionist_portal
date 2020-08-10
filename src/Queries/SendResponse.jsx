import React,{useState} from 'react'

import {Modal,ModalBody,ModalHeader, Form,Input, FormGroup, Label} from 'reactstrap'
import Axios from 'axios'

const SendResponse = (props) => {

    let {modal,toggle,msg,}=props
    let [response,setresponse]=useState(msg.response)
let [resp,setResp]=useState({success:false,msg:''})
function onchange(e){

  setresponse(e.target.value)
}


function onsubmit(e){

    e.preventDefault()

    Axios({method:'put',url:'http://localhost:5000/query/update_message',

    data:{msg_id:msg._id,response}
    ,headers:{'x-auth-token':localStorage.getItem('nutri-token')}
    })
    .then(()=>{
        toggle()
        props.getData()
        
    })

    .catch(err=>{
        setResp(err.response.data)
    })
}

    return (     
    <div>
        <Modal isOpen={modal} toggle={toggle} backdrop='static'>
    <ModalHeader toggle={toggle}>To: {props.name}</ModalHeader>
    <ModalBody>
            <Form onSubmit={onsubmit} >
                <FormGroup>
                <Label for='msg'>
                    Your Message:
                </Label>
                
                    <Input name='msg' value={response} onChange={onchange} id='msg' type='textarea'></Input>

                </FormGroup>
                <FormGroup>
                <Input className='btn-primary' type='submit' value='Send Response' ></Input>
                </FormGroup>
                <FormGroup>
                <h4 className={resp.success?"text-success":'text-danger'}>{resp.msg}</h4>
                </FormGroup>
            </Form>
            </ModalBody>

        </Modal>
      </div> );
}
 
export default SendResponse;