import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addPost} from '../../actions/post';

const AddPost = ({addPost,auth}) => {
    const [postContent, setPost] = useState({text:''})
    const onChange = e => setPost({text:e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        addPost(postContent);
        setPost({text:''});
    }
    return (
        <div className="postItem addPost">
            <div className="postItem-profile">
                <div className="postItem-profileInfo">
                    <img src={auth.user.avatar} alt="profilePic" />
                    <div>
                        <div className="postItem-name">{auth.user.name}</div>
                    </div>
                </div>
            </div>
            <form className="input-group mb-3 postItem-commentForm" onSubmit={e=>onSubmit(e)}>
                <input type="text" className="form-control" placeholder="Add a post..." onChange={e=>onChange(e)} value={postContent.text}/>
                <button className="btn btn-light btn-sm py-0" type="submit" >SEND</button>
            </form>
        </div>
    )
}

AddPost.propTypes = {
    addPost:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth:state.auth
})

export default connect(mapStateToProps,{addPost})(AddPost);
