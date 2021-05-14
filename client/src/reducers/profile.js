import {GET_PROFILE,PROFILE_ERROR,UPDATE_PROFILE,PROFILE_ERROR2,CLEAR_PROFILE,GET_PROFILES} from '../actions/types';
const initialState = {
    profile:null,
    profiles:[],
    loading:true,
    error:{}
}

const profile = (state = initialState,action) => {
    const {type,payload} = action;
    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return({...state,profile:payload,loading:false})
        case GET_PROFILES:
            return({...state,profiles:payload,loading:false})  
        case PROFILE_ERROR:
            return({...state,error:payload,loading:false,profile:null})
        case PROFILE_ERROR2:
            return({...state,error:payload,loading:false})
        case CLEAR_PROFILE:
            return({...state,profile:null,loading:false})        
        default:
            return state;
    }
};

export default profile;