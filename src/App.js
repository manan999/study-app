import React, {useState} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom' ;
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './comps/home/Home.js' ;
import NotFound from './comps/home/NotFound.js' ;
import Header from './comps/header/Header.js' ;
import Logout from './comps/login/Logout.js' ;
import Dashboard from './comps/dashboard/Dashboard.js' ;

const App = () => {
  
  const [user, setUser] = useState(localStorage.getItem('study-user')?JSON.parse(localStorage.getItem('study-user')):{}) ;
  const [userToken, setUserToken] = useState(localStorage.getItem('study-userToken')?localStorage.getItem('study-userToken'):'') ;

  const loadUser = (user) => {
    if(user.user)
    { 
      setUser(user.user) ;
      setUserToken(user.token);
      localStorage.setItem('study-user', JSON.stringify(user.user) );
      localStorage.setItem('study-userToken', user.token);
    } 
    else
    {
      setUser({}) ;
      setUserToken('') ;
    }
  }

  return (
    <div className="App">
      <ToastContainer position="bottom-right" autoClose={4000} hideProgressBar={false}  newestOnTop={false} closeOnClick rtl={false} pauseOnHover />
      <BrowserRouter> 
        <div>
          <Header user={user} token={userToken} loadUser={loadUser}/>
          <Switch>
            <Route path='/' exact render={props=><Home {...props} user={user} token={userToken} loadUser={loadUser}/>} />
            <Route path='/dashboard' render={props=><Dashboard {...props} user={user} token={userToken} />} />
    	      <Route path='/logout' exact render={props=><Logout {...props} user={user} token={userToken} loadUser={loadUser} />}/>
            <Route exact component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
