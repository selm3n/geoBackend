const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');

const Moteur = require('../models/moteur');
const Engin = require('../models/engin');
const Historique = require("../models/historique");
var mongoose = require("mongoose");
const mongo = require('mongodb');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const fs = require('fs');

const multer = require('../config/multer');


/**
 * POST /Moteur
 * Api add Moteur.
 */
exports.addMoteur = async (req, res, next) => {
    try {

        if (!req.body || Object.keys(req.body).length == 0) {
            return res.status(400).json({
                status: 400,
                error: "no req body"
            });
        }

        const newMoteur = new Moteur({
            marque: req.body.marque,
            model: req.body.model,
            num_serie: req.body.num_serie,
            num_arrg: req.body.num_arrg,
            monte_engin: req.body.monte_engin,
            num_parq: req.body.num_parq,
            client: req.user.id,
            engin: req.body.engin

        });

        let moteur = await newMoteur.save();
        await Engin.updateOne(
            { _id: new mongo.ObjectId(req.body.engin) },
            {
                $set: {
                    moteur: moteur._id
                }
            }
        )

        return res.json(
            {
                success: true,
                message: "Moteur successfully added",
                data: moteur
            }
        )

    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.allClientMoteurs = (req, res, next) => {
    try {
        // new mongo.ObjectId(req.params.clientId)
        Moteur.find(
            { client: req.user.id }
        )
            .lean()
            .populate('client')
            .populate('marque')
            .then(moteurs => {
                if (!moteurs) {
                    errors.noprofile = 'There are no moteurs';
                    return res.status(404).json(errors);
                }

                // var eng = [];
                // //console.log('req.params.offset',8 +req.params.offset);
                // for (j = parseInt(req.params.offset); j < 9 + parseInt(req.params.offset); j++) {
                //     if (j < moteurs.length)
                //         eng.push( moteurs[j]);
                // }
                //console.log('eng.length',eng.length);
                res.json(moteurs);
            })
        //.catch(err => res.status(404).json({ profile: 'There are no moteurs' }));
    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.getMoteur = (req, res, next) => {
    try {

        var id = req.params.id;
        Moteur.findOne({ _id: new mongo.ObjectId(id) })
            .populate('client')
            .populate('marque')
            .then(moteur => {
                if (!moteur) {
                    errors.noprofile = 'Moteur does not exist';
                    return res.status(404).json(errors);
                }

                res.json({ success: true, data: moteur });
            })

    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.deleteMoteur = async (req, res, next) => {
    try {

        var id = req.params.id;
        let moteur = await Moteur.findOne({ _id: new mongo.ObjectId(id) }).exec();

        let engin = moteur.engin;
        
        await moteur.remove();
        await Engin.findOneAndUpdate(
            {
                _id: new mongo.ObjectId(engin),
            },{
                moteur:null
            }
        ).exec();
        return res.json({ success: true, message: "Moteur deleted successfully" });
            
    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.updateMoteur = async (req, res, next) => {
    try {
        const id = req.body.id;
        const moteurFields = {};

        if (req.body.marque) moteurFields.marque = req.body.marque;
        if (req.body.model) moteurFields.model = req.body.model;
        if (req.body.num_serie) moteurFields.num_serie = req.body.num_serie;
        if (req.body.num_arrg) moteurFields.num_arrg = req.body.num_arrg;
        if (req.body.monte_engin) moteurFields.monte_engin = req.body.monte_engin;
        if (req.body.num_parq) moteurFields.num_parq = req.body.num_parq;
        // if (req.body.client) moteurFields.client = req.body.client;

        if (req.body.engin) moteurFields.engin = req.body.engin;

        if (req.body.engin){
            let moteur = await Moteur.findOne(
                {
                    _id: new mongo.ObjectId(id),
                }  
            ).exec();
            if(moteur.engin!= null && moteur.engin != req.body.engin ){
                await Engin.findOneAndUpdate(
                    {
                        _id: new mongo.ObjectId(moteur.engin),
                    },{
                        moteur:null
                    }
                ).exec();
            } 
        }
        
        await Moteur.findOneAndUpdate({ _id: new mongo.ObjectId(id) }, moteurFields)
        await Engin.findOneAndUpdate(
            {
                _id: new mongo.ObjectId(req.body.engin),
            },{
                moteur:id
            }
        )
            return  res.json({ success: true, message: "Moteur updated successfully" });


    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}
