import React from 'react';
import {
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,Button

} from 'reactstrap';
import './navbar.css'
import {Link} from 'react-router-dom'
import {useAuth} from '../auth'
const NavBar = (props) => {
 const {dispatch,state}=useAuth()

  return (
    <div>
    <Navbar   className='p-3 rounded  mb-4' >
      <Button  color="info" onClick={props.toggle}>
      <i className='fa fa-bars'></i>
      </Button>
        <Nav className="ml-auto"  >
         
          <UncontrolledDropdown >
          
          {state.value}
          <DropdownToggle nav >
            <i className='fa fa-user fa-lg text-white'></i>
          </DropdownToggle>
          <DropdownMenu right className='mt-3 text-center'>
            <DropdownItem>
              <Link className='text-dark' to='/change_password'>Change Password</Link>
            </DropdownItem>
            <DropdownItem className='text-dark' onClick={()=>{
              
              localStorage.removeItem('nutri-token')
              
              dispatch({type:'remove_token',payload:null})}}>
              
             Signout <i className='fa fa-sign-out fa-lg'></i>
            
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
         </Nav>
      
    
    </Navbar>
    </div>
  );
}

export default NavBar;