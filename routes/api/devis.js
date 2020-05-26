const deviscontroller = require("../../controllers/devis");
const jwt = require('jsonwebtoken');
// const passport = require('passport');
const passport_client = require('passport');

module.exports.setup = function(app) {

/**
     * @swagger
     * /api/devis/add:
     *    post:
     *      description: add Devis
     *      tags: [Devis]
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
     *                  $ref: '#/definitions/Devis'
     *              noarticles:
     *                type: array
     *                items:
     *                  $ref: '#/definitions/NDevis'
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
     *      security:              
     *      - Bearer: [] 
     *      responses:
     *        200:
     *          description: OK
     * 
     *definitions:
     *  Devis:
     *    type: object
     *    properties:
     *       article:
     *         type: string
     *       qte:
     *         type: number
     *  NDevis:
     *    type: object
     *    properties:
     *       ref:
     *         type: string
     *       marque:
     *         type: string
     *       fournisseur:
     *         type: string
     *       designation:
     *         type: string
     *       prix_achat:
     *         type: string
     *       prix_vente:
     *         type: string
     *       categorie:
     *         type: string
     *       adaptable:
     *         type: string
     *       remise:
     *         type: string
     *       nom:
     *         type: string
     *       tva:
     *         type: string
     *       qte:
     *         type: number
     */
    app.post('/api/devis/add',
    passport_client.authenticate('client-rule', { session: false }),
    deviscontroller.addDevis);

     /**
     * @swagger
     * /api/devis/client/all:
     *   get:
     *     description: all devis
     *     tags: [Devis]
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
    app.get('/api/devis/client/all',
    passport_client.authenticate('client-rule', { session: false }),
    deviscontroller.allClientDevis);

    


}
