const commandcontroller = require("../../controllers/commande");
const jwt = require('jsonwebtoken');
// const passport = require('passport');
const passport_client = require('passport');

module.exports.setup = function(app) {

/**
     * @swagger
     * /api/command/add:
     *    post:
     *      description: add Commande
     *      tags: [Commande]
     *      consumes:
     *      - application/json
     *      parameters:
     *      - name: body
     *        in: body
     *        schema:
     *          properties:
     *              articles:
     *                type: array
     *                items:
     *                  $ref: '#/definitions/BulkSource'
     *              prix_ht:
     *                type: string
     *              prix_ttc:
     *                type: string
     *              statut:
     *                type: string
     *              remise:
     *                type: string
     *              tva:
     *                type: string
     *              devis:
     *                type: string
     *      security:              
     *      - Bearer: [] 
     *      responses:
     *        200:
     *          description: OK
     * 
     *definitions:
     *  BulkSource:
     *    type: object
     *    properties:
     *       article:
     *         type: string
     *       qte:
     *         type: number
     */
    app.post('/api/command/add',
    passport_client.authenticate('client-rule', { session: false }),
    commandcontroller.addCommand);

    /**
     * @swagger
     * /api/command/client/all:
     *   get:
     *     description: all commandes
     *     tags: [Commande]
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
    app.get('/api/command/client/all',
    passport_client.authenticate('client-rule', { session: false }),
    commandcontroller.allClientCommandes);



}
