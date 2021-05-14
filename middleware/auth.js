const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

module.exports =async function(req,res,next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({msg:'No token, authorization denied'});
    }
    try {
        const decoded = jwt.verify(token,config.get('jwtSecret'));
        const user = await User.findById(decoded.user.id);
        if (!user) {
            return res.status(401).json({msg:"Token is not valid"});
        }
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({msg:'Token is not valid'})
    }
}