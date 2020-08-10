import React from 'react';
import {Form,FormGroup,Button,Input,Label, FormFeedback, Spinner} from 'reactstrap'

function ResetPassword(props){
    let {changeConfirmPassword,changePassword,password,confirmpassword,handleForm,loading}=props
    return(      <div className='layout'>

    <h1 className='text-center text-dark mt-5'>Nutritionist Portal</h1>
        <Form onSubmit={handleForm} className='mt-5'>
     
                <div className='jumbotron w-50 m-auto box' >
                    <h3 className="text-center text-dark">Reset Password</h3>
                    
                        <FormGroup >
                            <Label>New Password:</Label>
                            <Input type="password" placeholder='New Password' required value={password.password} invalid={password.invalid} name="password"  onChange={changePassword}  />
                            <FormFeedback>{password.msg}</FormFeedback>
                        </FormGroup>
                        <FormGroup >
                            <Label>Confirm Password:</Label>
                            <Input type="password" placeholder='Confirm Password' required value={confirmpassword.confirmpassword} invalid={confirmpassword.invalid}  onChange={changeConfirmPassword}  />
                            <FormFeedback>{confirmpassword.msg}</FormFeedback>
                        </FormGroup>
                   
                    <Button type="submit" className='m-auto' block color="primary">{!loading?'Change Password':<Spinner/>}</Button>
                </div>
       
    </Form>
    </div>
    )
}

export default ResetPassword