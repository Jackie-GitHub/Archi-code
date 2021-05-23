import React from 'react';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {deleteExperience} from '../../actions/profile';
import PropTypes from 'prop-types';

const ProfileExperienceItem = ({deleteExperience,exp,auth,profile})=> {
    return (
        <div className="ProfileModuleItem mt-2">
            <div className="ProfileMItemDate"><Moment format='MMM YYYY'>{exp.from}</Moment> - {exp.current ? 'Present' : <Moment format='MMM YYYY'>{exp.to}</Moment>}</div>
            <div className="ProfileMItemContent">
                <div>
                    <div className="ProfileMItemTitle textBold">
                    {`${exp.company}, ${exp.location}, ${exp.title}`}
                    </div>
                    {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && <button type="button" className="btn btn-danger btn-sm py-0"><i className="fas fa-times" onClick={()=>deleteExperience(exp.id)} /></button>}
                </div>
                <div>
                 {exp.description}
                </div>
            </div>
        </div>
    )
}

ProfileExperienceItem.propTypes = {
    deleteExperience:PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth:state.auth,
    profile:state.profile.profile
});

export default connect(mapStateToProps,{deleteExperience})(ProfileExperienceItem)
