const commandcontroller = require("../../controllers/commande");
const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports.setup = function(app) {

/**
   * @swagger
   * /command/update/status:
   *   post:
   *     description: update statut Commande
   *     tags: [Commande]
   *     produces:
   *       - application/json
   *     parameters:
   *              - name: id
   *                description: id commande
   *                type: string
   *                in: formData
   *              - name: statut
   *                description: status commande
   *                type: string
   *                in: formData
   *     responses:
   *       200:
   *         description: Success
   *       204:
   *         description: No Content
   */
  app.post('/command/update/status', commandcontroller.updateStatus);
}
