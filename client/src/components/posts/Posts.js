import React,{useEffect} from 'react';
import PostItem from './PostItem';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import {getPosts} from '../../actions/post';

const Posts = ({post:{posts,loading},getPosts}) => {
    useEffect(()=>{
        getPosts();
    },[getPosts]);
    return (
        loading ? <Spinner /> : <div>
            {posts.map((postItem,index) => <PostItem key={index} post={postItem}/>)}
        </div>
    )
}

Posts.propTypes = {
    getPosts:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    post:state.post
})

export default connect(mapStateToProps,{getPosts})(Posts);
