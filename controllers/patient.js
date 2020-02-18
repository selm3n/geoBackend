

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');

const Patient = require('../models/Patient');
var mongoose = require("mongoose");
const mongo = require('mongodb');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');


/**
 * POST /Patient
 * Api add Patient.
 */
exports.addPatient = (req, res, next) => {
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

        Patient.findOne({ email: req.body.email }).then(patient => {
            if (patient) {
                errors.email = 'Email already exists';
                return res.status(400).json(errors);
            } else {
                //   const avatar = gravatar.url(req.body.email, {
                //     s: '200', // Size
                //     r: 'pg', // Rating
                //     d: 'mm' // Default
                //   });

                const newPatient = new Patient({
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    email: req.body.email,
                    mot_de_pass: req.body.motDePasse,
                    numero_telephone: req.body.numeroTelephone,
                    compte_active: false,

                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newPatient.mot_de_pass, salt, (err, hash) => {
                        if (err) throw err;
                        newPatient.mot_de_pass = hash;
                        newPatient
                            .save()
                            .then(patient => res.json(
                                {
                                    status: "success",
                                    message: "ShopMap successfully added",
                                    data: patient
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
 * POST /Patient
 * Api login Patient.
 */
exports.loginPatient = async function (req, res, next) {
    try {
        const { errors, isValid } = validateLoginInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const email = req.body.email;
        const mot_de_pass = req.body.mot_de_passe;

        patient = await Patient.findOne({ email });
        if (!patient) {
            errors.email = 'Patient not found';
            return res.status(404).json(errors);
        }

        bcrypt.compare(mot_de_pass, patient.mot_de_pass).then(isMatch => {
            if (isMatch) {
                const payload = { id: patient.id, nom: patient.nom,email: patient.email };
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
 * GET /Patient
 * Api current Patient.
 */
exports.currentPatient = async function (req, res, next) {
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
//       id: req.patient.id,
//       name: req.patient.name,
//       email: req.patient.email
//     });
//   }
// );

// module.exports = router;
