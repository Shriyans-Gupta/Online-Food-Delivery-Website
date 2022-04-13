import asyncHandler from "express-async-handler";
import User from '../models/userModel.js';
import generateToken from "../utils/generateWebtoken.js";

//@desc Auth user and get token
//@route POST /api/users/login
//@access public

const authUser = asyncHandler(async(req, res) => {
    const {email , password}   = req.body;

    const user = await User.findOne({email});

    if(user &&  (await user.matchPassword(password))){
         
        res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
            token : generateToken(user._id)
        });
    }else{
        res.status(401);
        throw new Error('Invalid username or password')
    }
});

//@desc Register a user
//@route POST /api/users
//@access public

const registerUser = asyncHandler(async(req, res) => {

    const userExists = await User.findOne({email : req.body.email});

    if(userExists){
        res.status(401);
        throw new Error("User already exists");
    }

    const user = await new User(req.body).save();
     
    if(user){
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
            token : generateToken(user._id)
        })
      
    }else{
        res.status(401);
        throw new Error('Invalid user data');
    }
});

//@desc Get user profile
//@route GET /api/users/profile
//@access private

const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
         res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin
         });
    }else{
        res.status(401);
        throw new Error('User not Found');
    }

    // res.send('Success');

});

//@desc Update user profile
//@route PUT /api/users/profile
//@access private

const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save();

        res.json({
            _id : updatedUser._id,
            name : updatedUser.name,
            email : updatedUser.email,
            isAdmin : updatedUser.isAdmin,
            token : generateToken(updatedUser._id)
        });
    }else{
        res.status(401);
        throw new Error('User not Found');
    }

    // res.send('Success');

});

//@desc Get all user list
//@route GET /api/users
//@access private/admin

const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find({});
     res.json(users);
    // res.send('Success');
});

//@desc delete user by id
//@route delete /api/users/:id
//@access private/admin

const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if(user){
           user.remove();
           res.json({  message : 'User Successfully Deleted'})
    }else{
        res.status(401);
        throw new Error('User Not Found');
    }
});

//@desc Get user by id
//@route GET /api/users/:id
//@access private/admin

const getUserById = asyncHandler(async(req, res) => {
    const user= await User.findById(req.params.id).select('-password');
    if(user){
       res.json(user);
    }else{
        res.status(401);
        throw new Error('User Not Found');
    }
    
    // res.send('Success');
});

//@desc Update user profile
//@route PUT /api/users/:id
//@access private/admin

const updateUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin ?? user.isAdmin
        const updatedUser = await user.save();

        res.json({
            _id : updatedUser._id,
            name : updatedUser.name,
            email : updatedUser.email,
            isAdmin : updatedUser.isAdmin,
        });
    }else{
        res.status(401);
        throw new Error('User not Found');
    }

    // res.send('Success');

});

export {authUser , getUserProfile , registerUser , updateUserProfile , getUsers , deleteUser,
getUserById , updateUser} ;