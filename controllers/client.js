const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');

const Client = require('../models/client');
const Adresse = require('../models/adresse');
var mongoose = require("mongoose");
const mongo = require('mongodb');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const crypto = require('crypto');

var path = require('path');
var  hbs = require('nodemailer-express-handlebars'),
  email = process.env.MAILER_EMAIL_ID || 'auth_email_address@gmail.com',
  pass = process.env.MAILER_PASSWORD || 'auth_email_pass'
  nodemailer = require('nodemailer');



var smtpTransport = nodemailer.createTransport(
{
  service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
  auth: {
    user: 'ggeonegoce@gmail.com',//email,
    pass: 'pblpxcylaxbxadbm'//pass
  }
  
});

var handlebarsOptions = {
    viewEngine: {
        extName: '.html',
        partialsDir: './templates',
        layoutsDir: './templates',
        defaultLayout: '',
      },
  viewPath: path.resolve('./templates/'),
  extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));



/**
 * POST /Client
 * Api add Client.
 */
exports.addClient = (req, res, next) => {
    try {

        // if(!req.body){
        //     return res.status(400).json({
        //         status: 400,
        //         error: "no req body"
        //       }); 
        // }

        const { errors, isValid } = validateRegisterInput(req.body);

        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }


        Client.findOne({ email: req.body.email }).then(client => {
            if (client) {
                errors.email = 'Client email already exists';
                return res.status(400).json(errors);
            } else {

                const newClient = new Client({
                    type: req.body.type,
                    civilite: req.body.civilite,
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    rs: req.body.rs,
                    email: req.body.email,
                    tel_fixe: req.body.tel_fixe,
                    //adresses: req.body.adresses,
                    cp: req.body.cp,
                    pays: req.body.pays,
                    ville: req.body.ville,
                    news_letter: req.body.news_letter,
                    ip: req.body.ip,
                    mot_de_pass: req.body.mot_de_pass,
                    status: req.body.status,
                    compte: req.body.compte,
                    activite: req.body.activite,
                    siren: req.body.siren,
                    tva_intra: req.body.tva_intra,
                    fonction: req.body.fonction,
                    nom_resp_achat: req.body.nom_resp_achat,
                    tel_mobile: req.body.tel_mobile,
                    interet: req.body.interet,


                    compte_active: false,

                });

                const newadr = new Adresse({
                    adr_nom: req.body.adr_nom,
                    adr_prenom: req.body.adr_prenom,
                    adr_nom_societe: req.body.adr_nom_societe,
                    adr_pays: req.body.adr_pays,
                    adr_cp: req.body.adr_cp,
                    adr_ville: req.body.adr_ville,
                    adr_primaire: req.body.adr_primaire,
                    adr_secondaire: req.body.adr_secondaire,
                    adr_tel_fixe: req.body.adr_tel_fixe,
                    adr_tel_mobile: req.body.adr_tel_mobile

                });
                newClient.adresses.push(newadr);

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newClient.mot_de_pass, salt, (err, hash) => {
                        if (err) throw err;
                        newClient.mot_de_pass = hash;
                        newClient
                            .save()
                            .then(
                              
                                 data = {
                                    to: req.body.email,
                                    from: process.env.MAILER_EMAIL_ID,
                                    template: 'activate-account-email',
                                    subject: 'Activation compte GéoNégoce',
                                    context: {
                                        url: 'http://localhost:3000/api/clients/particulier/activation?email=' + req.body.email,
                                        name: req.body.nom.split(' ')[0]
                                    }
                                },
                                
                                smtpTransport.sendMail(data, function (err) {
                                    if (!err) {
                                         return res.json({ message: 'client successfully added, Kindly check your email to activate your account !', data: {data, newClient} });
                                    } else {
                                        console.log('err',err);
                                        return res.status(400).json({
                                            //status: 400,
                                            status: "error",
                                            message: err
                                          });
                                    }
                                }),

                            //     client => res.json(
                            //     {
                            //         status: "success",
                            //         message: "client successfully added",
                            //         data: client
                            //     }
                            // )
                            )
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
        // return res.status(400).json({
        //   status: "error",
        //   messsage: err.message,

        // });
    }
}

exports.activateClient = async (req, res, next) => {
    try {
        var client = await  Client.findOneAndUpdate({ email: req.body.email },{compte_active:true}).lean().exec();
        
        client.compte_active=true;
        if(client.type.trim()=='professionnel'){
            
            var data = {
                to: client.email,
                from: process.env.MAILER_EMAIL_ID,
                template: 'discount-pro-email',
                subject: 'remise géonégoce',
                context: {
                    url: 'http://localhost:3000/clients/demanderemise?email=' + client.email,
                    name: client.nom.split(' ')[0]
                }
            };
            
            smtpTransport.sendMail(data, function (err) {
                if (!err) {
                     return res.json({ 
                        status: "success",
                        message: 'client activated and discount mail sent successfully',
                        data: {data, client} });
                } else {
                    console.log('err',err);
                    return res.status(400).json({
                        //status: 400,
                        status: "error",
                        message: err
                      });
                }
            });

        }else{
            return res.json(
                {
                    status: "success",
                    message: "client successfully activated",
                    data: client
                }
            )

        }
        
            
        
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
        
    }
}

/**
 * POST /Client
 * Api login Client.
 */
exports.loginClient = async function (req, res, next) {
    try {
        //console.log('body ',req.body);
        const { errors, isValid } = validateLoginInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const email = req.body.email;
        const mot_de_pass = req.body.mot_de_pass;

        client = await Client.findOne({ email });
        if (!client) {
            errors.email = 'Client not found';
            return res.status(404).json(errors);
        }

        bcrypt.compare(mot_de_pass, client.mot_de_pass).then(isMatch => {
            if (isMatch) {
                const payload = { id: client.id, nom: client.nom, email: client.email };
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    //{ expiresIn: 3600 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                );
            } else {
                errors.mot_de_passe = 'mot_de_passe incorrect';
                return res.status(400).json(errors);
            }
        });

    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }

}

/**
 * GET /Client
 * Api current Client.
 */
exports.currentClient = async function (req, res, next) {
    // console.log('req.client',req.user.nom);
    try {
        return res.json({
            id: req.user.id,
            name: req.user.nom,
            email: req.user.email
        });


    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.allClients = (req, res, next) => {
    try {
        Client.find()
            .then(client => {
                res.json(
                    {
                        success: true,
                        data: client
                    }
                );
            })
    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

exports.forgotPassword = async function (req, res, next)  {
    try {
        
        var client = await Client.findOne({
                email: req.body.email
            }).exec();
        
        
           
        var token =  crypto.randomBytes(20);
        token =  token.toString('hex');
        
        var newClient = await Client.findByIdAndUpdate({ _id: client._id }, { reset_password_token: token, reset_password_expires: Date.now() + 86400000 }, { new: true }).exec() ;
        
        
            var data = {
                to: client.email,
                from: process.env.MAILER_EMAIL_ID,
                template: 'forgot-password-email',
                subject: 'Réinitialisation de votre mot de passe',
                context: {
                    url: 'http://localhost:3000/api/clients/resetpassword?token=' + token,
                    name: client.nom.split(' ')[0]
                }
            };
            
            smtpTransport.sendMail(data, function (err) {
                if (!err) {
                     return res.json({ message: 'Kindly check your email for further instructions', data: data });
                } else {
                    console.log('err',err);
                    return res.status(400).json({
                        //status: 400,
                        status: "error",
                        message: err
                      });
                }
            });
        
    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
};

exports.resetPassword = function (req, res, next) {
    Client.findOne({
        reset_password_token: req.body.token,
        reset_password_expires: {
            $gt: Date.now()
        }
    }).exec(function (err, client) {
        if (!err && client) {
            if (req.body.newPassword === req.body.verifyPassword) {
                client.mot_de_pass = bcrypt.hashSync(req.body.newPassword, 10);
                client.reset_password_token = undefined;
                client.reset_password_expires = undefined;
                client.save(function (err) {
                    if (err) {
                        return res.status(422).send({
                            message: err
                        });
                    } else {
                        var data = {
                            to: client.email,
                            from: process.env.MAILER_EMAIL_ID,
                            template: 'reset-password-email',
                            subject: 'Confirmation de réinitialisation',
                            context: {
                                name: client.nom.split(' ')[0]
                            }
                        };

                        smtpTransport.sendMail(data, function (err) {
                            if (!err) {
                                return res.json({ message: 'Password reset' });
                            } else {
                                console.log('err', err);
                                return res.status(400).json({
                                    //status: 400,
                                    status: "error",
                                    message: err
                                });
                            }
                        });
                    }
                });
            } else {
                return res.status(422).send({
                    message: 'Passwords do not match'
                });
            }
        } else {
            return res.status(400).send({
                message: 'Password reset token is invalid or has expired.'
            });
        }
    });
};

exports.updateuseradresses = async function (req, res, next) {
    let adrId = mongoose.Types.ObjectId(req.body.adrid);
    Client.updateOne(
        {
            email: req.body.email,
            "adresses._id": req.body.adrId
        },
        {
            $set: {
                "adresses.$.adr_nom": req.body.adr_nom,
                "adresses.$.adr_prenom": req.body.adr_prenom,
                "adresses.$.adr_nom_societe": req.body.adr_nom_societe,
                "adresses.$.adr_pays": req.body.adr_pays,
                "adresses.$.adr_cp": req.body.adr_cp,
                "adresses.$.adr_ville": req.body.adr_ville,
                "adresses.$.adr_primaire": req.body.adr_primaire,
                "adresses.$.adr_secondaire": req.body.adr_secondaire,
                "adresses.$.adr_tel_fixe": req.body.adr_tel_fixe,
                "adresses.$.adr_tel_mobile": req.body.adr_tel_mobile,
            }
        }
    ).exec(function (err, client) {

        if (err) {
            console.log(err);
            throw new Error(err.message);
        }
        res.json({
            status: "success",
            message: "client adress updated sucessfully",
            data: client
        });
    });
};

exports.adduseradresses = async function (req, res, next) {
    const newadr = new Adresse({
        adr_nom: req.body.adr_nom,
        adr_prenom: req.body.adr_prenom,
        adr_nom_societe: req.body.adr_nom_societe,
        adr_pays: req.body.adr_pays,
        adr_cp: req.body.adr_cp,
        adr_ville: req.body.adr_ville,
        adr_primaire: req.body.adr_primaire,
        adr_secondaire: req.body.adr_secondaire,
        adr_tel_fixe: req.body.adr_tel_fixe,
        adr_tel_mobile: req.body.adr_tel_mobile
    });

    Client.findOne(
        {
            email: req.body.email,
        }
    ).exec(function (err, client) {
        client.adresses.push(newadr);
        client.save();
        if (err) {
            console.log(err);
            throw new Error(err.message);
        }
        res.json({
            status: "success",
            message: "client adress added sucessfully",
            data: client
        });
    });
};

exports.deleteuseradresses = async function (req, res, next) {
    Client.updateOne(
        { email: req.params.email,
            "adresses._id": req.params.adrId
        },
        { $pull: { adresses: { _id: req.params.adrId } } },
        ).exec(function (err, client) {

        if (err) {
            console.log(err);
            throw new Error(err.message);
        }
        return res.json({
            status: "success",
            message: "client adress removed sucessfully",
            data: client
        });
    });
    
};

exports.updateClient = (req, res, next) => {
    try {
        const id = req.body.id;
        const clientFields = {};

        if (req.body.type) clientFields.type = req.body.type;
        if (req.body.civilite) clientFields.civilite = req.body.civilite;
        if (req.body.nom) clientFields.nom = req.body.nom;
        if (req.body.prenom) clientFields.prenom = req.body.prenom;
        if (req.body.rs) clientFields.rs = req.body.rs;
        if (req.body.email) clientFields.email = req.body.email;
        if (req.body.tel_fixe) clientFields.tel_fixe = req.body.tel_fixe;
        if (req.body.cp) clientFields.cp = req.body.cp;
        if (req.body.pays) clientFields.pays = req.body.pays;
        if (req.body.ville) clientFields.ville = req.body.ville;
        if (req.body.news_letter) clientFields.news_letter = req.body.news_letter;
        if (req.body.ip) clientFields.ip = req.body.ip;
        if (req.body.status) clientFields.status = req.body.status;
        if (req.body.compte) clientFields.compte = req.body.compte;
        if (req.body.activite) clientFields.activite = req.body.activite;
        if (req.body.siren) clientFields.siren = req.body.siren;
        if (req.body.tva_intra) clientFields.tva_intra = req.body.tva_intra;
        if (req.body.fonction) clientFields.fonction = req.body.fonction;
        if (req.body.nom_resp_achat) clientFields.nom_resp_achat = req.body.nom_resp_achat;
        if (req.body.tel_mobile) clientFields.tel_mobile = req.body.tel_mobile;
        if (req.body.interet) clientFields.interet = req.body.interet;

        Client.findOneAndUpdate({ _id: new mongo.ObjectId(id) }, clientFields)
            .then(article => res.json({ success: true, message: "client updated successfully" }));

    } catch (err) {
        console.log(err);
        throw new Error(err.message);

    }
}

