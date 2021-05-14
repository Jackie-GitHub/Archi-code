import React from 'react';
import {connect} from 'react-redux';
import backgroundImg from '../../resources/img/backgroundImg01.jpg';
import RegisterContent from '../auth/RegisterContent';
import Posts from '../posts/Posts';
import AddPost from '../posts/AddPost';

const Landing = ({auth:{isAuthenticated,loading,user}}) => {
    const rightSmallColumn = isAuthenticated ? <div>Authenticated</div> : <RegisterContent />;

    return (
        <div className="majorPage">
            <div className="backgroundImg" style={{backgroundImage: `url(${backgroundImg})`}}>
            </div>
            <div className="container">
                <div className="row landingContent">
                    <div className="col-12 col-sm-9">
                        {!loading && isAuthenticated && user ? <AddPost /> : null}
                        <Posts />
                    </div>
                    <div  className="col-sm-3">
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
