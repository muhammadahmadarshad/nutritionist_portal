import React from 'react';
import Loading from '../Loading/Loading';
import DietPlanItem from './DietPlanItem';
import Paginate from './Paginate'
import { Table } from 'reactstrap';
const DietPlanTable = (props) => {

    let {loading,err} = props

    if(loading){

        return <Loading/>
    }

    else if(err) {

        return <h1>Not Found</h1>
    }
else {

    let {items}=props.plan.diet_plan

    if(items){
    return ( <div>
        
        <h1 className='text-center'>Diet Plan</h1>
        <Table striped className='mb-4'>

        <thead>
        <tr>
        <th scope='col'>Food Name</th>
        <th scope='col'>Meal</th>
        <th scope='col'>Taken</th>
        <th scope='col'>Time to Eat</th>
        <th scope='col'>Update</th>
        <th scope='col'>Remove</th>
        </tr>


        </thead>

        <tbody>
        {items.map((item,index)=>{
            return(

                <DietPlanItem owner_id={props.plan.diet_plan.owner_id} getDietPlan={props.getDietPlan} key={index} item={item}/>)
        })}

        </tbody>
    </Table> 

        <Paginate total_results={props.total_results} 
        history={props.history}
        match={props.match} url={props.url} />
    </div>);}

    else {

        return (
            <div>

                <h1 className='text-center'>No Foods Available</h1>
            </div>
        )
    }
}}
 
export default DietPlanTable;