const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');

const Marque = require('../models/marque');
const Moteur = require('../models/moteur');
const Historique = require("../models/historique");
var mongoose = require("mongoose");
const mongo = require('mongodb');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const fs = require('fs');

const multer = require('../config/multer');


/**
 * POST /Marque
 * Api add Marque.
 */
exports.addMarque = (req, res, next) => {
    try {

        if (!req.body || Object.keys(req.body).length == 0) {
            return res.status(400).json({
                status: 400,
                error: "no req body"
            });
        }

        const newMarque = new Marque({
            nom: req.body.nom,
           
        });
        if(req.files.image && req.files.image[0]){
            newMarque.image= `${process.env.REACT_APP_MEDIA_PATH}/${req.files.image[0].filename}`;
        }

        newMarque.save()
            .then(marque => res.json(
                {
                    success: true,
                    message: "Marque successfully added",
                    data: marque
                }
            ))

    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.allMarques = (req, res, next) => {
    try {
        //const errors = {};

        Marque.find()
        //.lean()
            //.populate('user')
            .then(marques => {
                if (!marques) {
                    errors.noprofile = 'There are no marques';
                    return res.status(404).json(errors);
                }
                
                res.json(marques);
            })
        
    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.deleteMarque = (req, res, next) => {
    try {
        var id = req.params.id;
        Marque.findOne({ _id: new mongo.ObjectId(id) })
            .then(marque => {
                if (!marque) {
                    errors.noprofile = 'Marque does not exist';
                    return res.status(404).json(errors);
                }
                if(marque.image){
                    let img = marque.image.split("/uploads").pop();
                fs.unlink('uploads'+img, (err) => {
                    if (err) throw err;
                })          
                }
                marque.remove().then(() => res.json({ success: true, message: "Marque deleted successfully" }));
            })
    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.updateMarque = async (req, res, next) => {
    try {
        const id = req.body.id;
        const marqueFields = {};
      
        if (req.body.nom) marqueFields.nom = req.body.nom;
        if (req.files.image && req.files.image[0]) {
            marqueFields.image = `${process.env.REACT_APP_MEDIA_PATH}/${req.files.image[0].filename}`;
            await Marque.findOne(
                {
                    _id: new mongo.ObjectId(id),
                }
            ).exec(function (err, marque) {
                if(marque.image){
                    let img = marque.image.split("/uploads").pop();
                // marque.image=null;
                // console.log('img: ',img);
                fs.unlink('uploads'+img, (err) => {
                    if (err) throw err;
                })
                // marque.save();
                if (err) {
                    console.log(err);
                    throw new Error(err.message);
                }
                }
                
            });
        }
        await Marque.findOneAndUpdate({ _id: new mongo.ObjectId(id) },marqueFields)
        .then(marque => res.json({ success: true, message: "Marque updated successfully" }));
    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}
