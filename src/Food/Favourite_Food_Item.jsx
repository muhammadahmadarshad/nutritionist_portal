import React from 'react'
import {Link} from 'react-router-dom'
const FavouriteFoodItem = (props)=>{
const {foods,AddToMeal} =props
return(<tbody>
    {foods.Foods.saved_food.map((food,index)=>{

        return (
            <tr key={index}>
                <td data-label='Food Name' className='overflow-hidden'>{food.food_name}</td>

                <td data-label='Food Type'>{food.food_type}</td>
                <td data-label='Details'><Link className='btn btn-primary' to={`/food_details/${food.food_id}`}>Details</Link></td>
                <td data-label="Add to Meal"><button onClick={()=>{
                    AddToMeal(food._id)}} className='btn btn-success'>Add to Meal</button></td>


            </tr>



        )


    })
}

</tbody>
)}

export default FavouriteFoodItem