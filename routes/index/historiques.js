const historiquecontroller = require("../../controllers/historique");
const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports.setup = function (app) {
       /**
        * @swagger
        * /historiques/all:
        *   get:
        *     description: tout l'historique de recherche
        *     tags: [Historique]
        *     produces:
        *       - application/json
        *     responses:
        *       200:
        *         description: Success
        *       204:
        *         description: No Content
        */
       app.get('/historiques/all',
              //passport.authenticate('jwt', { session: false }),
              historiquecontroller.allHistoriques);

       /**
        * @swagger
        * /historiques/client/{id}:
        *   get:
        *     description: client historique
        *     tags: [Historique]
        *     produces:
        *       - application/json
        *     parameters:
        *       - name: id
        *         description: client id
        *         required: true
        *         type: string
        *         in: path
        *     responses:
        *       200:
        *         description: Success
        *       204:
        *         description: No Content
        */
       app.get('/historiques/client/:id',
              // passport.authenticate('jwt', { session: false }),
              historiquecontroller.historiquesParClient);
}
