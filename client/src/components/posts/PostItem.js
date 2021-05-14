import React,{useState} from 'react';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {likePost,unlikePost,deletePost,addComment,deleteComment} from '../../actions/post';

const PostItem = ({likePost,unlikePost,deletePost,auth,post:{_id,text,name,avatar,user,likes,unlikes,comments,date},addComment,deleteComment}) => {
    let userLiked = false;
    let userUnliked = false;
    if (auth.isAuthenticated && auth.loading === false && auth.user ){
        userLiked = likes.map(like=>like.user).includes(auth.user._id);
        userUnliked = unlikes.map(unlike=>unlike.user).includes(auth.user._id);
    }
    const [commentContent, setComment] = useState({text:''})
    const onChange = e => setComment({text:e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        addComment(_id,commentContent);
        setComment({text:''});
    }
    const [viewAllComments, setViewAllComments] = useState(false);
    const renderComments = comments.length <= 3 || viewAllComments ? comments : comments.slice(0,3) 
    return (
        <div className="postItem">
            <div className="postItem-profile">
                <div className="postItem-profileInfo">
                    <Link to={`/members/${user}/profile`} ><img src={avatar} alt="profilePic" /></Link>
                    <div>
                        <Link to={`/members/${user}/profile`} ><div className="postItem-name">{name}</div></Link>
                        <div className="postItem-time">Posted on <Moment format='YYYY/MM/DD'>{date}</Moment></div>
                    </div>
                </div>
            </div>

            <div className="postItem-post">
                <div className="postItem-post-above">
                    <p>{text}</p>
                    {auth.isAuthenticated && auth.loading === false && auth.user._id === user &&
                    <button type="button" className="btn btn-danger btn-sm py-0 deleteBtn" onClick={()=>deletePost(_id)}><i className="fas fa-times" />Delete</button>}
                </div>
                
                <div className="postItem-post-below">
                    <div>
                        <button className={`btn ${userLiked ? 'btn-outline-primary':'btn-outline-secondary'} btn-sm py-0`} onClick = {()=>{likePost(_id)}}><i className="far fa-thumbs-up"></i> {likes.length > 0 ? likes.length : null}</button>
                        {" "}
                        <button className={`btn ${userUnliked ? 'btn-outline-primary':'btn-outline-secondary'} btn-sm py-0`} onClick = {()=>unlikePost(_id)}><i className="far fa-thumbs-down"></i> {unlikes.length > 0 ? unlikes.length : null}</button>
                    </div>
                    {comments.length > 3 ? <div className="postItem-time" onClick={()=>setViewAllComments(!viewAllComments)}>View all {comments.length} comments</div> : null }
                </div>
            </div>

            {comments.length < 1 ? null :<div className="postItem-comments">
                    {renderComments.map((comment,index) =>
                        <div className="postItem-post-above"  key={index}>
                            <div className="postItem-comment">
                                <div className="postItem-comment-info"  >
                                    <div className="postItem-name">{comment.name}</div>
                                    <p>{comment.text}</p>
                                </div>
                                <div className="postItem-time"><Moment format='YYYY/MM/DD hh:mm:ss'>{comment.date}</Moment></div>
                            </div>
                            {auth.isAuthenticated && auth.loading === false && auth.user._id === comment.user &&
                            <button type="button" className="btn btn-danger btn-sm py-0 deleteBtn" onClick={()=>deleteComment(_id,comment._id)}><i className="fas fa-times" /> Delete</button>}
                        </div>)
                    }</div>
            }            
            
            {auth.isAuthenticated ? <form className="input-group mb-3 postItem-commentForm" onSubmit={e=>onSubmit(e)}>
                <input type="text" className="form-control" placeholder="Add a comment..." onChange={e=>onChange(e)} value={commentContent.text}/>
                <button className="btn btn-light btn-sm py-0" type="submit">SEND</button>
            </form> : null}
            
        </div>
    )
}


PostItem.propTypes = {
    auth:PropTypes.object.isRequired,
    likePost:PropTypes.func.isRequired,
    unlikePost:PropTypes.func.isRequired,
    deletePost:PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    auth:state.auth
})

export default connect( mapStateToProps,{likePost,unlikePost,deletePost,addComment,deleteComment})(PostItem);
