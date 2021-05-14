import React,{useEffect} from 'react'
import {getPostsByUser} from '../../actions/post';
import PostItem from './PostItem';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import {connect} from 'react-redux';

const PostByUser = ({post:{posts,loading},getPostsByUser,userId})=> {
    useEffect(()=>{
        getPostsByUser(userId);
    },[getPostsByUser]);
    return (
        loading ? <Spinner /> : <div>
            {posts.length === 0 ? <div>No post from this member.</div> :posts.map((postItem,index) => <PostItem key={index} post={postItem}/>)}
        </div>
    )
}

PostByUser.propTypes = {
    getPostsByUser:PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    post:state.post
});

export default connect(mapStateToProps,{getPostsByUser})(PostByUser);
