const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');

const Article = require('../models/Article');
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

        if(!req.body || Object.keys(req.body).length == 0 ){
            return res.status(400).json({
                status: 400,
                error: "no req body"
              }); 
        }
        
        var files=[]; 

        for(let i =0; i<req.files.length; i++){
            files[i]=`${process.env.REACT_APP_MEDIA_PATH}/${req.files[i].filename}`
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
            image:`${process.env.REACT_APP_MEDIA_PATH}/${req.files.image[0].filename}`,

        });




        newArticle.save()
            .then(article => res.json(
                {
                    status: "success",
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
