
const usercontroller = require("../../controllers/user");
const jwt = require('jsonwebtoken');
const passport_user = require('passport');

module.exports.setup = function(app) {

/**
   * @swagger
   * /users/inscription:
   *   post:
   *     description: user inscription
   *     tags: [User]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: nom
   *         description: nom
   *         in: formData
   *       - name: prenom
   *         description: prenom
   *         in: formData
   *       - name: mot_de_pass
   *         description: mot de pass
   *         in: formData
   *       - name: email
   *         description: email
   *         in: formData
   *     responses:
   *       200:
   *         description: Success
   *       204:
   *         description: No Content
   */
app.post('/users/inscription', usercontroller.addUser);

/**
   * @swagger
   * /users/login:
   *   post:
   *     description: client login
   *     tags: [User]
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
app.post('/users/login', usercontroller.loginUser);

/**
   * @swagger
   * /users/current:
   *   get:
   *     description: current user
   *     tags: [User]
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
app.get('/users/current', passport_user.authenticate('user-rule', { session: false }), usercontroller.currentUser);


}
