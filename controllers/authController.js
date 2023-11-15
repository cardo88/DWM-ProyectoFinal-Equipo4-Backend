const jwt = require('jsonwebtoken')
const User = require('../models/User')
const catchAsync = require('./../utils/catchAsync')

const signToken = id =>{
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

exports.signup = catchAsync(async(req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'exitoso',
        token,
        data: {
            user: newUser
        }
    });
});

exports.login = catchAsync(async(req, res, next) => {
    const {email, password} = req.body;

    //1.check if email and password exists
    if(!email || !password){
        return res
        .status(400)
        .json({ message: "Fallo de autenticación, ingresa email y contraseña" });
    }
    

    //2.check if user exists and password is correct
    const user = await User.findOne({email}).select('+password');

    if(!user || !await user.correctPassword(password, user.password) ){
        return res
        .status(401)
        .json({ message: "Email y/o contraseña incorrecta" });
    }

    //3.if everythink is ok, send token to client
    const token = signToken(user._id);

    res.status(200).json({
        status: "éxito",
        token
    })
});