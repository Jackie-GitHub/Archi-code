import React from 'react';
import ProfileBasicInfo from './ProfileBasicInfo';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileSkills from './ProfileSkills';
import {connect} from 'react-redux';
import {addExperience,addEducation} from '../../actions/profile';

const UpdateProfile = ({profile:{user:{name,email,avatar},title,company,location,companyWeb,personalWeb,about,skills,experience,education,social},addExperience,addEducation}) => {
    return (
        <div className="row">
            <div className="col-12 col-sm-4 col-md-3">
                <img src={avatar} alt="profileImage" className="mb-3" />
                <ProfileBasicInfo name={name} email={email} title={title} company={company} location={location} companyWeb={companyWeb} personalWeb={personalWeb} social={social} />
            </div>
            <div className="col-12 col-sm-8 col-md-9">
                <ProfileAbout about={about}/>
                <ProfileExperience action={addExperience} exps={experience} />
                <ProfileEducation action={addEducation} edus={education} />
                <ProfileSkills skills={skills}/>
            </div>
        </div>
    )
}

export default connect(null,{addExperience,addEducation})(UpdateProfile)
