import React,{Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getCurrentProfile} from '../../actions/profile';
import Spinner from '../layout/Spinner';

import UpdateProfile from './UpdateProfile';
import CreateProfile from './CreateProfile';
import Alert from '../layout/Alert';

const Profile =({getCurrentProfile,profile:{profile,loading}}) => {
    useEffect(()=>{
        getCurrentProfile();
    },[getCurrentProfile]);
    return (
        <div className="container majorPage">
            <Alert />
            { loading && profile === null ? <Spinner /> : <Fragment>
                {profile !== null ? <UpdateProfile profile={profile} /> : <CreateProfile />}
            </Fragment>}
        </div>
    )
}


Profile.propTypes = {
    getCurrentProfile:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile:state.profile
})

export default connect(mapStateToProps,{getCurrentProfile})(Profile); 
