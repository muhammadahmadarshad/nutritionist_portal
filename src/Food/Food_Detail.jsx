import React,{useState,useEffect} from 'react';
import Sidebar from '../Sidebar/Sidebar'
import NavBar from '../Navbar/navbar'
import classNames from 'classnames'
import Loading from '../Loading/Loading'
import {useParams} from 'react-router-dom'
import {Alert} from 'reactstrap'
import axios from 'axios'
import Serving from './Serving';
const FoodDetail = (props) => {
    const [isOpen,setOpen]=useState(false)
    const {food_id} =useParams()
    const [loading,setLoading]=useState(true)
    const [food,setFood]=useState({})
    const [visible, setVisible] = useState({visible:false, msg:"",color:""});
    const [saving,setSaving]=useState(false)
    const onDismiss = () => setVisible({visible:false});
    function toggle(){
        setOpen(!isOpen)
    }
    useEffect(()=>{

    get_food(food_id)



    },[food_id])
    function get_food(id){
        axios({    url:`http://localhost:5000/search/foodByID/getFood/${id}`,
        method:'GET',
        headers:{'x-auth-token':localStorage.getItem('nutri-token')}
    })

    .then((res)=>{
        
        setFood({...res.data.food})
        setLoading(false)
    })


    }
    function setAlert(visible,msg,color)
    {

        setVisible({visible,msg,color})


    }


 
    if(loading ){

        return(
        <div className="App wrapper content">  
        <Sidebar toggle={toggle} isOpen={isOpen}/>
        <div className={classNames('content container-fluid',{'is-open':isOpen})}>
        <NavBar toggle={toggle} isOpen={isOpen }/>
        <div className='m-auto'>
        <Loading/>

        </div>
        </div>             
         </div>)

    }



    return (

        <div className="App wrapper content">  
       <Sidebar toggle={toggle} isOpen={isOpen}/>
       <div className={classNames('content container-fluid',{'is-open':isOpen})}>
       <NavBar toggle={toggle} isOpen={isOpen }/>
        
        <div className='container'>
            <h2 className='text-center'><strong>{`${food.food_name} ( ${food.food_type} )`}</strong></h2>
            <div className='mt-4'>
            <Alert color={visible.color} fade={false} isOpen={visible.visible} toggle={onDismiss}>
            {visible.msg}
      </Alert>
                <Serving food={food} saving={saving} setSaving={setSaving} id={food_id} getFood={get_food}  setVisible={setAlert}/>
            </div>

        </div>



       </div>            
       </div>
    
    );
}
 
export default FoodDetail;