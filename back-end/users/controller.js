const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const register = (req, res) => {
    const user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    user.save((err) => {
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

module.exports = {
    register,
    login
};
