import React,{Fragment, useEffect} from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getProfileById} from '../../actions/profile';
import ProfileBasicInfo from '../profile/ProfileBasicInfo';
import ProfileAbout from '../profile/ProfileAbout';
import ProfileExperience from '../profile/ProfileExperience';
import ProfileEducation from '../profile/ProfileEducation';
import ProfileSkills from '../profile/ProfileSkills';


const ProfileById = ({getProfileById,profile:{profile},userId}) => {
    useEffect(()=>{
        getProfileById(userId);
    },[getProfileById,userId])
    return (
        <Fragment>
            {profile === null ? <Spinner /> : 
                <div className="container majorPage">
                    <div className="row">
                        <div className="col-12 col-sm-4 col-md-3">
                            <img src={profile.user.avatar} alt="profileImage" className="mb-3" />
                            <ProfileBasicInfo name={profile.user.name} email={profile.user.email} title={profile.title} company={profile.company} location={profile.location} companyWeb={profile.companyWeb} personalWeb={profile.personalWeb} social={profile.social} />
                        </div>
                        <div className="col-12 col-sm-8 col-md-9">
                            <ProfileAbout about={profile.about}/>
                            <ProfileExperience  exps={profile.experience} />
                            <ProfileEducation edus={profile.education} />
                            <ProfileSkills skills={profile.skills}/>
                        </div>
                    </div>
                </div>}
        </Fragment>
    )
}

ProfileById.propTypes = {
    getProfileById:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile:state.profile
})

export default connect(mapStateToProps,{getProfileById})(ProfileById);
