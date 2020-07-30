import React, { Component } from 'react';
import './Sidebar.css'
import {Nav,NavItem,NavLink} from 'reactstrap';
import classNames from 'classnames'
import SubMenu from './Submenu'
export default class Sidebar extends Component {
  render() {
    return (
    
      <div className={classNames('sidebar',{'is-open':this.props.isOpen}
      )} >
      <div className='sidebar-header' >
        <span color="info" onClick={this.props.toggle} style={{color: '#fff'}}>&times;</span>
        <h3>Nutritionist Console</h3>
      </div>
      <div className='side-menu'>
        <Nav vertical className="list-unstyled pb-3">
          <SubMenu title="Profile"  items={submenus[0]}/>
          <SubMenu title="Food"  items={submenus[1]}/>
          <SubMenu title="Diet Plans"  items={submenus[2]}/>
        </Nav>        
      </div>
    </div>
      
    );
  }
}


const submenus = [
  [
    {
      title: "My Account",
      target: "/account"
    },
    {
      title: "Add Experience",
      target: "/add_experience",        
    },
    {
      title: "Add Education",
      target: "/add_education/",      
    },
    {
      title:'Add Speciality',
      target:'/add_speciality'
    }

  ],
  [
    {
      title: <span> Search Food</span>,
      target: "/search_food",        
    },
    {
      title:<span> Favorite Foods</span>,
      target:"/my_foods/1"
    }
  ],[
    {title:'Orders',
    target:'/orders'
    },
    {title:"Active Diet Plans",
    target:"/active_diet_plans/1"
    },



  ]
]