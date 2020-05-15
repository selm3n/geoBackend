const marquecontroller = require("../../controllers/marque");
const jwt = require('jsonwebtoken');
// const passport = require('passport');
const passport_client = require('passport');

module.exports.setup = function(app) {

/**
     * @swagger
     * /api/marques/all:
     *   get:
     *     description: all marques
     *     tags: [Marque]
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
    app.get('/api/marques/all',
    passport_client.authenticate('client-rule', { session: false }),
      marquecontroller.allMarques);

}
