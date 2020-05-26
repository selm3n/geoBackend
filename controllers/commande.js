const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');

const Article = require('../models/article');
const Commande = require("../models/commande");
var mongoose = require("mongoose");
const mongo = require('mongodb');

const fs = require('fs');

const multer = require('../config/multer');

exports.addCommand = async (req, res, next) => {
    try {
        const cmd = new Commande({
            prix_ht: req.body.prix_ht,
            prix_ttc: req.body.prix_ttc,

            adr_livraison: req.body.prix_ht,
            adr_facturation: req.body.prix_ht,
            //
            client: req.user.id,
            //
            statut: req.body.statut,
            remise: req.body.remise,
            tva: req.body.tva,
            commandee: req.body.commandee,
        })
        var atrs = [];
        // console.log('req.body.articles.length',req.body.articles.length);
        // console.log('req.body.articles',req.body.articles);
        for (let i = 0; i < req.body.articles.length; i++) {
            a = {};
            artcile = await Article.findById({ _id: new mongo.ObjectId(req.body.articles[i].article) });
            a.article = artcile;
            a.qte = req.body.articles[i].qte;
            atrs[i] = a;
        }

        cmd.articles = atrs;
        cmd.save()
            .then(command => res.json(
                {
                    success: true,
                    message: "commande successfully added",
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
        await Commande.findOneAndUpdate(
            { _id: new mongo.ObjectId(req.body.id) },
            { $set: { statut: req.body.statut } },
        )
        return res.json(
            {
                success: true,
                message: "commande statut successfully updated",
            }
        )
    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.allClientCommandes = (req, res, next) => {
    try {
        // new mongo.ObjectId(req.params.clientId)
        console.log('req.user.id',req.user.id);
        Commande.find(
            { client: req.user.id }
        )
        // .lean()
            .populate('client')
            .populate('marque')
            .then(commandes => {
                if (!commandes) {
                    errors.noprofile = 'There are no commande';
                    return res.status(404).json(errors);
                }
                res.json(commandes);
            })
    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.allCommandes = (req, res, next) => {
    try {
        Commande.find(
        )
        // .lean()
            .populate('client')
            .populate('marque')
            .then(commandes => {
                if (!commandes) {
                    errors.noprofile = 'There are no commande';
                    return res.status(404).json(errors);
                }
                res.json(commandes);
            })
    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}
