import {GET_PROFILE,PROFILE_ERROR,PROFILE_ERROR2,UPDATE_PROFILE,CLEAR_PROFILE,ACCOUNT_DELETED,GET_PROFILES,UPDATE_EXPERIENCE,UPDATE_EDUCATION} from './types';
import {setAlert} from './alert';
import axios from 'axios';

//Get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({type:CLEAR_PROFILE})
    try {
        const res = await axios.get('/api/profile');
        dispatch({
            type:GET_PROFILES,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}

//Get profile by ID
export const getProfileById = (user_id) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${user_id}`);
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}

//Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}

//Create or update profile
export const createProfile = (formData,history,edit = false) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await axios.post('/api/profile',formData,config);
        dispatch({type:GET_PROFILE,payload:res.data});
        dispatch(setAlert(edit?'Profile Updated':'Profile Created','success'))
        if (!edit) {
            history.push('/profile');//???
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({type:PROFILE_ERROR,payload:{msg:err.response.statusText,status:err.response.status}});
    }
}

//update about
export const updateAbout = (about) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await axios.post('/api/profile/about',about,config);
        dispatch({type:UPDATE_PROFILE,payload:res.data});
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({type:PROFILE_ERROR,payload:{msg:err.response.statusText,status:err.response.status}});
    }
}

//update skills
export const updateSkills= (skills) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await axios.post('/api/profile/skills',skills,config);
        dispatch({type:UPDATE_PROFILE,payload:res.data});
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({type:PROFILE_ERROR,payload:{msg:err.response.statusText,status:err.response.status}});
    }
}

//Add Experience
export const addExperience = (formData, history) => async dispatch => {
    try{
        const config = {
            header:{
                'Content-Type':'application/json'
            }
        }
        //get experience
        const res = await axios.put('/api/profile/experience',formData,config)
        dispatch({
            type:UPDATE_EXPERIENCE,
            payload:res.data
        })
    }catch(err){
        const errors = err.response.data.errors;
        if (errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type:PROFILE_ERROR2,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}   

//Delete Experience
export const deleteExperience = (exp_id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${exp_id}`);
        dispatch({type:UPDATE_EXPERIENCE,payload:res.data});
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR2,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
   
}

//Add Education
export const addEducation = (formData, history) => async dispatch => {
    try{
        const config = {
            header:{
                'Content-Type':'application/json'
            }
        }
        const res = await axios.put('/api/profile/education',formData,config)
        dispatch({
            type:UPDATE_EDUCATION,
            payload:res.data
        })
    }catch(err){
        const errors = err.response.data.errors;
        if (errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type:PROFILE_ERROR2,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}   

//Delete Education
export const deleteEducation = (edu_id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${edu_id}`);
        dispatch({type:UPDATE_EDUCATION,payload:res.data});
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR2,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
   
}

//Delete Account and Profile
export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone!')){
        try {
            await axios.delete('/api/profile');
            dispatch({type:CLEAR_PROFILE});
            dispatch({type:ACCOUNT_DELETED});
            dispatch(setAlert('Your account has been permanently deleted'));
        } catch (err) {
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg:err.response.statusText,status:err.response.status}
            })
        }
    }
}

