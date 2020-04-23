const clientcontroller = require("../../controllers/client");
const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports.setup = function (app) {
       /**
              * @swagger
              * /clients/all:
              *   get:
              *     description: tous le clients
              *     tags: [Client]
              *     produces:
              *       - application/json
              *     responses:
              *       200:
              *         description: Success
              *       204:
              *         description: No Content
              */
       app.get('/clients/all',
              //passport.authenticate('jwt', { session: false }),
              clientcontroller.allClients);
}
