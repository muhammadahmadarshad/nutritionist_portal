import React from 'react';
import Sidebar from '../Sidebar/Sidebar'
import NavBar from '../Navbar/navbar'
import classNames from 'classnames'
import Loading from '../Loading/Loading'
import axios from 'axios'
import {Table,Button} from 'reactstrap'
import {useParams} from 'react-router-dom'
import Paginate from './Favourite_paginate'
import {Modal,ModalBody,ModalHeader,Form,Input} from 'reactstrap'
import FavouriteFoodItem from './Favourite_Food_Item'
function AddMeal(props){
    const {toggle,modal,err,setErr,clientList,food}=props
    const [time_to_eat,setTime]= React.useState({value:'',err:false,msg:''})
    const [meal,setMeal] = React.useState({value:"",err:false,msg:""})
    const [loading,setLoading]= React.useState(false)
    const [client,setClient]=React.useState({value:"",err:false,msg:""})
    const onChangeClient=(e)=>{
        setClient({err:false,value:e.target.value,msg:""}) 

    }
    
    const onChangeMeal=(e)=>{

        setMeal({err:false,value:e.target.value,msg:""}) 
    }
        
    const onChangeTime=(e)=>{
        setTime({err:false,value:e.target.value,msg:""})
    }
    const onSubmit=(e)=>{
        e.preventDefault()
        let data={
            food,
            time_to_eat:time_to_eat.value,
            meal:meal.value,
            client:client.value
        }
        setLoading(true)


        axios({
            url:'http://localhost:5000/diet_plan/add_meal',
            headers:{'x-auth-token':localStorage.getItem('nutri-token')},
            data,
            method:'post'
        })
        .then(res=>{
            setErr({msg:res.data.message,err:false})
            setLoading(false)
           
        })
        .catch(err=>{
          
            let {data}=err.response
            setLoading(false)
            if(data.path!==undefined){

                if(data.path[0]==='meal'){

                    setMeal({...meal,err:true,msg:data.message})
                    
                }

                else if(data.path[0]==='time_to_eat'){
                    setTime({...time_to_eat,err:true,msg:data.message})
                }

                else if(data.path==='client'){
                    setClient({...client,err:true,msg:data.message})
                }
            }

            else{

                setErr({err:true,msg:data.message})
            }
        })


    }
    return( 
        <div>
        <Modal isOpen={modal.open} toggle={toggle} >
          <ModalHeader toggle={toggle}>Add Meal to Personal Diet Plan</ModalHeader>
          <ModalBody>
              <Form onSubmit={onSubmit}>
              <div className='form-group'>
                        Select Client:<Input required value={client.value} onChange={onChangeClient} invalid={client.err} type='select'>
                            <option value=''>
                                Select Client
                            </option>
                            {
                                clientList.map((plan)=>{
                                    let {owner_id}=plan
                                    return(

                                        <option value={owner_id._id}>
                                            {owner_id.first_name+" "+owner_id.last_name}
                                            ({owner_id.email})
                                        </option>
                                    )
                                })
                            }
                        </Input>
                    {client.err&&<span className='text-danger'>{client.msg}</span>}
                    </div>
                    <div className='form-group'>
                        Meal:<Input value={meal.value} onChange={onChangeMeal} invalid={meal.err} type='select'>
                            <option value='0'>
                                Select Meal
                            </option>
                            <option value='Breakfast'>Breakfast</option>
                            <option value='Lunch'>Lunch</option>
                            <option value='Dinner'>Dinner</option>
                            <option value='Snacks'>Snacks</option>
                        </Input>
                    {meal.err&&<span className='text-danger'>{meal.msg}</span>}
                    </div>
                    <div className='form-group'>
                        <div className='row'>
                            <div className='col-sm-12'>
                            Date: <Input value={time_to_eat.value} invalid={time_to_eat.err} onChange={onChangeTime} type='datetime-local'></Input>
                            {time_to_eat.err&&<span className='text-danger'>{time_to_eat.msg}</span>}
                            </div>

                        </div>

                    </div>


                    <div className='form-group'>
                        <Button className='btn btn-success btn-block' 
                        type= 'submit'
                        >{loading?'Adding...':"Add"}</Button>
                    </div>
    {!err.err?<span className='text-success text-center'>{err.msg}</span>:<span className='text-danger text-center'>{err.msg}</span>
                    }
              </Form>
          </ModalBody>
        </Modal>
      </div>)


}



export default function Favourite_Food(props){
    const [err,setErr]=React.useState({err:false,msg:""})
    const [isOpen,setOpen]=React.useState(false)
    const [loading,setLoading]= React.useState(true)
    const [foods,setFood] = React.useState([])
    const [modal, setModal] =React.useState({open:false,food:''});
    const [food, setFoods] =React.useState('');
    const [client,setClient]=React.useState([])
    const AddMealFormModal = (id) => {
        setFoods(id)
        setModal({open:!modal.open})
        setErr({err:false,msg:''})
    
    
    
    };
    const toggleModal =()=>setModal({...modal,open:!modal.open})
    let {page} = useParams()
  
    let toggle=()=>{
        setOpen(!isOpen)
     }

const AddToMeal=(id)=>{
console.log(id)
AddMealFormModal(id)
toggleModal()

}

React.useEffect(()=>{

axios({
    method:'GET',
    headers:{'x-auth-token':localStorage.getItem('nutri-token')},
    url:`http://localhost:5000/food/get_favourite/${page}`

})
.then((res)=>{

    axios({
        method:'GET',
        headers:{'x-auth-token':localStorage.getItem('nutri-token')},
        url:`http://localhost:5000/diet_plan/clients`
    
    })
    .then((res)=>{
        console.log(res.data)
        setClient(res.data)
        setLoading(false)
        
    })
    .catch(()=>{

    })
    setFood(res.data)
    setLoading(false)

})

},[page])








    return (<div className="App wrapper content">  
       
       
    <Sidebar toggle={toggle} isOpen={isOpen}/>
    <div className={classNames('content container-fluid',{'is-open':isOpen})}>
    <NavBar toggle={toggle} isOpen={isOpen }/>
     <div className='container-fluid'>
        <AddMeal err={err} food={food} setFoods={setFoods} clientList={client} setErr={setErr} modal={modal} toggle={toggleModal}/>
     {!loading?<div>
        {foods.Foods.saved_food.length>0?
        <div>
            <h1 className='text-center'><strong><i className='fa text-danger fa-heart'></i> Favourite Foods</strong></h1>
        <Table striped>
            <thead>
            <tr>
            <th>Food Name</th>
            <th>Food Type</th>
            <th>Detail</th><th>Add to Meal</th>
            </tr>
            </thead>
            <FavouriteFoodItem AddToMeal={AddToMeal} foods={foods}/>



        </Table>
        <Paginate total_results={foods.total_results} activePage={page} history={props.history}/>
        </div>
        :<h1 className='text-danger text-center'>No Foods Available</h1>}


     </div>:<Loading/>
     }

     </div>
    </div>
    
    </div>
    )







}