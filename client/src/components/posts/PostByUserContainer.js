import React from 'react';
import PostByUser from './PostByUser';

const PostByUserContainer = ({userId}) => {
    return (
        <div className="container majorPage">
            <PostByUser userId={userId}/>
        </div>
    )
}

export default PostByUserContainer;
