import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const ProfilesItem = ({profile:{user:{_id,name,avatar},title,company,location}}) => {
    return (
        <Link to={`/members/${_id}/profile`} >
            <img src={avatar} alt="profileImage" />
            <div className="profilesNL">
                <div className="profileName">
                    {name}
                </div>
                <div className="profileLocation">
                    {location}
                </div>
            </div>
            <div>
                    {title}{company && <span> at {company}</span>}
            </div>
        </Link>
    )
}

ProfilesItem.propTypes = {
    profile:PropTypes.object.isRequired
}

export default ProfilesItem
