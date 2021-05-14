const express = require('express');
const {check,validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { route } = require('./profile');

//Post api/posts
//Create a post
//Private

router.post('/',[auth,
    check('text','Text is required').not().isEmpty()
],async(req,res) => {
    const error = validationResult(req);
    if (!error.isEmpty){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const newPost = new Post({
            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:req.user.id
        })
        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//Get api/posts
//Get all posts
//Public
router.get('/',async(req,res) => {
    try {
        const posts = await Post.find().sort({date:-1});
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// //Get api/posts/:id
// //Get post by ID
// // public
// router.get('/:id',async(req,res) => {
//     try {
//         const post = await Post.findById(req.params.id);
//         if (!post) {
//             return res.status(404).json({msg:'Post not found'})
//         }
//         res.json(post);
//     } catch (err) {
//         console.error(err.message);
//         if(err.kind === 'ObjectId'){ //is not a formated objectId
//             console.log(err)
//             return res.status(404).json({msg:'Post not found!'})
//         }
//         res.status(500).send('Server.error');
//     }
// });

//Get api/posts/:userId
//Get post by userID
// public
router.get('/:userId',async(req,res) => {
    try {
        const posts = await Post.find({user:req.params.userId});
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){ //is not a formated objectId
            console.log(err)
            return res.status(404).json({msg:'Post not found!'})
        }
        res.status(500).send('Server.error');
    }
});

//Delete api/posts/:id
//Delete post by ID
//private
router.delete('/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({msg:'Post not found'})
        }
        if (post.user.toString() !== req.user.id){
            return res.status(401).json({msg:'User not authorized'});
        }
        await post.remove();
        return res.json({msg:'Post removed'})
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){ 
            console.log(err)
            return res.status(404).json({msg:'Post not found!'})
        }
        res.status(500).send('Server error');
    }
})

//Like api/posts/like/:id
//Like a post
//private
router.put('/like/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({msg:'Post not found'})
        }
        //check if the post has already been liked
        if (post.likes.filter(like=>like.user.toString()===req.user.id).length > 0){
            //remove from likes
            const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
            post.likes.splice(removeIndex,1);
        }
        //check if the post has been unliked
        else if (post.unlikes.filter(unlike => unlike.user.toString() === req.user.id).length > 0) {
            //remove from unlikes
            const removeIndex = post.unlikes.map(unlike => unlike.user.toString()).indexOf(req.user.id);
            post.unlikes.splice(removeIndex,1);
            //add to likes
            post.likes.unshift({user:req.user.id});
        } else {
            //add to likes
            post.likes.unshift({user:req.user.id});
        }
        await post.save();
        return res.json(post)
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){ 
            console.log(err)
            return res.status(404).json({msg:'Post not found!'})
        }
        res.status(500).send('Server error');
    }
})

//Unlike api/posts/unlike/:id
//Unlike a post
//private
router.put('/unlike/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({msg:'Post not found'})
        }
        //check if the post has already been unliked
        if (post.unlikes.filter(unlike=>unlike.user.toString()===req.user.id).length > 0){
            //remove from unlikes
            const removeIndex = post.unlikes.map(unlike => unlike.user.toString()).indexOf(req.user.id);
            post.unlikes.splice(removeIndex,1);
        }
        //check if the post has been liked
        else if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            //remove from likes
            const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
            post.likes.splice(removeIndex,1);
            //add to unlikes
            post.unlikes.unshift({user:req.user.id});
        } else {
            //add to unlikes
            post.unlikes.unshift({user:req.user.id});
        }
        await post.save();
        return res.json(post)
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){ 
            console.log(err)
            return res.status(404).json({msg:'Post not found!'})
        }
        res.status(500).send('Server error');
    }
})

//Post api/posts/comment/:id
//Comment on a post
//Private
router.post('/comment/:id',[auth,
    check('text','Text is required').not().isEmpty()
],async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({msg:'Post not found'})
        }
        const newComment = {text:req.body.text,name:user.name,avatar:user.avatar,user:req.user.id}
        post.comments.unshift(newComment);
        await post.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){ //is not a formated objectId
            console.log(err)
            return res.status(404).json({msg:'Post not found!'})
        }
        res.status(500).send('Server.error');
    }
});

//Delete api/posts/comment/:post_id/:comment_id
//Delete a comment
//private
router.delete('/comment/:post_id/:comment_id',auth,async(req,res)=>{
    try {
        //find the post
        const post = await Post.findById(req.params.post_id);
        if (!post) {
            return res.status(404).json({msg:'Post not found'})
        };
        //find comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);
        if (!comment){
            return res.status(404).json({msg:'Comment not found'})
        }
        //check auth
        if (comment.user.toString() !== req.user.id){
            return res.status(401).json({msg:'User not authorized'})
        }
        //remove comment
        post.comments = post.comments.filter(({id}) => id !== req.params.comment_id)
        await post.save()
        return res.json(post)
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){ 
            console.log(err)
            return res.status(404).json({msg:'Post not found!'})
        }
        res.status(500).send('Server error');
    }
})

router.get('/',(req,res) => res.send('Posts route'));
module.exports = router;
