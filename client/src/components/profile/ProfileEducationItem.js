import React from 'react';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {deleteEducation} from '../../actions/profile';
import PropTypes from 'prop-types';

const ProfileEducationItem = ({deleteEducation,edu,auth,profile})=> {
    return (
        <div className="ProfileModuleItem mt-2">
            <div className="ProfileMItemDate"><Moment format='MMM YYYY'>{edu.from}</Moment> - {edu.current ? 'Present' : <Moment format='MMM YYYY'>{edu.to}</Moment>}</div>
            <div className="ProfileMItemContent">
                <div>
                    <div className="ProfileMItemTitle textBold">
                    {`${edu.school}, ${edu.location}, ${edu.degree}`}
                    </div>
                    {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id &&
                    <button type="button" className="btn btn-danger btn-sm py-0"><i className="fas fa-times" onClick={()=>deleteEducation(edu.id)} /></button>}
                </div>
                <div>
                 {edu.description}
                </div>
            </div>
        </div>
    )
}

ProfileEducationItem.propTypes = {
    deleteEducation:PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth:state.auth,
    profile:state.profile.profile
});

export default connect(mapStateToProps,{deleteEducation})(ProfileEducationItem)
