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

            poids_carton: req.body.poids_carton,
            volume_carton: req.body.volume_carton,
            prix_remise: req.body.prix_remise,
            monnaie: req.body.monnaie,
            code_remise: req.body.code_remise,
            pourcentage_remise: req.body.pourcentage_remise,
            unite_vente: req.body.unite_vente,
            carton_euro: req.body.carton_euro,
            palette_euro: req.body.palette_euro,
            palette_qte: req.body.palette_qte,
            code_douanier: req.body.code_douanier,
            ean_code: req.body.ean_code,
            pays_origine: req.body.pays_origine,
            hazardous_good: req.body.hazardous_good,
            longueur: req.body.longueur,
            largeur: req.body.largeur,
            hauteur: req.body.hauteur,
            
            subpac_type: req.body.subpac_type,
            subpac_longueur: req.body.subpac_longueur,
            subpac_largeur: req.body.subpac_largeur,
            subpac_hauteur: req.body.subpac_hauteur,
            subpac_poids: req.body.subpac_poids,
            subpac_qte: req.body.subpac_qte,
            carton_type: req.body.carton_type,
            longueur_carton: req.body.longueur_carton,
            largeur_carton: req.body.largeur_carton,
            hauteur_carton: req.body.hauteur_carton,
            carton_qte: req.body.carton_qte,
            source: req.body.source,

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

        if (req.body.poids_carton) articleFields.poids_carton= req.body.poids_carton;
        if (req.body.volume_carton) articleFields.volume_carton= req.body.volume_carton;
        if (req.body.prix_remise) articleFields.prix_remise= req.body.prix_remise;
        if (req.body.monnaie) articleFields.monnaie= req.body.monnaie;
        if (req.body.code_remise) articleFields.code_remise= req.body.code_remise;
        if (req.body.pourcentage_remise) articleFields.pourcentage_remise= req.body.pourcentage_remise;
        if (req.body.unite_vente) articleFields.unite_vente= req.body.unite_vente;
        if (req.body.carton_euro) articleFields.carton_euro= req.body.carton_euro;
        if (req.body.palette_euro) articleFields.palette_euro= req.body.palette_euro;
        if (req.body.palette_qte) articleFields.palette_qte= req.body.palette_qte;
        if (req.body.code_douanier) articleFields.code_douanier= req.body.code_douanier;
        if (req.body.ean_code) articleFields.ean_code= req.body.ean_code;
        if (req.body.pays_origine) articleFields.pays_origine= req.body.pays_origine;
        if (req.body.hazardous_good) articleFields.hazardous_good= req.body.hazardous_good;
        if (req.body.longueur) articleFields.longueur= req.body.longueur;
        if (req.body.largeur) articleFields.largeur= req.body.largeur;
        if (req.body.hauteur) articleFields.hauteur= req.body.hauteur;
        
        if (req.body.subpac_type) articleFields.subpac_type= req.body.subpac_type;
        if (req.body.subpac_longueur) articleFields.subpac_longueur= req.body.subpac_longueur;
        if (req.body.subpac_largeur) articleFields.subpac_largeur= req.body.subpac_largeur;
        if (req.body.subpac_hauteur) articleFields.subpac_hauteur= req.body.subpac_hauteur;
        if (req.body.subpac_poids) articleFields.subpac_poids= req.body.subpac_poids;
        if (req.body.subpac_qte) articleFields.subpac_qte= req.body.subpac_qte;
        if (req.body.carton_type) articleFields.carton_type= req.body.carton_type;
        if (req.body.longueur_carton) articleFields.longueur_carton= req.body.longueur_carton;
        if (req.body.largeur_carton) articleFields.largeur_carton= req.body.largeur_carton;
        if (req.body.hauteur_carton) articleFields.hauteur_carton= req.body.hauteur_carton;
        if (req.body.carton_qte) articleFields.carton_qte= req.body.carton_qte;
        if (req.body.source) articleFields.source= req.body.source;

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
