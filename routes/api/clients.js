
const clientcontroller = require("../../controllers/client");
const jwt = require('jsonwebtoken');
const passport = require('passport');

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
   *         required: true
   *         type: string
   *         in: formData
   *       - name: adresses
   *         description: adresses
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
app.get('/api/clients/current', passport.authenticate('jwt', { session: false }), clientcontroller.currentClient);

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


}
