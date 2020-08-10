import React,{useReducer} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '@material-ui/icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'
import {reducer} from './reducer'
import {authContext} from './auth'

import * as serviceWorker from './serviceWorker';
function Portal(props){
    const localtoken=localStorage.getItem('nutri-token')
    const init={token:localtoken?localtoken:''}
    const [state, dispatch] = useReducer(reducer,init);
    return(
        <authContext.Provider value={{state,dispatch}}>
        
        <App>

        </App>
    </authContext.Provider>
    )

    
}
ReactDOM.render(<Portal/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
