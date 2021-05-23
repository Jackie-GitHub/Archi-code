import React,{useState,Fragment} from 'react';
import Modal from '../layout/Modal';
import EditProfile from './EditProfile';
import {deleteAccount} from '../../actions/profile';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ProfileBasicInfoContent from './ProfileBasicInfoContent';

const ProfileBasicInfo = ({name,email,title,company,location,companyWeb,personalWeb,social,deleteAccount,auth,profile})=> {
    const [modal, showModal] = useState({
        show:false
    });
    const hideModal = () => {
        showModal({show:false})
    }
    return (
        <Fragment>
            <Modal onclick={()=>hideModal()} show={modal.show}>
                <div>
                    <EditProfile company={company} title={title} loc={location} companyWeb={companyWeb} personalWeb={personalWeb} social={social} btnClick={()=>hideModal()} />
                </div>
            </Modal>
            <div>
                <ProfileBasicInfoContent name={name} company={company} title={title} loc={location} companyWeb = {companyWeb} personalWeb={personalWeb} social={social} />
                {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id &&
                    <Fragment>
                    <div>
                        <button onClick={()=>{showModal({show:true})}} type="button" className="btn btn-secondary btn-sm py-0 mt-3">Edit Profile</button>
                    </div>
                    <div>
                        <button onClick={()=>{deleteAccount()}} type="button" className="btn btn-danger btn-sm py-0 mt-3"><i className="fas fa-times"/>  Detele Account</button>
                    </div>
                    </Fragment>
                }                
            </div>
        </Fragment>
        
    )
}

ProfileBasicInfo.propTypes = {
    deleteAccount:PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth:state.auth,
    profile:state.profile.profile
})

export default connect(mapStateToProps,{deleteAccount})(ProfileBasicInfo);
