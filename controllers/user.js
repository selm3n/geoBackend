

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');

const User = require('../models/User');
var mongoose = require("mongoose");
const mongo = require('mongodb');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');


/**
 * POST /User
 * Api add User.
 */
exports.addUser = (req, res, next) => {
    try {
        
        // if(!req.body){
        //     return res.status(400).json({
        //         status: 400,
        //         error: "no req body"
        //       }); 
        // }
        const { errors, isValid } = validateRegisterInput(req.body);

        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                errors.email = 'Email already exists';
                return res.status(400).json(errors);
            } else {
                //   const avatar = gravatar.url(req.body.email, {
                //     s: '200', // Size
                //     r: 'pg', // Rating
                //     d: 'mm' // Default
                //   });

                const newUser = new User({
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    email: req.body.email,
                    mot_de_pass: req.body.motDePasse,
                    numero_telephone: req.body.numeroTelephone,
                    compte_active: false,

                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.mot_de_pass, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.mot_de_pass = hash;
                        newUser
                            .save()
                            .then(user => res.json(
                                {
                                    status: "success",
                                    message: "user successfully added",
                                    data: user
                                }
                            ))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
        // return res.status(400).json({
        //   status: "error",
        //   messsage: err.message,

        // });
    }
}

/**
 * POST /User
 * Api login User.
 */
exports.loginUser = async function (req, res, next) {
    try {
        const { errors, isValid } = validateLoginInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const email = req.body.email;
        const mot_de_pass = req.body.mot_de_passe;

        user = await User.findOne({ email });
        if (!user) {
            errors.email = 'User not found';
            return res.status(404).json(errors);
        }

        bcrypt.compare(mot_de_pass, user.mot_de_pass).then(isMatch => {
            if (isMatch) {
                const payload = { id: user.id, nom: user.nom,email: user.email };
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                );
            } else {
                errors.mot_de_passe = 'mot_de_passe incorrect';
                return res.status(400).json(errors);
            }
        });

    } catch (err) {
        console.log(err);
        //throw new Error(err.message);
        // return res.status(400).json({
        //   status: "error",
        //   messsage: err.message,

        // });
    }

}

/**
 * GET /User
 * Api current User.
 */
exports.currentUser = async function (req, res, next) {
    try {
        return res.json({
            id: req.user.id,
            name: req.user.nom,
            email: req.user.email
        });
               
            
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
        // return res.status(400).json({
        //   status: "error",
        //   messsage: err.message,

        // });
    }
}
// router.get(
//   '/current',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     res.json({
//       id: req.user.id,
//       name: req.user.name,
//       email: req.user.email
//     });
//   }
// );

// module.exports = router;