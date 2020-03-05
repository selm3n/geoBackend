const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');

const Publication = require('../models/Publication');
var mongoose = require("mongoose");
const mongo = require('mongodb');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const multer = require('../config/multer');


/**
 * POST /Publication
 * Api add Publication.
 */
exports.addPublication = (req, res, next) => {
    try {

        if(!req.body || Object.keys(req.body).length == 0 ){
            return res.status(400).json({
                status: 400,
                error: "no req body"
              }); 
        }
        
        var imgs=[]; 

        for(let i =0; i<req.files.length; i++){
            imgs[i]=`${process.env.REACT_APP_MEDIA_PATH}/${req.files[i].filename}`
        // console.log('imgs '+req.files[i].filename);
        }

        const newPublication = new Publication({
            titre: req.body.titre,
            prix: req.body.prix,
            gouvernorat: req.body.gouvernorat,
            departement: req.body.departement,
            type: req.body.type,
            user: req.body.user,
            images: imgs,

        });




        newPublication.save()
            .then(publication => res.json(
                {
                    status: "success",
                    message: "Publication successfully added",
                    data: publication
                }
            ))
    
} catch (err) {
    console.log(err);
    throw new Error(err.message);
    
}
}

exports.allPublications = (req, res, next) => {
    try {
        //const errors = {};

        Publication.find()
            .populate('user')
            .then(publications => {
                if (!publications) {
                    errors.noprofile = 'There are no publications';
                    return res.status(404).json(errors);
                }

                res.json(publications);
            })
            //.catch(err => res.status(404).json({ profile: 'There are no publications' }));
    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}
