const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');

const Article = require('../models/article');
const Historique = require("../models/historique");
var mongoose = require("mongoose");
const mongo = require('mongodb');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const multer = require('../config/multer');


/**
 * POST /Article
 * Api add Article.
 */
exports.addArticle = (req, res, next) => {
    try {

        if (!req.body || Object.keys(req.body).length == 0) {
            return res.status(400).json({
                status: 400,
                error: "no req body"
            });
        }

        var files = [];

        for (let i = 0; i < req.files.length; i++) {
            files[i] = `${process.env.REACT_APP_MEDIA_PATH}/${req.files[i].filename}`
            // console.log('files '+req.files[i].filename);
        }



        const newArticle = new Article({
            ref: req.body.ref,
            ref_geo: req.body.ref_geo,
            fournisseur: req.body.fournisseur,
            designation: req.body.designation,
            prix_achat: req.body.prix_achat,
            prix_vente: req.body.prix_vente,
            qte: req.body.qte,
            poids: req.body.poids,
            volume: req.body.volume,
            marque: req.body.marque,
            categorie: req.body.categorie,
            adaptable: req.body.adaptable,
            remise: req.body.remise,
            nom: req.body.nom,
            tva: req.body.tva,

            files: files,
            image: `${process.env.REACT_APP_MEDIA_PATH}/${req.files.image[0].filename}`,
            description: req.body.description,

        });




        newArticle.save()
            .then(article => res.json(
                {
                    success: true,
                    message: "Article successfully added",
                    data: article
                }
            ))

    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.allArticles = (req, res, next) => {
    try {
        //const errors = {};

        Article.find()
            //.populate('user')
            .then(articles => {
                if (!articles) {
                    errors.noprofile = 'There are no articles';
                    return res.status(404).json(errors);
                }

                res.json(articles);
            })
        //.catch(err => res.status(404).json({ profile: 'There are no articles' }));
    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.getArticle = (req, res, next) => {
    try {

        var id = req.params.id;
        Article.findOne({ _id: new mongo.ObjectId(id) })

            .then(article => {
                if (!article) {
                    errors.noprofile = 'Article does not exist';
                    return res.status(404).json(errors);
                }

                res.json({ success: true, data: article });
            })

    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.deleteArticle = (req, res, next) => {
    try {

        var id = req.params.id;
        Article.findOne({ _id: new mongo.ObjectId(id) })

            .then(article => {
                if (!article) {
                    errors.noprofile = 'Article does not exist';
                    return res.status(404).json(errors);
                }

                article.remove().then(() => res.json({ success: true, message: "Article deleted successfully" }));
            })

    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.updateArticle = (req, res, next) => {
    try {
        const id = req.body.id;
        const articleFields = {};

        if (req.body.ref) articleFields.ref = req.body.ref;
        if (req.body.ref_geo) articleFields.ref_geo = req.body.ref_geo;
        if (req.body.fournisseur) articleFields.fournisseur = req.body.fournisseur;
        if (req.body.designation) articleFields.designation = req.body.designation;
        if (req.body.prix_achat) articleFields.prix_achat = req.body.prix_achat;
        if (req.body.prix_vente) articleFields.prix_vente = req.body.prix_vente;
        if (req.body.qte) articleFields.qte = req.body.qte;
        if (req.body.poids) articleFields.poids = req.body.poids;
        if (req.body.volume) articleFields.volume = req.body.volume;
        if (req.body.marque) articleFields.marque = req.body.marque;
        if (req.body.categorie) articleFields.categorie = req.body.categorie;
        if (req.body.adaptable) articleFields.adaptable = req.body.adaptable;
        if (req.body.remise) articleFields.remise = req.body.remise;
        if (req.body.nom) articleFields.nom = req.body.nom;
        if (req.body.tva) articleFields.tva = req.body.tva;

        if (req.body.image) articleFields.image = `${process.env.REACT_APP_MEDIA_PATH}/${req.files.image[0].filename}`;
        if (req.body.description) articleFields.description = req.body.description;

        if (req.body.files) {
            var files = [];

            for (let i = 0; i < req.files.length; i++) {
                files[i] = `${process.env.REACT_APP_MEDIA_PATH}/${req.files[i].filename}`
                // console.log('files '+req.files[i].filename);
            }
            articleFields.files = req.body.files;

        }

        Article.findOneAndUpdate({ _id: new mongo.ObjectId(id) },articleFields)
        .then(article => res.json({ success: true, message: "Article updated successfully" }));
            

    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.searchArticles = async (req, res, next) => {
    try {
        const search = req.body.search;

        let articles = await Article.find({
            $or: [
                { nom: { $regex: '.*' + search + '.*' } },
                { ref: { $regex: '.*' + search + '.*' } },
            ],
        }).exec();
            
        const newh = {
            client: req.user._id,
            mot_cherche: search,
          };
        await Historique.create(newh);      

        res.json(
            {
                success: true,
                data: articles
            }
        )
        
    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}
