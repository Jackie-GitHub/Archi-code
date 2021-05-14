import React, {Fragment, useEffect} from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getProfiles} from '../../actions/profile';
import ProfilesItem from './ProfilesItem';

const Profiles = ({getProfiles,profile:{profiles,loading}}) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);
    return (
        <div className="container majorPage">
            {loading ? <Spinner /> : <Fragment>
                {profiles.length > 0 ? (
                    <div className="profiles">
                        {profiles.map(profile => <ProfilesItem key={profile._id} profile={profile} />)}
                    </div>
                ) : <h4>No profiles found ...</h4> }
            </Fragment>}
        </div>
    )
}

Profiles.propTypes = {
    getProfiles:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile:state.profile
})

export default connect(mapStateToProps,{getProfiles})(Profiles);
