import React from 'react';
import {Form,Jumbotron,FormGroup, Button,Spinner } from 'reactstrap'
import OtpInput from 'react-otp-input';

export default function Verification(props) {
    let {opt,handleChange,handleForm,loading}=props

    
   
        return (  <div className='layout'>

        <h1 className='text-center text-dark mt-5'>Nutritionist Portal</h1>
         
                <Form onSubmit={handleForm} className='mt-5' >
               
                            <Jumbotron className=' box m-auto'  >
                            <h3 className="text-center text-dark">Verification Code</h3>
                                
                                    <FormGroup  >
                                    
                                        <p>Verification code has been sent to your email.
                                            Please type the 6 digit verifications code to reset the password</p>
                                            <div className='m-auto'>
                                            <OtpInput
                                            
                                                value={opt.opt}
                                                hasErrored={opt.invalid}
                                                onChange={handleChange}
                                                numInputs={6}
                                                separator={<span>_</span>}
                                                isInputNum={true}
                                                
                                                inputStyle='w-100'
                                            />
                                            {opt.invalid&&<h5 className='text-center text-danger'>{opt.msg}</h5>}
                                            </div>
                                    </FormGroup>
                               
                                    <Button className='m-auto' type="submit" block color="primary">{!loading?'Verfiy':<Spinner/>}</Button>
                            </Jumbotron>
          
                </Form>
                </div>

        )
    }

