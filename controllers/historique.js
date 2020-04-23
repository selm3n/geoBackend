const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');


const Historique = require("../models/historique");
var mongoose = require("mongoose");
const mongo = require('mongodb');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const multer = require('../config/multer');

exports.allHistoriques = (req, res, next) => {
    try {
        //const errors = {};

        Historique.find()
            .populate('client')
            .then(historique => {
                res.json(
                    {
                        success: true,
                        data: historique
                    }
                );
            })
    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.historiquesParClient = (req, res, next) => {
    try {
        //new mongo.ObjectId(req.params.id)
        let id = mongoose.Types.ObjectId(req.params.id);
console.log('req.params.id',req.params.id);
        Historique.find(
            { client:  id }
        )
            .populate('client')
            .then(historique => {
                res.json(
                    {
                        success: true,
                        data: historique
                    }
                );
            })
    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}
