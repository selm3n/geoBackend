const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');

const Engin = require('../models/engin');
const Moteur = require('../models/moteur');
const Historique = require("../models/historique");
var mongoose = require("mongoose");
const mongo = require('mongodb');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const fs = require('fs');

const multer = require('../config/multer');


/**
 * POST /Engin
 * Api add Engin.
 */
exports.addEngin = (req, res, next) => {
    try {

        if (!req.body || Object.keys(req.body).length == 0) {
            return res.status(400).json({
                status: 400,
                error: "no req body"
            });
        }

        const newEngin = new Engin({
            marque: req.body.marque,
            type: req.body.type,
            model: req.body.model,
            num_serie: req.body.num_serie,
            immatriculation: req.body.immatriculation,
            num_parq: req.body.num_parq,
            client: req.user.id,
            moteur: null

        });

        newEngin.save()
            .then(engin => res.json(
                {
                    success: true,
                    message: "Engin successfully added",
                    data: engin
                }
            ))

    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.allClientEngins = (req, res, next) => {
    try {
        // new mongo.ObjectId(req.params.clientId)
         console.log('req.user.id',req.user.id);
        Engin.find(
            { client: req.user.id }
        )
        // .lean()
            .populate('client')
            .then(engins => {
                if (!engins) {
                    errors.noprofile = 'There are no engins';
                    return res.status(404).json(errors);
                }
                
                // var eng = [];
                // //console.log('req.params.offset',8 +req.params.offset);
                // for (j = parseInt(req.params.offset); j < 9 + parseInt(req.params.offset); j++) {
                //     if (j < engins.length)
                //         eng.push( engins[j]);
                // }
                //console.log('eng.length',eng.length);
                res.json(engins);
            })
        //.catch(err => res.status(404).json({ profile: 'There are no engins' }));
    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.getEngin = (req, res, next) => {
    try {

        var id = req.params.id;
        Engin.findOne({ _id: new mongo.ObjectId(id) })
        .populate('client')
            .then(engin => {
                if (!engin) {
                    errors.noprofile = 'Engin does not exist';
                    return res.status(404).json(errors);
                }

                res.json({ success: true, data: engin });
            })

    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.deleteEngin = async (req, res, next) => {
    try {

        var id = req.params.id;
        let engin = await Engin.findOne({ _id: new mongo.ObjectId(id) }).exec();
        let moteur = engin.moteur;
        await engin.remove();    
        await Moteur.findOneAndUpdate(
            {
                _id: new mongo.ObjectId(moteur),
            },{
                engin:null
            }
        ).exec();       
        return res.json({ success: true, message: "Engin deleted successfully" });
            
    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.updateEngin = async (req, res, next) => {
    try {
        const id = req.body.id;
        const enginFields = {};

        if (req.body.marque) enginFields.marque = req.body.marque;
        if (req.body.type) enginFields.type = req.body.type;
        if (req.body.model) enginFields.model = req.body.model;
        if (req.body.num_serie) enginFields.num_serie = req.body.num_serie;
        if (req.body.immatriculation) enginFields.immatriculation = req.body.immatriculation;
        if (req.body.num_parq) enginFields.num_parq = req.body.num_parq;
        if (req.body.client) enginFields.client = req.body.client;
       

        await Engin.findOneAndUpdate({ _id: new mongo.ObjectId(id) },enginFields)
        .then(engin => res.json({ success: true, message: "Engin updated successfully" }));
            

    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.freeEngins = (req, res, next) => {
    try {
        // new mongo.ObjectId(req.params.clientId)
         console.log('req.user.id',req.user.id);
        Engin.find(
            { client: req.user.id ,
                moteur: null
            }
        )
            .then(engins => {
                if (!engins) {
                    errors.noprofile = 'There are no engins';
                    return res.status(404).json(errors);
                }
                res.json(engins);
            })
    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.freeMoteurEngins = async (req, res, next) => {
    try {
        let moteurid = null;
        var engins;
        if (req.params.moteurid && req.params.moteurid != 'undefined') {
            moteurid = req.params.moteurid;
            engins = await Engin.find(
                {
                    $and: [
                        {
                            $or: [
                                { moteur: moteurid },
                                { moteur: null }
                            ]
                        },
                        {
                            $or: [
                                { client: req.user.id },
                            ]
                        }
                    ]
                }
            ).exec();
        } else {
            engins = await Engin.find(
                {
                    client: req.user.id,
                    moteur: moteurid
                }
            ).exec();
        }
        if (!engins) {
            errors.noprofile = 'There are no engins';
            return res.status(404).json(errors);
        }
        return res.json(engins);
    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}
