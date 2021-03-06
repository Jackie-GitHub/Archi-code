import React, { Fragment,useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import {loadUser} from './actions/auth';
import './App.scss';
import Routes from './components/routing/Routes';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

//Redux
import {Provider} from 'react-redux';
import store from './store';
import {LOGOUT} from './actions/types';

const App = () => {
  useEffect(()=>{
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
    //log user our from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  },[]);
  return (
    <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Fragment>
    </Router>
    </Provider>
  )
}

export default App;
