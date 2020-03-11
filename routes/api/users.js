
const usercontroller = require("../../controllers/user");
const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports.setup = function(app) {

/**
   * @swagger
   * /api/users/inscription:
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
   *       - name: motDePasse
   *         description: password
   *         in: formData
   *       - name: email
   *         description: email
   *         in: formData
   *       - name: numeroTelephone
   *         description: id numeroTelephone
   *         in: formData
   *     responses:
   *       200:
   *         description: Success
   *       204:
   *         description: No Content
   */
app.post('/api/users/inscription', usercontroller.addUser);


app.post('/api/login', usercontroller.loginUser);


app.get('/api/current', passport.authenticate('jwt', { session: false }), usercontroller.currentUser);


}
