
const clientcontroller = require("../../controllers/client");
const jwt = require('jsonwebtoken');
const passport_client = require('passport');
//const passport = require('passport');

module.exports.setup = function(app) {

/**
   * @swagger
   * /api/clients/inscription:
   *   post:
   *     description: client inscription
   *     tags: [Client]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: type
   *         description: particulier ou professionnel
   *         required: true
   *         type: string
   *         in: formData
   *       - name: civilite
   *         description: m ou mme
   *         required: true
   *         type: string
   *         in: formData
   *       - name: nom
   *         description: nom
   *         required: true
   *         type: string
   *         in: formData
   *       - name: prenom
   *         description: prenom
   *         required: true
   *         type: string
   *         in: formData
   *       - name: rs
   *         description: raison sociale
   *         type: string
   *         in: formData
   *       - name: email
   *         description: email
   *         required: true
   *         type: string
   *         in: formData
   *       - name: tel_fixe
   *         description: telephone fixe
   *         type: string
   *         in: formData
   *       - name: adr_nom
   *         type: string
   *         description: adr nom
   *         in: formData
   *       - name: adr_prenom
   *         type: string
   *         description: adr prenom
   *         in: formData
   *       - name: adr_nom_societe
   *         type: string
   *         description: adr nom societe
   *         in: formData
   *       - name: adr_pays
   *         type: string
   *         description: adr pays
   *         in: formData
   *       - name: adr_cp
   *         type: string
   *         description: adr cp
   *         in: formData
   *       - name: adr_ville
   *         type: string
   *         description: adr ville
   *         in: formData
   *       - name: adr_primaire
   *         type: string
   *         description: adr primaire
   *         in: formData
   *       - name: adr_secondaire
   *         type: string
   *         description: adr secondaire
   *         in: formData
   *       - name: adr_tel_fixe
   *         type: string
   *         description: adr tel fixe
   *         in: formData
   *       - name: adr tel mobile
   *         type: string
   *         description: adr tel mobile
   *         in: formData
   *       - name: cp
   *         description: code postal
   *         type: string
   *         in: formData
   *       - name: pays
   *         description: pays
   *         required: true
   *         type: string
   *         in: formData
   *       - name: ville
   *         description: ville
   *         type: string
   *         in: formData
   *       - name: news_letter
   *         description: is accepting news letters 
   *         required: true
   *         type: boolean
   *         in: formData
   *       - name: ip
   *         description: ip
   *         in: formData
   *       - name: mot_de_pass
   *         description: mot de passe
   *         required: true
   *         type: string
   *         in: formData
   *       - name: status
   *         description: status
   *         in: formData
   *       - name: compte
   *         description: utilisateur ou revendeur
   *         in: formData
   *       - name: activite
   *         description: activite
   *         in: formData
   *       - name: siren
   *         description: siren
   *         in: formData
   *       - name: tva_intra
   *         description: tva_intra
   *         in: formData
   *       - name: fonction
   *         description: fonction
   *         in: formData
   *       - name: nom_resp_achat
   *         description: nom responsable d'achat
   *         in: formData
   *       - name: tel_mobile
   *         description: tel mobile
   *         required: true
   *         in: formData
   *       - name: interet
   *         description: interet
   *         in: formData
   *     responses:
   *       200:
   *         description: Success
   *       204:
   *         description: No Content
   */
app.post('/api/clients/inscription', clientcontroller.addClient);

/**
   * @swagger
   * /api/clients/particular/activate:
   *   post:
   *     description: client login
   *     tags: [Client]
   *     produces:
   *       - application/json
   *     parameters:
   *              - name: email
   *                description: email
   *                required: true
   *                type: string
   *                in: formData
   *     responses:
   *       200:
   *         description: Success
   *       204:
   *         description: No Content
   */
  app.post('/api/clients/particular/activate', clientcontroller.activateClient);

/**
   * @swagger
   * /api/clients/login:
   *   post:
   *     description: client login
   *     tags: [Client]
   *     produces:
   *       - application/json
   *     parameters:
   *              - name: email
   *                description: email
   *                required: true
   *                type: string
   *                in: formData
   *              - name: mot_de_pass
   *                description: mot de passe
   *                required: true
   *                type: string
   *                in: formData
   *     responses:
   *       200:
   *         description: Success
   *       204:
   *         description: No Content
   */
app.post('/api/clients/login', clientcontroller.loginClient);

/**
   * @swagger
   * /api/clients/current:
   *   get:
   *     description: client current
   *     tags: [Client]
   *     produces:
   *       - application/json
   *     security:              
   *      - Bearer: [] 
   *     responses:
   *       200:
   *         description: Success
   *       204:
   *         description: No Content
   */
app.get('/api/clients/current', passport_client.authenticate('client-rule', { session: false }), clientcontroller.currentClient);

/**
   * @swagger
   * /api/clients/forgotpassword:
   *   post:
   *     description: client current
   *     tags: [Client]
   *     produces:
   *       - application/json
   *     parameters:
   *              - name: email
   *                description: email
   *                required: true
   *                type: string
   *                in: formData
   *     responses:
   *       200:
   *         description: Success
   *       204:
   *         description: No Content
   */
  app.post('/api/clients/forgotpassword',  clientcontroller.forgotPassword);

  /**
   * @swagger
   * /api/clients/resetpassword:
   *   post:
   *     description: client current
   *     tags: [Client]
   *     produces:
   *       - application/json
   *     parameters:
   *              - name: token
   *                description: token
   *                required: true
   *                type: string
   *                in: formData
   *              - name: newPassword
   *                description: newPassword
   *                required: true
   *                type: string
   *                in: formData
   *              - name: verifyPassword
   *                description: verifyPassword
   *                required: true
   *                type: string
   *                in: formData
   *     responses:
   *       200:
   *         description: Success
   *       204:
   *         description: No Content
   */
  app.post('/api/clients/resetpassword',  clientcontroller.resetPassword);

  /**
   * @swagger
   * /api/clients/updateadress:
   *   post:
   *     description: client update adress
   *     tags: [Client]
   *     produces:
   *       - application/json
   *     parameters:
   *              - name: email
   *                description: email
   *                required: true
   *                type: string
   *                in: formData
   *              - name: adrId
   *                description: adr Id
   *                required: true
   *                type: string
   *                in: formData
   *              - name: adr_nom
   *                description: adr nom
   *                required: true
   *                type: string
   *                in: formData
   *              - name: adr_prenom
   *                type: string
   *                description: adr prenom
   *                in: formData
   *              - name: adr_nom_societe
   *                type: string
   *                description: adr nom societe
   *                in: formData
   *              - name: adr_pays
   *                type: string
   *                description: adr pays
   *                in: formData
   *              - name: adr_cp
   *                type: string
   *                description: adr cp
   *                in: formData
   *              - name: adr_ville
   *                type: string
   *                description: adr ville
   *                in: formData
   *              - name: adr_primaire
   *                type: string
   *                description: adr primaire
   *                in: formData
   *              - name: adr_secondaire
   *                type: string
   *                description: adr secondaire
   *                in: formData
   *              - name: adr_tel_fixe
   *                type: string
   *                description: adr tel fixe
   *                in: formData
   *              - name: adr tel mobile
   *                type: string
   *                description: adr tel mobile
   *                in: formData
   *     security:              
   *      - Bearer: [] 
   *     responses:
   *       200:
   *         description: Success
   *       204:
   *         description: No Content
   */
app.post('/api/clients/updateadress',passport_client.authenticate('client-rule', { session: false }), clientcontroller.updateuseradresses);

/**
   * @swagger
   * /api/clients/addadress:
   *   post:
   *     description: client add adress
   *     tags: [Client]
   *     produces:
   *       - application/json
   *     parameters:
   *              - name: email
   *                description: email
   *                required: true
   *                type: string
   *                in: formData
   *              - name: adr_nom
   *                description: adr nom
   *                required: true
   *                type: string
   *                in: formData
   *              - name: adr_prenom
   *                type: string
   *                description: adr prenom
   *                in: formData
   *              - name: adr_nom_societe
   *                type: string
   *                description: adr nom societe
   *                in: formData
   *              - name: adr_pays
   *                type: string
   *                description: adr pays
   *                in: formData
   *              - name: adr_cp
   *                type: string
   *                description: adr cp
   *                in: formData
   *              - name: adr_ville
   *                type: string
   *                description: adr ville
   *                in: formData
   *              - name: adr_primaire
   *                type: string
   *                description: adr primaire
   *                in: formData
   *              - name: adr_secondaire
   *                type: string
   *                description: adr secondaire
   *                in: formData
   *              - name: adr_tel_fixe
   *                type: string
   *                description: adr tel fixe
   *                in: formData
   *              - name: adr tel mobile
   *                type: string
   *                description: adr tel mobile
   *                in: formData
   *     security:              
   *      - Bearer: [] 
   *     responses:
   *       200:
   *         description: Success
   *       204:
   *         description: No Content
   */
  app.post('/api/clients/addadress'
  ,passport_client.authenticate('client-rule', { session: false })
  , clientcontroller.adduseradresses);

  
  /**
   * @swagger
   * /api/clients/deleteadress/{adrId}:
   *   delete:
   *     description: delete client adress
   *     tags: [Client]
   *     produces:
   *       - application/json
   *     parameters:
   *              - name: adrId
   *                description: adr Id
   *                required: true
   *                type: string
   *                in: path
   *     security:              
   *      - Bearer: [] 
   *     responses:
   *       200:
   *         description: Success
   *       204:
   *         description: No Content
   */
app.delete('/api/clients/deleteadress/:adrId'
,passport_client.authenticate('client-rule', { session: false })
, clientcontroller.deleteuseradresses);

/**
   * @swagger
   * /api/clients/update:
   *   post:
   *     description: update client
   *     tags: [Client]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: type
   *         description: particulier ou professionnel
   *         required: true
   *         type: string
   *         in: formData
   *       - name: civilite
   *         description: m ou mme
   *         required: true
   *         type: string
   *         in: formData
   *       - name: nom
   *         description: nom
   *         required: true
   *         type: string
   *         in: formData
   *       - name: prenom
   *         description: prenom
   *         required: true
   *         type: string
   *         in: formData
   *       - name: rs
   *         description: raison sociale
   *         type: string
   *         in: formData
   *       - name: email
   *         description: email
   *         required: true
   *         type: string
   *         in: formData
   *       - name: tel_fixe
   *         description: telephone fixe
   *         type: string
   *         in: formData
   *       - name: cp
   *         description: code postal
   *         type: string
   *         in: formData
   *       - name: pays
   *         description: pays
   *         required: true
   *         type: string
   *         in: formData
   *       - name: ville
   *         description: ville
   *         type: string
   *         in: formData
   *       - name: news_letter
   *         description: is accepting news letters 
   *         required: true
   *         type: boolean
   *         in: formData
   *       - name: ip
   *         description: ip
   *         in: formData
   *       - name: mot_de_pass
   *         description: mot de passe
   *         required: true
   *         type: string
   *         in: formData
   *       - name: status
   *         description: status
   *         in: formData
   *       - name: compte
   *         description: utilisateur ou revendeur
   *         in: formData
   *       - name: activite
   *         description: activite
   *         in: formData
   *       - name: siren
   *         description: siren
   *         in: formData
   *       - name: tva_intra
   *         description: tva_intra
   *         in: formData
   *       - name: fonction
   *         description: fonction
   *         in: formData
   *       - name: nom_resp_achat
   *         description: nom responsable d'achat
   *         in: formData
   *       - name: tel_mobile
   *         description: tel mobile
   *         required: true
   *         in: formData
   *       - name: interet
   *         description: interet
   *         in: formData
   *     security:              
   *      - Bearer: [] 
   *     responses:
   *       200:
   *         description: Success
   *       204:
   *         description: No Content
   */
  app.post('/api/clients/update', passport_client.authenticate('client-rule', { session: false }),clientcontroller.updateClient);


}
