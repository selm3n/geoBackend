const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');

const Client = require('../models/Client');
var mongoose = require("mongoose");
const mongo = require('mongodb');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');


/**
 * POST /Client
 * Api add Client.
 */
exports.addClient = (req, res, next) => {
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
        

        Client.findOne({ email: req.body.email }).then(client => {
            if (client) {
                errors.email = 'Client email already exists';
                return res.status(400).json(errors);
            } else {

                const newClient = new Client({
                    type: req.body.type,
                    civilite: req.body.civilite,
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    rs: req.body.rs,
                    email: req.body.email,
                    tel_fixe: req.body.tel_fixe,
                    adresses: req.body.adresses,
                    cp: req.body.cp,
                    pays: req.body.pays,
                    ville: req.body.ville,
                    news_letter: req.body.news_letter,
                    ip: req.body.ip,
                    mot_de_pass: req.body.mot_de_pass,
                    status: req.body.status,
                    compte: req.body.compte,
                    activite: req.body.activite,
                    siren: req.body.siren,
                    tva_intra: req.body.tva_intra,
                    fonction: req.body.fonction,
                    nom_resp_achat: req.body.nom_resp_achat,
                    tel_mobile: req.body.tel_mobile,
                    interet: req.body.interet,

                    
                    //compte_active: false,

                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newClient.mot_de_pass, salt, (err, hash) => {
                        if (err) throw err;
                        newClient.mot_de_pass = hash;
                        newClient
                            .save()
                            .then(client => res.json(
                                {
                                    status: "success",
                                    message: "client successfully added",
                                    data: client
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
 * POST /Client
 * Api login Client.
 */
exports.loginClient = async function (req, res, next) {
    try {
        console.log('body ',req.body);
        const { errors, isValid } = validateLoginInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const email = req.body.email;
        const mot_de_pass = req.body.mot_de_pass;

        client = await Client.findOne({ email });
        if (!client) {
            errors.email = 'Client not found';
            return res.status(404).json(errors);
        }

        bcrypt.compare(mot_de_pass, client.mot_de_pass).then(isMatch => {
            if (isMatch) {
                const payload = { id: client.id, nom: client.nom,email: client.email };
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    //{ expiresIn: 3600 },
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
        throw new Error(err.message);
        
    }

}

/**
 * GET /Client
 * Api current Client.
 */
exports.currentClient = async function (req, res, next) {
    // console.log('req.client',req.client.nom);
    try {
        return res.json({
            id: req.user.id,
            name: req.user.nom,
            email: req.user.email
        });
               
            
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
        
    }
}

