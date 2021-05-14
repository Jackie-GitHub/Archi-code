import React,{Fragment,useState} from 'react';
import PropTypes from 'prop-types';
import Modal from '../layout/Modal';
import {connect} from 'react-redux';
import {updateAbout} from '../../actions/profile';

const ProfileAbout = ({about,updateAbout,auth,profile}) => {
    const [modal, showModal] = useState({
        show:false
    });
    const [aboutContent, setAbout] = useState({about:''})
    const onChange = e => setAbout({about:e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        showModal({show:false});
        updateAbout(aboutContent);
    }
    return (
        <Fragment>
            <Modal onclick={()=>showModal({show:false})} show={modal.show}>
                <form onSubmit={e=>onSubmit(e)}>
                    <textarea
                        className="form-control"
                        type="text"
                        placeholder={about}
                        name="about"
                        value={aboutContent.about}
                        onChange={e=>onChange(e)}
                    />
                    <input type="submit" className="btn btn-outline-success btn-sm mt-3" value="Update About" />
                </form>
            </Modal>
            <div className="profileItem mb-3">
                <div className=" profileSection pb-2">
                    <div className="textBold">
                        ABOUT
                    </div>
                    {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id &&
                    <button onClick={()=>{showModal({show:true})}} type="button" className="btn btn-secondary btn-sm py-0">Edit</button>}
                </div>
                <div className="profileDiscription mt-2">{about !== null ? about : null}
                </div>
            </div>
        </Fragment>
        
    )
}

ProfileAbout.propTypes = {
    updateAbout:PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth:state.auth,
    profile:state.profile.profile
})

export default connect(mapStateToProps,{updateAbout})(ProfileAbout);

