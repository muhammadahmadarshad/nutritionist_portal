import React,{useState,useEffect} from 'react';
import Sidebar from '../Sidebar/Sidebar'
import NavBar from '../Navbar/navbar'
import classNames from 'classnames'
import Header from './Food-Header'
import {useParams} from 'react-router-dom'
import FoodItem from './Food-Item';
import axios from 'axios'

const Food_Search = (props) => {
  const {page,query}=useParams()
  const [search, setSearch] = useState(query===undefined?'':query)
  const [err,setErr]=useState(false)
  const [food,setFood]=useState({})

  const [loading,setLoading]=useState(true)

  const [isOpen, setOpen] = useState(false);
  function onInputChange(e){

    setSearch(e.target.value)
}

useEffect(()=>{
if(query!==undefined){
  setLoading(true)
  axios({url:`http://localhost:5000/search/food_search/${query}/${page-1}`,method:'GET'})
  .then((res)=>{  
    setFood(res.data.foods)
    setLoading(false)
    setErr(false)

  })
  .catch(err=>{
      setErr(true)
      setLoading(false)
  
  })


}



},[query,page])

  




  function toggle(){
    setOpen(!isOpen)
  }


  function getFood(){
      let {push}=props.history
      if(search!=='' && search!==' ')
      push(`/search_food/${search}/1`)

  }

   

    return ( 
    
    <div className="App">
   
    <Sidebar toggle={toggle} isOpen={isOpen}/>
   

    <div className={classNames('content container-fluid',{'is-open':isOpen})}>
    
    <NavBar toggle={toggle} isOpen={isOpen }/>
    
    <Header search={search} onInputChange={onInputChange} onSearchClick={getFood}/>
    <div className='container'>   
    {query&&

<FoodItem err={err} loading={loading} food={food} match={props.match}  history={props.history}/>


    }
   
 

  </div>
    
        </div></div>
    
    );
}
 
export default Food_Search;