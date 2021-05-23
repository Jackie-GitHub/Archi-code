const express = require('express');
const {check,validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const Post= require('../../models/Post');

// GET api/profile
// Get all profiles
// Public
router.get('/',async(req,res) => {
    try {
        const profiles = await Profile.find().populate('user',['name','avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// Get api/profile/user/:user_id
// Get profile by user ID
// Public
router.get('/user/:user_id',async(req,res) => {
    try {
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);
        if (!profile) {
            return res.status(400).json({msg:"Profile not found"});
        };
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// GET api/profile/me
// get current user's profile
// Private
router.get('/me',auth,async(req,res) => {
    try {
        const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);
        // test populate console.log(profile)
        if (!profile) {
            return res.status(400).json({msg:'There is no profile for this user.'});
        };
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
});

// POST api/profile
// Create or update user profile
// Private
router.post('/',[auth,[
    check('location','Location is required').not().isEmpty()
]],async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({error:error.array()});
    }
    const {title,company,location,companyWeb,personalWeb,about,skills,youtube,facebook,twitter,instagram,linkedin} = req.body;
    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(title) profileFields.title = title;
    if(company) profileFields.company = company;
    if(location) profileFields.location = location;
    if(companyWeb) profileFields.companyWeb = companyWeb;
    if(personalWeb) profileFields.personalWeb = personalWeb;
    if(about) profileFields.about = about;
    if(skills) profileFields.skills = skills;
    //Build social object
    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;

    try {
        let profile = await Profile.findOne({user:req.user.id});
        if (profile) {
            profile = await Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true});
            return res.json(profile)
        }
        profile = new Profile(profileFields);
        await profile.save();
        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
} );

// POST api/profile/about
// Update about
// Private
router.post('/about',auth,async (req,res) => {
    const {about} = req.body;
    try {
        let profile = await Profile.findOne({user:req.user.id});
        profile.about = about;
        await profile.save();
        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
} );

// POST api/profile/skills
// Update about
// Private
router.post('/skills',auth,async (req,res) => {
    const {skills} = req.body;
    try {
        let profile = await Profile.findOne({user:req.user.id});
        profile.skills = skills;
        await profile.save();
        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
} );

// Put api/profile/experience
// Add profile experience
// Private

router.put('/experience',[auth,[
    check('title','Title is required').not().isEmpty(),
    check('company','Company is required').not().isEmpty(),
    check('from','From date is required').not().isEmpty()
]],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    // const {title,company,location,from,to,current,description} = req.body;
    // const newExp = {title,company,location,from,to,current,description};
    try {
        const profile = await Profile.findOne({user:req.user.id});
        profile.experience.unshift(req.body);
        await profile.save();
        res.json(profile.experience); //user is not an object, only an ID, so just return experience
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// Delete api/profile/experience
// delete experience from profile
// Private

router.delete('/experience/:exp_id',auth,async(req,res) =>{
    try{
        const profile = await Profile.findOne({user:req.user.id});
        //Get the remove index
        const removeIndex = profile.experience.map(item=>item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex,1);
        await profile.save();
        res.json(profile.experience);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// Put api/profile/education
// Add profile education
// Private

router.put('/education',[auth,[
    check('school','School is required').not().isEmpty(),
    check('degree','Degree is required').not().isEmpty(),
    check('from','From date is required').not().isEmpty()
]],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {school,degree,location,from,to,current,description} = req.body;
    const newEdu = {school,degree,location,from,to,current,description};
    try {
        const profile = await Profile.findOne({user:req.user.id});//user is not an object, only an ID, so just return education
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile.education); 
    } catch (err) {
        console.err(err.message);
        res.status(500).send('Server Error'); 
    }
})

// Delete api/profile/education
// delete education from profile
// Private

router.delete('/education/:edu_id',auth,async(req,res) => {
    try{
        const profile = await Profile.findOne({user:req.user.id});
        //Get the remove index
        const removeIndex = profile.education.map(item=>item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex,1);
        await profile.save();
        res.json(profile.education);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// Delete api/profile
// delete profile,user & posts
// Private
router.delete('/',auth,async(req,res) => {
    try {
        //Remove user posts
        //await Post.deleteMany({user:req.user.id});
        //Remove profile
        await Profile.findOneAndRemove({user:req.user.id})
        //Remove user
        await User.findOneAndRemove({_id:req.user.id});
        res.json({msg:"User deleted"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})
module.exports = router;