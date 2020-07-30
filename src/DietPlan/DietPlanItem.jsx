import React,{useState} from 'react'
import {Input, Button} from 'reactstrap'
import moment from 'moment'
import axios from 'axios'

export default function DietPlanItem(props){
const {item,getDietPlan,owner_id} = props
const Moment=moment(item.time_to_eat)
const [meal,setMeal]=useState(item.meal)
const [update,setupdate]=useState(false)

const [datetime,setDateTime]=useState(
    `${new Date(item.time_to_eat).getFullYear()}-${`${Moment.month() +
       1}`.padStart(2, 0)}-${`${Moment.date()}`.padStart(
       2,
       0
     )}T${`${Moment.hours()}`.padStart(
       2,
       0
     )}:${`${Moment.minutes()}`.padStart(2, 0)}`
     )


function onChangeMeal(e){
    setMeal(e.target.value)
}
const delete_item=async()=>{
await axios({method:'DELETE',url:`http://localhost:5000/diet_plan/delete_meal/${item._id}`,data:{client_id:owner_id,}

,headers:{'x-auth-token':localStorage.getItem('nutri-token')}})

getDietPlan()
}



const update_item=()=>{

axios({
    method:'put',
    url:`http://localhost:5000/diet_plan/update_meal`,
    data:{_id:item._id,time_to_eat:datetime,taken:item.taken,food:item.food._id,meal},
    headers:{'x-auth-token':localStorage.getItem('token')}
}).then((res)=>{
    console.log(res.data)
    setupdate(false)
    getDietPlan()
}).catch(err=>{

    console.log(err.response.data)
})

}








const onchangeDateTime=(e)=>{
    console.log(e.target.value)
    setDateTime(e.target.value)
}

return(

    <tr>
    <td data-label='Food Name'>{item.food.food_name}</td>
    <td data-label='Meal' className='p-1'>
        {update?<Input onChange={onChangeMeal}  value={meal}  type='select'>
        <option value='0'>Select Meal</option>
        <option value='Breakfast'>Breakfast</option>
        <option value='Lunch'>Lunch</option>
        <option value='Snack'>Snack</option>
        <option value='Dinner'>Dinner</option>     
        </Input>:meal}</td>
    <td data-label='Taken'>{item.taken?"Yes":"No"}</td>
    <td data-label='Time to Eat' >{update?<Input className=''  type='datetime-local'
        onChange={onchangeDateTime} value={datetime}></Input>
        :Moment.calendar()
        }</td>
    <td data-label='Update'>{update?<Button onClick={update_item} color='primary'>Update</Button>:
    <span onClick={()=>{setupdate(true)}} className='fa btn fa-pencil'></span>}
    
    </td>
    <td data-label='Delete'><Button onClick={()=>delete_item()} color='danger'><i className='fa fa-trash'></i></Button></td>
</tr>
)}
