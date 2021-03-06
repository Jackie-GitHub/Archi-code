import {GET_POSTS,GET_POSTSBYUSER,POST_ERROR,UPDATE_LIKES,DELETE_POST,ADD_POST,ADD_COMMENT,REMOVE_COMMENT} from '../actions/types';
const initialState={
    posts:[],
    loading:true,
    error:{}
}

const post = (state = initialState,action) => {
    const {type,payload} = action;
    switch (type) {
        case GET_POSTS:
        case GET_POSTSBYUSER:
            return({...state,posts:payload,loading:false})
        case ADD_POST:
            return({...state,posts:[payload,...state.posts],loading:false})
        case DELETE_POST:
            return({...state,posts:state.posts.filter(post=>post._id !== payload),loading:false})
        case POST_ERROR:
            return({...state,error:payload,loading:false})
        case UPDATE_LIKES:
            return({...state,posts:state.posts.map(post=>post._id === payload.postId ? {...post,likes:payload.post.likes,unlikes:payload.post.unlikes}:post),loading:false})
        case ADD_COMMENT:
        case REMOVE_COMMENT:
            return({...state,posts:state.posts.map(post=>post._id === payload._id ? payload : post),loading:false})
        default:
            return state;
    }
};


export default post;