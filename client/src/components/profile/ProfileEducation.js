import React, { Fragment,useState } from 'react';
import ProfileEducationItem from './ProfileEducationItem';
import Modal from '../layout/Modal';
import {connect} from 'react-redux';

const ProfileEducation = ({action,edus,auth,profile}) => {
    const [modal, showModal] = useState({
        show:false
    });
    const [formData, setFormData] = useState({
        school:'',
        degree:'',
        location:'',
        from:'',
        current:false,
        to:'',
        description:''
    })
    const [toDateDisabled, toggleDisabled] = useState(false);
    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        showModal({show:false});
        action(formData);
        setFormData({
            school:'',
            degree:'',
            location:'',
            from:'',
            current:false,
            to:'',
            description:''
        })
        toggleDisabled(false)
    }
    return (
        <Fragment>
             <Modal onclick={()=>showModal({show:false})} show={modal.show}>
                <form onSubmit={e=>onSubmit(e)}>
                    <div className="textBold mb-3">
                        Add An Education
                        <small style={{color:'grey',fontWeight:'300'}} >  (* = required)</small>
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-control"
                            type="text"
                            placeholder='*School'
                            name="school"
                            value={formData.school}
                            onChange={e=>onChange(e)}
                            autoComplete="off"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-control"
                            type="text"
                            placeholder='*Degree'
                            name="degree"
                            value={formData.degree}
                            onChange={e=>onChange(e)}
                            autoComplete="off"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-control"
                            type="text"
                            placeholder='*Location'
                            name="location"
                            value={formData.location}
                            onChange={e=>onChange(e)}
                            autoComplete="off"
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">From:</span>
                        <input
                            className="form-control"
                            type="date"
                            placeholder='*From Date'
                            name="from"
                            value={formData.from}
                            onChange={e=>onChange(e)}
                            autoComplete="off"
                        />
                    </div>
                    <div className="mb-3">
                        Current:{" "}
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="current"
                            checked={formData.current}
                            value={formData.current}
                            onChange={e=>{
                                setFormData({...formData,current:!formData.current});
                                toggleDisabled(!toDateDisabled)
                            }}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">To:</span>
                        <input
                            className="form-control"
                            type="date"
                            placeholder="To Date"
                            name="to"
                            value={formData.to}
                            onChange={e=>onChange(e)}
                            disabled={toDateDisabled?'disabled':''}
                        />
                    </div>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            type="text"
                            placeholder="description"
                            name="description"
                            value={formData.description}
                            onChange={e=>onChange(e)}
                        />
                    </div>
                    <input type="submit" className="btn btn-outline-success btn-sm mt-3" value="Add Education" />
                </form>
            </Modal>
            <div className="profileItem mb-3">
                <div className=" profileSection pb-2">
                    <div className="textBold">
                        EDUCATION
                    </div>
                    {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && <button type="button" onClick={()=>showModal({show:true})} className="btn btn-secondary btn-sm py-0" >Add</button>}
                </div>
                <div>
                    {edus.map((edu,index) => <ProfileEducationItem key={index} edu={edu}/>)}
                </div>
            </div>
        </Fragment>
    )
};

const mapStateToProps = (state) => ({
    auth:state.auth,
    profile:state.profile.profile
});

export default connect(mapStateToProps,{})(ProfileEducation);
