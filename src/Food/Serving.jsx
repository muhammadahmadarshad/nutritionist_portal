import React from 'react';
import ServingTable from './ServingTable';

const Serving = (props) => {
    let {food,setVisible,id,getFood}=props
    const  {
    brand_name,
    food_id,
    food_name,
    food_type,
    saved
    }=food 
    
    const foodData={

        brand_name,
        food_id,
        food_name,
        food_type,
        saved        
    }




    return (
 
    <div className='row'>
        {
            food.servings.serving['length']?

                


                    (<div  className='m-auto col-md-6
                    '><ServingTable saving={props.saving} setSaving={props.setSaving} setVisible={setVisible} id={id} getFood={getFood} foodData={foodData} serving={food.servings.serving[0]}  /></div>)
                :<div className='m-auto col-md-6'><ServingTable id={id} getFood={getFood} setVisible={setVisible}
                
                foodData={foodData}
                saving={props.saving} setSaving={props.setSaving}
                serving={food.servings.serving}/></div>
            

        }
    </div> );
}
 
export default Serving;
