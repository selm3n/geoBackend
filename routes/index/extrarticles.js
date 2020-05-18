const extrarticlecontroller = require("../../controllers/extrarticle");
const jwt = require('jsonwebtoken');
// const passport = require('passport');
const passport_client = require('passport');

module.exports.setup = function(app) {

/**
     * @swagger
     * /extrarticles/update:
     *    post:
     *      description: update Extrarticle
     *      tags: [Extrarticle]
     *      produces:
     *      - application/json
     *      parameters:
     *        - name: id
     *          description: marque id
     *          required: true
     *          type: string
     *          in: formData
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
     *          type: number
     *          in: formData
     *        - name: added_to_articles
     *          description: extrarticle is added to articles
     *          type: boolean
     *          in: formData
     *      responses:
     *        200:
     *          description: OK
     *        204:
     *          description: No Content
     */
    app.post('/extrarticles/update',
    // passport_client.authenticate('client-rule', { session: false }),
    extrarticlecontroller.updateExtrarticle);

    /**
     * @swagger
     * /extrarticles/client/all/{idclient}:
     *   get:
     *     description: all extrarticles
     *     tags: [Extrarticle]
     *     produces:
     *       - application/json
     *     parameters:
   *       - name: idclient
   *         description: extrarticles idclient
   *         required: true
   *         type: string
   *         in: path
     *     responses:
     *       200:
     *         description: Success
     *       204:
     *         description: No Content
     */
  app.get('/extrarticles/client/all/:idclient',
//   passport_client.authenticate('client-rule', { session: false }),
    extrarticlecontroller.allClientExtrarticles);


/**
   * @swagger
   * /extrarticles/get/{id}:
   *   get:
   *     description: get extrarticle 
   *     tags: [Extrarticle]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: extrarticle id
   *         required: true
   *         type: string
   *         in: path
   *     responses:
   *       200:
   *         description: Success
   *       204:
   *         description: No Content
   */
  app.get('/extrarticles/get/:id',
//   passport_client.authenticate('client-rule', { session: false }),
    extrarticlecontroller.getExtrarticle);

/**
     * @swagger
     * /extrarticles/delete/{id}:
     *   delete:
     *     description: delete extrarticle
     *     tags: [Extrarticle]
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: extrarticle id
     *         required: true
     *         type: string
     *         in: path
     *     responses:
     *       200:
     *         description: Success
     *       204:
     *         description: No Content
     */
    app.delete('/extrarticles/delete/:id',
    //passport_client.authenticate('client-rule', { session: false }),
        extrarticlecontroller.deleteExtrarticle);

}
