const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET }  = require('../config');
const passport = require('passport');

/**
 * @DESC To register the user (ADMIN, SUPER_ADMIN, USER)
 */
const userRegister = async (userDetails, role, res) => {
    try {
        //Validate the username 
        let usernameNotTaken = await(validateUsername(userDetails.username));
        if(!usernameNotTaken){
            return res.status(400).json({
                message: 'Username is already taken',
                success: false
            })
        }
        //Validate the email
        let emailNotRegistered = await(validateEmail(userDetails.email));
        if(!emailNotRegistered){
            return res.status(400).json({
                message: 'Email is already registered',
                success: false
            })
        }

        //Get the hashed password
        const hashedPassword = await bcrypt.hash(userDetails.password, 12);
        //Create a new User
        const newUser = new User({
            ...userDetails,
            password: hashedPassword,
            role
        });
        await newUser.save();
        return res.status(201).json({
            message: "You are now successfully Registered. Please now login.",
            success: true
        })
    } catch (err) {
        //Implement logger function(winston)
        res.status(500).json({
            message: "Unable to create your account.",
            success: false
        })
    }
};

/**
 * @DESC To login the user (ADMIN, SUPER_ADMIN, USER)
 */
const userLogin = async (userCredentials, role, res) => {
    let { username, password } = userCredentials;
    //First Check if the Username is in the Database
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).json({
            message: 'Username is already taken',
            success: false
        })
    }
    //We will Check the Role
    if(user.role !== role){
        return res.status(403).json({
            message: 'Please make sure you\'re logging in from the right portal.',
            success: false
        });
    }
    //User is now valid & trying to sign in from the right portal
    //Now Check for the password
    let isMatch = await bcrypt.compare(password, user.password);
    if(isMatch){
        //Sign in the Token & issue it to the user
        let token = jwt.sign({
            user_id: user._id,
            role: user.role,
            username: user.username,
            email: user.email
        }, SECRET, { expiresIn: "7 days" });
        let result = {
            username: user.username,
            role: user.role,
            email: user.email,
            token: `Bearer ${token}`,
            expiresIn: 168
        };

        return res.status(200).json({
            ...result,
            message: 'You are now logged in.',
            success: true
        });

    } else {
        return res.status(403).json({
            message: 'Incorrect Password',
            success: false
        })
    }
}

const validateUsername = async (username) => {
    let user = await User.findOne({ username });
    return user ? false : true;
};

/**
 * @DESC Passport middleware
 */

 const userAuth = passport.authenticate('jwt', {session: false});

 /**
  * 
  * @DESC Check the Role Middleware
  */

  const checkRole = roles => (req, res, next) => !roles.includes(req.user.role) ? res.status(401).json("Unauthorized") : next();

const validateEmail = async (email) => {
    let user = await User.findOne({ email });
    return user ? false : true;
};

const serializeUser = user => {
    return {
        username: user.username,
        email: user.email,
        name: user.name,
        _id: user._id,
        updatedAt: user._id,
        createdAt: user.createdAt
    }
}

module.exports = {
    checkRole,
    userAuth,
    userRegister,
    userLogin,
    serializeUser
};