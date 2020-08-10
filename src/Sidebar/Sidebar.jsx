import React, {  useState ,useEffect} from 'react';
import './Sidebar.css'
import {Nav,NavItem,NavLink, Badge} from 'reactstrap';
import classNames from 'classnames'
import SubMenu from './Submenu'
import Axios from 'axios';
import {DashboardOutlined,MessageOutlined,AccountBoxOutlined,FastfoodOutlined,DescriptionOutlined} from '@material-ui/icons'
import { Link } from 'react-router-dom';
export default function Sidebar(props) {
  
    let [diet_plan_orders,setDietPlanOrders]=useState(0)
    let [queries,setQueries]=useState(0)

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
      {title:<span>Orders <Badge color='danger'>{diet_plan_orders}</Badge></span>,
        target:'/orders'
        },
        {title:"Active Diet Plans",
        target:"/active_diet_plans/1"
        },
    
    
    
      ]
    ]

    useEffect(() => {
      
      Axios({method:'get',url:"http://localhost:5000/diet_plan_order/count_pending_orders",headers:{'x-auth-token':localStorage.getItem('nutri-token')}})
      .then( (res)=>{

        setDietPlanOrders(res.data.count)
        Axios({method:'get',url:"http://localhost:5000/query/count_messages",headers:{'x-auth-token':localStorage.getItem('nutri-token')}})
        .then(res=>{
          console.log(res.data)
          setQueries(res.data.total_results)
        })
      })
      
    }, [])
    return (
    
      <div className={classNames('sidebar',{'is-open':props.isOpen}
      )} >
      <div className='sidebar-header' >
        <span color="info" onClick={props.toggle} style={{color: '#fff'}}>&times;</span>
        <h3>Nutritionist Console</h3>
      </div>

      <div className='side-menu'>
        <Nav vertical className="list-unstyled pb-3">
        <NavItem>
            <NavLink className='text-white' to="/dashboard" tag={Link}> <DashboardOutlined/> Dashboard</NavLink>
          </NavItem>

          <SubMenu title={<span><AccountBoxOutlined/> Profile </span>}  items={submenus[0]}/>
          <SubMenu title={<span><FastfoodOutlined/> Food</span>}  items={submenus[1]}/>
          <SubMenu title={<span><DescriptionOutlined/> Diet Plan </span>}  items={submenus[2]}/>

          <NavItem>
            <NavLink className='text-white' to="/queries/1" tag={Link}><MessageOutlined/> Queries  <Badge color='danger'>{queries}</Badge></NavLink>
          </NavItem>
        </Nav>        
      </div>
    </div>
      
    );
  }



