import React from 'react';
//import PropTypes from 'prop-types';
import ProfileModuleItem from './ProfileModuleItem';

const ProfileModule = ({type,action,content}) => {
    return (
        <div className="profileItem mb-3">
            <div className=" profileSection pb-2">
                <div className="textBold">
                    {type}
                </div>
                <button type="button" className="btn btn-secondary btn-sm py-0">Add</button>
            </div>
            <div>
                <ProfileModuleItem content={content} />
            </div>
        </div>
    )
}

// ProfileModule.propTypes = {

// }

export default ProfileModule
