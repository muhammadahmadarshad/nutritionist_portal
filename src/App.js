import React from 'react';
import Login from './Login/Login'
import PrivateRoute from './PrivateRoute';
import Dashboard from './Dashboard/Dashboard';
import { Route, Switch, BrowserRouter ,Redirect} from 'react-router-dom';
import './App.css'
import AddEducation from './Profie/AddEducation';
import AddExperience from './Profie/AddExperience';
import AddSpecialization from './Profie/AddSpecialiaztion';
import Profile from './Profie/Profile';
import Food_Search from './Food/Food-Search';
import FoodDetail from './Food/Food_Detail';
import Favorite_Food from './Food/Favourite_Foods'

import Queries from './Queries/Queries';
import DietPlanOrders from './DietPlan/DietPlanOrders';
import DietPlanOrderDetails from './DietPlan/DietPlanOrderDetails';
import DietPlans from './DietPlan/DietPlans';
import DietPlanDetails from './DietPlan/DietPlanDetails';
import DietPlan from './DietPlan/DietPlan';
import Query from './Queries/Query';
import Password from './resetPassword/Password';
import ChangePassword from './Profie/Change-Password';
import Performance from './DietPlan/DietPlanPerformance'
function App() {
  return (



    
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/forget_password' component={Password}/>
          <PrivateRoute exact  path='/dashboard' component={Dashboard}/>
          <PrivateRoute exact path='/add_education' component={AddEducation}/>
          <PrivateRoute path='/add_experience' component={AddExperience}/>
          <PrivateRoute path='/add_speciality' component={AddSpecialization} />
          <PrivateRoute exact path="/account" component={Profile}/>
          <PrivateRoute exact path='/search_food/:query?/:page?' component={Food_Search}/>
          <PrivateRoute exact path='/food_details/:food_id' component={FoodDetail} />
        <PrivateRoute exact path='/active_diet_plans/:page' component={DietPlans} />
        <PrivateRoute exact path='/my_foods/:page' component={Favorite_Food} />
        <PrivateRoute exact path='/queries/:page' component={Queries}></PrivateRoute>
        <PrivateRoute exact path='/conversation/:id' component={Queries}></PrivateRoute>
        <PrivateRoute exact path="/orders/:page?" component={DietPlanOrders}></PrivateRoute>
        <PrivateRoute exact path='/diet_plan_order_details/:id' component={DietPlanOrderDetails}></PrivateRoute>
        <PrivateRoute exact path='/diet_plan_details/:id' component={DietPlanDetails}></PrivateRoute>
        <PrivateRoute exact path='/diet_plan/:id/:page' component={DietPlan}></PrivateRoute>
        <PrivateRoute exact path='/query_detail/:id' component={Query}></PrivateRoute>
        <PrivateRoute exact path='/change_password' component={ChangePassword}/>
        <PrivateRoute exact path='/diet_plan_performance/:id' component={Performance} />
        <Redirect to="/dashboard"/>

        </Switch>
        </BrowserRouter>
        
        
      
  );
}

export default App;
