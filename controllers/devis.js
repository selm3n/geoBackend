const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');

const Article = require('../models/article');
const Devis = require("../models/devis");
var mongoose = require("mongoose");
const mongo = require('mongodb');

const fs = require('fs');

const multer = require('../config/multer');

exports.addDevis = async (req, res, next) => {
    try {
        const cmd = new Devis({
            prix_ht: req.body.prix_ht,
            prix_ttc: req.body.prix_ttc,

            //
            client: req.user.id,
            //
            statut: 'devis',
            remise: req.body.remise,
            tva: req.body.tva,
            devise: req.body.devise,
        })
        var atrs = [];
        // console.log('req.body.articles.length',req.body.articles.length);
        // console.log('req.body.articles',req.body.articles);
        if(req.body.articles && req.body.articles.length >0){
            for (let i = 0; i < req.body.articles.length; i++) {
                a = {};
                artcile = await Article.findById({ _id: new mongo.ObjectId(req.body.articles[i].article) });
                a.article = artcile;
                a.qte = req.body.articles[i].qte;
                atrs[i] = a;
            }
            cmd.articles = atrs;
        }

        if(req.body.noarticles && req.body.noarticles.length >0){
            for (let i = 0; i < req.body.noarticles.length; i++) {
                a = {};
                noartcile = new Article();
                if (req.body.noarticles[i].ref) noartcile.ref = req.body.noarticles[i].ref;

                if (req.body.noarticles[i].fournisseur) noartcile.fournisseur = req.body.noarticles[i].fournisseur;
                if (req.body.noarticles[i].designation) noartcile.designation = req.body.noarticles[i].designation;
                if (req.body.noarticles[i].prix_achat) noartcile.prix_achat = req.body.noarticles[i].prix_achat;
                if (req.body.noarticles[i].prix_vente) noartcile.prix_vente = req.body.noarticles[i].prix_vente;
                
                if (req.body.noarticles[i].categorie) noartcile.categorie = req.body.noarticles[i].categorie;
                if (req.body.noarticles[i].adaptable) noartcile.adaptable = req.body.noarticles[i].adaptable;
                if (req.body.noarticles[i].remise) noartcile.remise = req.body.noarticles[i].remise;
                if (req.body.noarticles[i].nom) noartcile.nom = req.body.noarticles[i].nom;
                if (req.body.noarticles[i].tva) noartcile.tva = req.body.noarticles[i].tva;
                if (req.body.noarticles[i].marque) noartcile.marque = req.body.noarticles[i].marque;

                a.article = noartcile;
                a.qte = req.body.noarticles[i].qte;
                atrs[i] = a;
            }
            cmd.noarticles = atrs;
        }
        

        
        cmd.save()
            .then(command => res.json(
                {
                    success: true,
                    message: "devis successfully added",
                    data: command
                }
            ))

    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.updateStatus = async (req, res, next) => {
    try {
        await Devis.findOneAndUpdate(
            { _id: new mongo.ObjectId(req.body.id) },
            { $set: { statut: req.body.statut } },
        )
        return res.json(
            {
                success: true,
                message: "devis statut successfully updated",
            }
        )
    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.allClientDevis = (req, res, next) => {
    try {
        // new mongo.ObjectId(req.params.clientId)
        console.log('req.user.id',req.user.id);
        Devis.find(
            { client: req.user.id }
        )
        // .lean()
            .populate('client')
            .populate('marque')
            .then(devis => {
                if (!devis) {
                    errors.noprofile = 'There are no devis';
                    return res.status(404).json(errors);
                }
                res.json(devis);
            })
    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.allDevis = (req, res, next) => {
    try {
        Devis.find(
        )
        // .lean()
            .populate('client')
            .populate('marque')
            .then(devis => {
                if (!devis) {
                    errors.noprofile = 'There are no devis';
                    return res.status(404).json(errors);
                }
                res.json(devis);
            })
    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

