import React from 'react';
import {Route, Switch,Redirect} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Profiles from '../profiles/Profiles';
import HomePage from '../homePage/HomePage';
import HomePageById from '../homePage/HomePageById';

const Routes = props => {
    return (
        <section>
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profiles" component={Profiles} />
                <Redirect from="/profile" to="/me/profile" />
                <PrivateRoute exact path="/me/profile" component={HomePage} />
                <Route exact path="/members/:id/profile" component={HomePageById} />
            </Switch>
        </section>
    )
}

export default Routes
