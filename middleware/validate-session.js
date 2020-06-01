const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');


//next(); if we do not call NEXT, this request will never leave the middleware server
const validateSession = (req, res, next) => { 
    const token = req.headers.authorization;
    console.log(token)
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (!err && decodedToken) {
            User.findOne({ where: {id: decodedToken.id}})
            .then(user => {
                if (!user) throw 'err';
                req.user = user;
                return next();
            })
            .catch(err => next(err));
        } else {
            req.errors = err;
            res.status(401).send("This is a bad token")
        }
    })
};

module.exports = validateSession;