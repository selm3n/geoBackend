const deviscontroller = require("../../controllers/devis");
const jwt = require('jsonwebtoken');
// const passport = require('passport');
const passport_client = require('passport');

module.exports.setup = function(app) {

    /**
     * @swagger
     * /devis/all:
     *   get:
     *     description: all devis
     *     tags: [Devis]
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Success
     *       204:
     *         description: No Content
     */
    app.get('/devis/all',
    //passport_client.authenticate('client-rule', { session: false }),
    deviscontroller.allDevis);


}
