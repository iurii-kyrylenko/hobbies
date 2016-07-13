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
        res.status(200);
        res.json({ token });
    });
};

module.exports = {
    register
};
