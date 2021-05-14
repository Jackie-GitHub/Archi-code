import React from 'react';
import NavebarSec from '../layout/NavbarSec';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ProfileById from '../profileById/ProfileById';
import PostByUserContainer from '../posts/PostByUserContainer';

const HomePageById = ({match}) => {
    return (
        <Router>
            <div className = "homepage">
                <NavebarSec profileLink={`/members/${match.params.id}/profile`} postLink={`/members/${match.params.id}/posts`}/>
                <Switch >
                    <Route path="/members/:id/profile">
                        <ProfileById  userId = {match.params.id}/>
                    </Route> 
                    <Route path="/members/:id/posts">
                        <PostByUserContainer userId={match.params.id} />
                    </Route>
                </Switch>
            </div>
        </Router>
        
        
    )
}

export default HomePageById
