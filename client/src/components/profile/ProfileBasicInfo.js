import React,{useState,Fragment} from 'react';
import Modal from '../layout/Modal';
import EditProfile from './EditProfile';
import {deleteAccount} from '../../actions/profile';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

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
                    <EditProfile company={company} title={title} location={location} companyWeb={companyWeb} personalWeb={personalWeb} social={social} btnClick={()=>hideModal()} />
                </div>
            </Modal>
            <div>
                <div className="profileName">{name}</div>
                <div className="profileTitle">{title !== null ? title : null} {company !== null ? `at ${company}`: null}</div>
                <div className="profileLocation mb-3">{location}</div>
                <div className="profileWeb">{companyWeb !== null ? `Company Web: ${companyWeb} ` : null}</div>
                <div className="profileWeb">{personalWeb !== null ? `Personal Web: ${personalWeb} ` : null}</div>

                {
                    social
                    ? Object.entries(social)
                        .filter(([_, value]) => value)
                        .map(([key, value]) => (
                          <a
                            key={key}
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className={`fab fa-${key} me-2`}></i>
                          </a>
                        ))
                    : null
                }
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
