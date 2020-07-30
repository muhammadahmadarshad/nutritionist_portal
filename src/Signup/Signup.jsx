import React, { Component } from 'react';
import {Form,Input,Label} from 'reactstrap'
import {countryList} from '../Countries/countries'
import './Signup.css'
export default class Signup extends Component {
  render() {
    return (
      <div className='p-2'>
        <div className='m-auto '>    
        <h1 className='text-center  text-primary mt-2 mb-2'>Health Portal Signup</h1>

            <Form >
              
              <div className='p-5 signup-box jumbotron row m-auto'>
                <div className='col-md-6'>
                <div className='mt-1'>
                  <Label htmlFor='first_name'>First Name:</Label>
                  <Input name='first_name' type='text' placeholder='First Name'/>
                </div>

                <div className='mt-1'>
                <Label  htmlFor='last_name'>Last Name:</Label>
                <Input type='text' name='last_name' placeholder='Last Name' />
                
                </div>
                <div className='mt-4'>
                  <Label htmlFor='password'>Password:</Label>
                  <Input type='password' name='password' placeholder='Password'></Input>
                
                </div>

                <div className='mt-1'>
                
                  <Label htmlFor='retypePassword'>Retype Password:</Label>
                  <Input type='password' name='retypePassword' placeholder='Retype Password'></Input>
                </div>
                <div className='mt-1'>
                  <Label htmlFor='email'>Email Address:</Label>
                  <Input type='email' placeholder='Email'  />
                
                </div>

                

                

                

                
                
                
                </div>

                <div className='col-md-6'>
                <div className='mt-1'>
                <Label  htmlFor='dob'>Date of Birth:</Label>    
                <Input type='date' name='dob' placeholder='Date of Birth'/>
                </div>

                <div className='mt-1'>
                <Label  htmlFor='country'>Country:</Label>      
                <Input type='select' name='country' placeholder='Country' >

                  {countryList.map(country=>(
                    <option>{country}</option>
                  ))}


                </Input>
                </div>
                <div className='mt-1'>
                <Label  htmlFor='address'>Address:</Label>
                <Input type='textarea' name='address' placeholder='Address'></Input>
                
                </div>

                <div className='mt-1'>
                <Label  htmlFor='weight'>Weight:</Label> 
                <Input  type='number' name='weight' placeholder='Weight'/>
                </div>

                <div className='mt-1'>
                <Label  htmlFor='height'>Height:</Label>    
                <Input type='number' name='height' placeholder='Height' /> 
                
                </div>
                </div>
                



                

                

                
                
                
                </div>

                <div className='col-md-4 col-6 m-auto'>
                <Input  className='mt-2 mb-5 btn btn-primary' type='submit'></Input> 
                
                </div>
                        
            
            
            
            </Form>
      
        </div>
      </div>
    );
  }
}
