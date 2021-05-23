import {GET_POSTS,GET_POSTSBYUSER,POST_ERROR,UPDATE_LIKES,DELETE_POST,ADD_POST,ADD_COMMENT,REMOVE_COMMENT} from './types';
//import {setAlert} from './alert';
import axios from 'axios';

//Get all posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');
        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}

//Get posts by user
export const getPostsByUser = (userId) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${userId}`);
        dispatch({
            type:GET_POSTSBYUSER,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}

//Like a post
export const likePost = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${postId}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{postId,post:res.data}
        })
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}

//unLike a post
export const unlikePost = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{postId,post:res.data}
        })
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
};

//Delete a post
export const deletePost = postId => async dispatch => {
    try {
        await axios.delete(`/api/posts/${postId}`);
        dispatch({
            type:DELETE_POST,
            payload:postId
        })
    } catch (err) {
         dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}

//Add a post
export const addPost = (formData) => async dispatch => {
    try {
        const res = await axios.post('/api/posts',formData);
        dispatch({
            type:ADD_POST,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}

//Add comment
export const addComment = (postId, formData) => async dispatch =>{
    try {
        const res = await axios.post(`/api/posts/comment/${postId}`,formData);
        dispatch({
            type:ADD_COMMENT,
            payload:res.data
        })

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}

//Delete comment
export const deleteComment = (postId,commentId) => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        dispatch({
            type:REMOVE_COMMENT,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}