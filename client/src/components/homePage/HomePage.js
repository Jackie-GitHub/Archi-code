import React from 'react';
import {connect} from 'react-redux';
import NavebarSec from '../layout/NavbarSec';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Profile from '../profile/Profile';
import PostByUserContainer from '../posts/PostByUserContainer';

const HomePage = ({auth}) => {
    return (
        <Router>
            <div className = "homepage">
                <NavebarSec profileLink='/profile/profile' postLink='/profile/posts'/>
                <Switch >
                    <Route path="/profile/profile" component={Profile} />
                    <Route path="/profile/posts" >
                        <PostByUserContainer userId={auth.user._id}/>
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
