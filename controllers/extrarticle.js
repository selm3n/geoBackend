const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');

const Article = require('../models/article');
const Extrarticle = require('../models/extrarticle');
const Historique = require("../models/historique");
var mongoose = require("mongoose");
const mongo = require('mongodb');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const fs = require('fs');

const multer = require('../config/multer');

exports.addExtrarticle = (req, res, next) => {
    try {

        if (!req.body || Object.keys(req.body).length == 0) {
            return res.status(400).json({
                status: 400,
                error: "no req body"
            });
        }

        const newExtrarticle = new Extrarticle({
            marque: req.body.marque,
            ref: req.body.ref,
            qte: req.body.qte,
            model: req.body.model,
            num_serie: req.body.num_serie,

            fournisseur: req.body.fournisseur,
            nom: req.body.nom,
            description: req.body.description,

            client: req.user.id,
            
            qte_manquante: req.body.qte_manquante,


        });

        newExtrarticle.save()
            .then(extrarticle => res.json(
                {
                    success: true,
                    message: "Extrarticle successfully added",
                    data: extrarticle
                }
            ))

    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.allClientExtrarticles = (req, res, next) => {
    try {
        // new mongo.ObjectId(req.params.clientId)
        //  console.log('req.params.idclient',req.params.idclient);
        Extrarticle.find(
            { client: req.params.idclient }
        )
        // .lean()
            .populate('client')
            .populate('marque')
            .then(extrarticles => {
                if (!extrarticles) {
                    errors.noprofile = 'There are no extrarticles';
                    return res.status(404).json(errors);
                }
                
                res.json(extrarticles);
            })
    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.getExtrarticle = (req, res, next) => {
    try {

        var id = req.params.id;
        Extrarticle.findOne({ _id: new mongo.ObjectId(id) })
        .populate('client')
        .populate('marque')
            .then(extrarticle => {
                if (!extrarticle) {
                    errors.noprofile = 'Extrarticle does not exist';
                    return res.status(404).json(errors);
                }

                res.json({ success: true, data: extrarticle });
            })

    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.deleteExtrarticle = async (req, res, next) => {
    try {

        var id = req.params.id;
        let extrarticle = await Extrarticle.findOne({ _id: new mongo.ObjectId(id) }).exec();
        await extrarticle.remove();    
        return res.json({ success: true, message: "Extrarticle deleted successfully" });
            
    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.updateExtrarticle = async (req, res, next) => {
    try {
        const id = req.body.id;
        const extrarticleFields = {};

        if (req.body.marque) extrarticleFields.marque = req.body.marque;
        if (req.body.ref) extrarticleFields.ref = req.body.ref;
        if (req.body.qte) extrarticleFields.qte = req.body.qte;
        if (req.body.model) extrarticleFields.model = req.body.model;
        if (req.body.num_serie) extrarticleFields.num_serie = req.body.num_serie;
        
        if (req.body.fournisseur) extrarticleFields.fournisseur = req.body.fournisseur;
        if (req.body.nom) extrarticleFields.nom = req.body.nom;
        if (req.body.description) extrarticleFields.description = req.body.description;

        
        if (req.body.added_to_articles) extrarticleFields.added_to_articles = req.body.added_to_articles;
        if (req.body.qte_manquante) extrarticleFields.qte_manquante = req.body.qte_manquante;
       

        await Extrarticle.findOneAndUpdate({ _id: new mongo.ObjectId(id) },extrarticleFields)
        .then(extrarticle => res.json({ success: true, message: "Extrarticle updated successfully" }));
            

    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}