//show social existing content

import React, {Fragment,useState} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createProfile} from '../../actions/profile';

const EditProfile = ({title,company,loc,companyWeb,personalWeb,social,btnClick,createProfile,history}) => {
    const socialDefaultValue = {...social};
    socialDefaultValue.twitter = socialDefaultValue.twitter || "Twitter URL";
    socialDefaultValue.facebook = socialDefaultValue.facebook || "Facebook URL";
    socialDefaultValue.linkedin = socialDefaultValue.linkedin || "LinkedIn URL";
    socialDefaultValue.instagram = socialDefaultValue.instagram || "Instagram RUL";
    const [formData, setFormData] = useState({
        company:company ? company : "",
        title:title?title:'',
        location:loc? loc : "",
        companyWeb:companyWeb ? companyWeb : "",
        personalWeb:personalWeb ? personalWeb :'',
        twitter:socialDefaultValue.twitter === "Twitter URL" ? "" : socialDefaultValue.twitter,
        facebook:socialDefaultValue.facebook === "Facebook URL" ? "" : socialDefaultValue.facebook,
        linkedin:socialDefaultValue.linkedin === "LinkedIn URL"? "":socialDefaultValue.linkedin,
        instagram:socialDefaultValue.instagram === "Instagram RUL" ? "":socialDefaultValue.instagram
    })
    const [displaySocialInputs,toggleSocialInputs] = useState(false);
    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        btnClick();
        createProfile(formData,history);
    }
    
    return (
        <Fragment>
            <div className="mb-3 textBold">Welcome, please update your profile below.<small style={{color:'grey',fontWeight:'300'}}>  (* = required)</small></div> 
            <form onSubmit={e=>onSubmit(e)}>
                <div className="mb-3">
                    <small>Company:</small>
                    <input
                        className="form-control"
                        type="text"
                        placeholder={company}
                        name="company"
                        value={formData.company}
                        onChange={e=>onChange(e)}
                        autoComplete="off"
                    />
                </div>
                <div className="mb-3">
                    <small>Title:</small>
                    <input
                        className="form-control"
                        type="text"
                        placeholder={title}
                        name="title"
                        value={formData.title}
                        onChange={e=>onChange(e)}
                        autoComplete="off"
                    />
                </div>
                <div className="mb-3">
                    <small>Location*:</small>
                    <input
                        className="form-control"
                        type="text"
                        placeholder={loc}
                        name="location"
                        value={formData.location}
                        onChange={e=>onChange(e)}
                        autoComplete="off"
                        required
                    />
                </div>
                <div className="mb-3">
                    <small>Company Web:</small>
                    <input
                        className="form-control"
                        type="text"
                        placeholder={companyWeb}
                        name="companyWeb"
                        value={formData.companyWeb}
                        onChange={e=>onChange(e)}
                        autoComplete="off"
                    />
                </div>
                <div className="mb-3">
                    <small>Personal Web:</small>
                    <input
                        className="form-control"
                        type="text"
                        placeholder={personalWeb}
                        name="personalWeb"
                        value={formData.personalWeb}
                        onChange={e=>onChange(e)}
                        autoComplete="off"
                    />
                </div>
                <div className="mb-3">
                    <button onClick={()=>toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-secondary btn-sm py-0">Add Social Network</button>
                    <small> Optional</small>
                </div>
                {displaySocialInputs && <Fragment>
                    <div className="input-group mb-3">
                        <i className="input-group-text fab fa-twitter"></i>
                        <input type="text" placeholder={socialDefaultValue.twitter} name="twitter" value={formData.twitter} onChange={e=>onChange(e)} className="form-control"/> 
                    </div>
                    <div className="input-group mb-3">
                        <i className="input-group-text fab fa-facebook-f"></i>
                        <input type="text" placeholder={socialDefaultValue.facebook} name="facebook" value={formData.facebook} onChange={e=>onChange(e)} className="form-control"/> 
                    </div>
                    <div className="input-group mb-3">
                        <i className="input-group-text fab fa-linkedin-in"></i>
                        <input type="text" placeholder={socialDefaultValue.linkedin} name="linkedin" value={formData.linkedin} onChange={e=>onChange(e)} className="form-control"/> 
                    </div>
                    <div className="input-group mb-3">
                        <i className="input-group-text fab fa-instagram"></i>
                        <input type="text" placeholder={socialDefaultValue.instagram} name="instagram" value={formData.instagram} onChange={e=>onChange(e)} className="form-control"/> 
                    </div>
                </Fragment>}
                <input type="submit" className="btn btn-outline-success btn-sm mt-3" value="Update Profile" />
            </form>
        </Fragment>
        
    )
}

EditProfile.propTypes = {
    createProfile:PropTypes.func.isRequired
}

export default connect(null,{createProfile})(withRouter(EditProfile))
