import React, {Fragment,useState} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createProfile} from '../../actions/profile';

const CreateProfile = ({createProfile,history}) => {
    const [formData, setFormData] = useState({
        company:'',
        title:'',
        location:'',
        companyWeb:'',
        personalWeb:'',
        about:'',
        skills:'',
        twitter:'',
        facebook:'',
        linkedin:'',
        instagram:''
    })
    const [displaySocialInputs,toggleSocialInputs] = useState(false);
    const{
        company,
        title,
        location,
        companyWeb,
        personalWeb,
        about,
        skills,
        twitter,
        facebook,
        linkedin,
        instagram
    } = formData;
    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData,history);
    }
    return (
        <Fragment>
            <div className="mb-3 textBold">Welcome, please enter some information below to create your profile.<small style={{color:'grey',fontWeight:'300'}}>  (* = required)</small></div> 
            <form onSubmit={e=>onSubmit(e)}>
                <div className="mb-3">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Company"
                    name="company"
                    value={company}
                    onChange={e=>onChange(e)}
                    autoComplete="off"
                />
                </div>
                <div className="mb-3">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={e=>onChange(e)}
                    autoComplete="off"
                />
                </div>
                <div className="mb-3">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Location*"
                        name="location"
                        value={location}
                        onChange={e=>onChange(e)}
                        autoComplete="off"
                        required
                    />
                </div>
                <div className="mb-3">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Company Website"
                    name="companyWeb"
                    value={companyWeb}
                    onChange={e=>onChange(e)}
                    autoComplete="off"
                />
                </div>
                <div className="mb-3">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Personal Website"
                    name="personalWeb"
                    value={personalWeb}
                    onChange={e=>onChange(e)}
                    autoComplete="off"
                />
                </div>
                <div className="mb-3">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Skills"
                    name="skills"
                    value={skills}
                    onChange={e=>onChange(e)}
                    autoComplete="off"
                />
                </div>
                <div className="mb-3">
                <textarea
                    className="form-control"
                    type="text"
                    placeholder="Tell us a little about yourself."
                    name="about"
                    value={about}
                    onChange={e=>onChange(e)}
                />
                </div>
                <div className="mb-3">
                    <button onClick={()=>toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-secondary btn-sm py-0">Add Social Network</button>
                    <small> Optional</small>
                </div>
                {displaySocialInputs && <Fragment>
                    <div className="input-group mb-3">
                        <i className="input-group-text fab fa-twitter"></i>
                        <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e=>onChange(e)} className="form-control"/> 
                    </div>
                    <div className="input-group mb-3">
                        <i className="input-group-text fab fa-facebook-f"></i>
                        <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e=>onChange(e)} className="form-control"/> 
                    </div>
                    <div className="input-group mb-3">
                        <i className="input-group-text fab fa-linkedin-in"></i>
                        <input type="text" placeholder="LinkedIn URL" name="linkedin" value={linkedin} onChange={e=>onChange(e)} className="form-control"/> 
                    </div>
                    <div className="input-group mb-3">
                        <i className="input-group-text fab fa-instagram"></i>
                        <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e=>onChange(e)} className="form-control"/> 
                    </div>
                </Fragment>}
                <input type="submit" className="btn btn-outline-success mt-3" value="Create Profile" />
            </form>
        </Fragment>
        
    )
}

CreateProfile.propTypes = {
    createProfile:PropTypes.func.isRequired
}

export default connect(null,{createProfile})(withRouter(CreateProfile))
