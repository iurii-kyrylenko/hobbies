const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const request = require('request');

const validateCaptchaResponse = (req, res, next) => {
    const postData = {
        response: req.body.captchaResponse,
        secret: process.env.CAPTCHA_SECRET
    };

    const options = {
        method: 'post',
        form: postData,
        url: process.env.CAPTCHA_API
    };

    request(options, (err, _, body) => {
        if(err) {
            res.sendStatus(400);
            return;
        }
        const success = JSON.parse(body).success;
        if(!success) {
            console.log('validateCaptcha:', body);
            res.sendStatus(403);
            return;
        }
        next();
    });
};

const register = (req, res) => {
    const user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    user.save((err) => {
        // Validations error
        if (err) {
            res.status(400).json(err);
            return;
        }

        const token = user.generateJwt();
        res.status(200).json({ token });
    });
};

const login = (req, res) => {
    const authFn = passport.authenticate('local', (err, user, info) => {
        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if(user) {
            const token = user.generateJwt();
            res.status(200).json({ token });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    });
    authFn(req, res);
};

// Use this middleware after authorization. It addresses following use cases:
// User is deleted after login.
// Or valid JWT for deleted user is used for authorization.
const checkUser = (req, res, next) => {
    User.findById(req.user._id, (err, user) => {
        if(err) {
            res.sendStatus(400);
            return;
        }
        if(!user) {
            res.sendStatus(401);
            return;
        }
        next();
    });
};

module.exports = {
    validateCaptchaResponse,
    register,
    login,
    checkUser
};
