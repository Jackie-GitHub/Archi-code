import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileBasicInfoContent from './ProfileBasicInfoContent';
import {getCurrentProfile} from '../../actions/profile';
import Spinner from '../layout/Spinner';

const ProfileSideColumn = ({getCurrentProfile,profile:{loading,profile},auth}) => {
    useEffect(()=>{
        getCurrentProfile();
    },[getCurrentProfile]);
    return (
        auth.isAuthenticated && !auth.loading && profile ?
            <div>
                <div className="postItem-profile">
                    <div className="postItem-profileInfo">
                        <Link to="/me/profile"><img src={profile.user.avatar} alt="profilePic" /></Link>
                    </div>
                </div>
                <ProfileBasicInfoContent name={profile.user.name} company={profile.company} title={profile.title} loc={profile.location} companyWeb = {profile.companyWeb} personalWeb={profile.personalWeb} social={profile.social} />            
            </div> 
        : <Spinner />     
    )
}

ProfileSideColumn.propTypes = {
    getCurrentProfile:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth:state.auth
})

export default connect(mapStateToProps,{getCurrentProfile})(ProfileSideColumn);
