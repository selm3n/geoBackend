const extrarticlecontroller = require("../../controllers/extrarticle");
const jwt = require('jsonwebtoken');
// const passport = require('passport');
const passport_client = require('passport');

module.exports.setup = function(app) {

/**
     * @swagger
     * /api/extrarticles/add:
     *    post:
     *      description: add Extrarticle
     *      tags: [Extrarticle]
     *      produces:
     *      - application/json
     *      parameters:
     *        - name: marque
     *          description: extrarticle marque
     *          type: string
     *          in: formData
     *        - name: ref
     *          description: extrarticle reference
     *          type: string
     *          in: formData
     *        - name: qte
     *          description: extrarticle qte
     *          type: number
     *          in: formData
     *        - name: model
     *          description: extrarticle model
     *          type: string
     *          in: formData
     *        - name: num_serie
     *          description: extrarticle num serie
     *          type: string
     *          in: formData
     *        - name: fournisseur
     *          description: extrarticle fournisseur
     *          type: string
     *          in: formData
     *        - name: nom
     *          description: extrarticle nom
     *          type: string
     *          in: formData
     *        - name: description
     *          description: extrarticle description
     *          type: string
     *          in: formData
     *        - name: qte_manquante
     *          description: extrarticle qte manquante
     *          type: string
     *          in: formData
     *      security:              
     *      - Bearer: [] 
     *      responses:
     *        200:
     *          description: OK
     *        204:
     *          description: No Content
     */
    app.post('/api/extrarticles/add',
    passport_client.authenticate('client-rule', { session: false }),
    extrarticlecontroller.addExtrarticle);
    

}
