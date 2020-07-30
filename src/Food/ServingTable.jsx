import React from 'react';
import {Spinner, Table,Button } from 'reactstrap';
import './ServingTable.css'
import axios from 'axios'
import {useAuth} from '../auth'

const ServingTable = (props) => {

const {state} =useAuth()
const {saving,setSaving}= props
let {setVisible,id,getFood}=props
let {saved}=props.foodData
 let  { 
    calcium,
    calories,
    carbohydrate,
    cholesterol,
    fat,
    fiber,
    iron,
    metric_serving_amount,
    metric_serving_unit,
    monounsaturated_fat,
    number_of_units,
    polyunsaturated_fat,
    potassium,
    protein,
    saturated_fat,
    serving_description,
    sodium,
    sugar,
    vitamin_a,
    vitamin_c,
   }=props.serving

    function saveAndRemoveFood(){
        const food={...props.foodData,serving:props.serving}
         delete  food.serving.serving_url
        if(!saved){
        setSaving(true)
        axios({

            url:'http://localhost:5000/food/add_to_favourite',
            method:'post',
            data:food,
            headers:{'x-auth-token':state.token}
        }).then(res=>{

            getFood(id)
            setSaving(false)
        })

        .catch(err=>{
            console.log(err.response)
            setVisible(true,err.response.data.msg,'danger')
        })

    }

    else{

        setSaving(true)
        axios({

            url:`http://localhost:5000/food/delete_from_favourite`,
            method:'delete',
            data:food,
            headers:{'x-auth-token':localStorage.getItem('nutri-token')}
        }).then(res=>{
            console.log(res.data)
            getFood(id)
            setSaving(false)
        })

        .catch(err=>{
            console.log(err.response)
            setVisible(true,err.response.data.msg,'danger')
        })


    }
    }


    return ( 
    <div width='50%'>

    <h3 className='text-center'>{props.foodData.food_name}</h3>


        <Table size='sm'  dark striped>


            <tbody className='p-2' >

            <tr>
                    <th>Serving</th>
                    <td>{metric_serving_amount&&metric_serving_unit?metric_serving_amount +" "+metric_serving_unit:"N/A"}</td>
                </tr>

                <tr>
                    <th>Serving-Description</th>
                    <td>{serving_description?serving_description:"N/A"}</td>
                </tr>

                <tr>
                    <th>Units</th>
                    <td>{number_of_units?number_of_units:"N/A"}</td>
                </tr>

            

                <tr>
                    <th>Calories</th>
                    <td>{calories?calories:"N/A"}</td>
                </tr>

                <tr>
                    <th>Total Fats</th>
                    <td>{fat?fat+" g":"N/A"}</td>
                </tr>
                <tr>
                    <td>monounsaturated_fat</td>
                    <td>{monounsaturated_fat?monounsaturated_fat+" g":"N/A"}</td>
                </tr>
                <tr>
                    <td>Saturated Fat</td>
                    <td>{saturated_fat?saturated_fat+" g":"N/A"}</td>
                </tr>
                <tr>
                    <td>Polyunsaturated Fat</td>
                    <td>{polyunsaturated_fat?polyunsaturated_fat+" g":"N/A"}</td>
                </tr>

                <tr>
                    <th>Carbohydrate</th>
                    <td>{carbohydrate?carbohydrate+" g":"N/A"}</td>
                </tr>

                <tr>
                    <th>Cholesterol</th>
                    <td>{cholesterol?cholesterol+" mg":"N/A"}</td>
                </tr>

                <tr>
                    <th>Fiber</th>
                    <td>{fiber?fiber+" g":"N/A"}</td>
                </tr>
                

                <tr>
                    <th>Protein</th>
                    <td>{protein?protein+" g":"N/A"}</td>
                </tr>

                <tr>
                    <th>Potassium</th>
                    <td>{potassium?potassium+" mg":"N/A"}</td>
                </tr>
                <tr>
                    <td>Sodium</td>
                    <td>{sodium?sodium:"N/A"}</td>
                </tr>   
                <tr>
                    <th>Iron</th>
                    <td>{iron?iron+" mg":"N/A"}</td>
                </tr>

                <tr>
                    <td>Calcium</td>
                    <td>{calcium?calcium+" mg":"N/A"}</td>
                </tr>

                <tr>
                    <td>Sugar</td>
                    <td>{sugar?sugar+" g":"N/A"}</td>
                </tr>

                <tr>
                    <th>Vitamin C</th>
                    <td>{vitamin_c?vitamin_c+" mg":"N/A"}</td>
                </tr>

                <tr>
                    <th>Vitamin A</th>
                    <td>{vitamin_a?vitamin_a+" IU":"N/A"}</td>
                </tr>

                <tr>
                    <td>
                        </td>
                    <td>

                    </td>
                </tr>
            
                

            </tbody>

            

        </Table>

        <div className='text-center'><Button onClick={saveAndRemoveFood} size='lg' color='success'> {!saving?<i className='fa fa-check-square-o fa-lg'></i>:<Spinner/>}   
                    
                    {saved?'Added to Favourite':saving?'Saving...':'Add to Favourites'}</Button></div>

        

    </div> );
}
 

export default ServingTable;

