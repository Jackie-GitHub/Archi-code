import React,{Fragment,useState} from 'react';
import PropTypes from 'prop-types';
import Modal from '../layout/Modal';
import {connect} from 'react-redux';
import {updateSkills} from '../../actions/profile';

const ProfileSkills = ({skills,updateSkills,auth,profile}) => {
    const [modal, showModal] = useState({
        show:false
    });
    const [skillsContent, setSkills] = useState({skills:''})
    const onChange = e => setSkills({skills:e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        showModal({show:false});
        updateSkills(skillsContent);
    }
    return (
        <Fragment>
            <Modal onclick={()=>showModal({show:false})} show={modal.show}>
                <form onSubmit={e=>onSubmit(e)}>
                    <textarea
                        className="form-control"
                        type="text"
                        placeholder={skills}
                        name="skills"
                        value={skillsContent.skills}
                        onChange={e=>onChange(e)}
                    />
                    <input type="submit" className="btn btn-outline-success btn-sm mt-3" value="Update Skills" />
                </form>
            </Modal>
            <div className="profileItem mb-3">
                <div className=" profileSection pb-2">
                    <div className="textBold">
                        SKILLS
                    </div>
                    {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id &&
                    <button onClick={()=>{showModal({show:true})}} type="button" className="btn btn-secondary btn-sm py-0">Edit</button>}
                </div>
                <div className="profileDiscription mt-2">{skills !== null ? skills : null}
                </div>
            </div>
        </Fragment>
        
    )
}

ProfileSkills.propTypes = {
    updateSkills:PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth:state.auth,
    profile:state.profile.profile
});

export default connect(mapStateToProps,{updateSkills})(ProfileSkills);

