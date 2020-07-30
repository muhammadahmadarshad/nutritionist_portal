import React, { useState } from 'react';
import  { Collapse, NavItem, NavLink } from 'reactstrap';

import classNames from 'classnames';
import { Link } from 'react-router-dom';

const SubMenu = props => {
  
  const [collapsed, setCollapsed] = useState(true)
  const toggleNavbar = () => setCollapsed(!collapsed)
  const { title, items } = props;
 
  return (
    <nav>
      <NavItem  onClick={toggleNavbar} className={classNames({'menu-open':!collapsed})}>
        <NavLink className='dropdown-toggle'>
        {title}
        </NavLink>
      </NavItem>
      <Collapse isOpen={!collapsed} className={classNames('items-menu',{'mb-1':!collapsed})} navbar >
        {items.map((item, index) => (
            <NavItem key={index} >
              <NavLink className='text-white' tag={Link} to={item.target}>
                {item.title}
              </NavLink>
            </NavItem>
            ))}
      </Collapse>
    </nav>
  );
}

export default SubMenu;
