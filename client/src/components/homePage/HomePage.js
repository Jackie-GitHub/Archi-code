import React from 'react';
import {connect} from 'react-redux';
import NavebarSec from '../layout/NavbarSec';
import {BrowserRouter as Router, Route, Switch,Redirect} from 'react-router-dom';
import Profile from '../profile/Profile';
import PostByUserContainer from '../posts/PostByUserContainer';
import Spinner from '../layout/Spinner';

const HomePage = ({auth}) => {
    const userLoaded = auth.isAuthenticated && !auth.loading && auth.user !== null;
    return (
        <Router>
            <div className = "homepage">
                <NavebarSec profileLink='/me/profile' postLink='/me/posts'/>
                <Switch >
                    <Redirect from="/profile" to="/me/profile" />
                    <Route path="/me/profile">
                        <Profile userLoaded = {userLoaded} />
                    </Route>
                    <Route path="/me/posts" >
                        {userLoaded ? <PostByUserContainer userId={auth.user._id}/> : <Spinner/>}
                    </Route>
                </Switch>
            </div>
        </Router>
        
        
    )
}

const mapStateToProps = state => ({
    auth:state.auth
})

export default connect(mapStateToProps,null)(HomePage)
