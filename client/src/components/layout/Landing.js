import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import backgroundImg from '../../resources/img/backgroundImg01.jpg';
import RegisterContent from '../auth/RegisterContent';
import Posts from '../posts/Posts';
import AddPost from '../posts/AddPost';
import ProfileSideColumn from '../profile/ProfileSideColumn';

const Landing = ({auth}) => {
    let userLoaded = auth.isAuthenticated && !auth.loading && auth.user !== null;
    const rightSmallColumn = userLoaded ? <ProfileSideColumn />  : <RegisterContent />;
    return (
        <div className="majorPage">
            <div className="backgroundImg" style={{backgroundImage: `url(${backgroundImg})`}}>
            </div>
            <div className="container">
                <div className="row landingContent">
                    <div className="col-12 col-md-9">
                        {userLoaded ? <AddPost /> : null}
                        <Posts />
                    </div>
                    <div  className="col-12 col-md-3">
                        <div className="LandingRightFrame">
                            {rightSmallColumn}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

// Landing.propTypes = {
    
// }

const mapStateToProps = state => ({
    auth:state.auth
})

export default connect(mapStateToProps)(Landing);
