const engincontroller = require("../../controllers/engin");
const jwt = require('jsonwebtoken');
// const passport = require('passport');
const passport_client = require('passport');

module.exports.setup = function(app) {

/**
     * @swagger
     * /api/engins/add:
     *    post:
     *      description: add Engin
     *      tags: [Engin]
     *      produces:
     *      - application/json
     *      parameters:
     *        - name: marque
     *          description: engin marque
     *          type: string
     *          in: formData
     *        - name: type
     *          description: engin type
     *          type: string
     *          in: formData
     *        - name: model
     *          description: engin model
     *          type: string
     *          in: formData
     *        - name: num_serie
     *          description: engin num serie
     *          type: string
     *          in: formData
     *        - name: immatriculation
     *          description: engin immatriculation
     *          type: string
     *          in: formData
     *        - name: num_parq
     *          description: engin num parq
     *          type: string
     *          in: formData
     *        - name: client
     *          description: engin client
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
    app.post('/api/engins/add',
    passport_client.authenticate('client-rule', { session: false }),
    engincontroller.addEngin);

    /**
     * @swagger
     * /api/engins/client/all/{clientId}:
     *   get:
     *     description: all engins
     *     tags: [Engin]
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: clientId
     *         description: paginator clientId
     *         required: true
     *         type: string
     *         in: path
     *     security:              
     *      - Bearer: [] 
     *     responses:
     *       200:
     *         description: Success
     *       204:
     *         description: No Content
     */
  app.get('/api/engins/client/all/:clientId',
  passport_client.authenticate('client-rule', { session: false }),
    engincontroller.allClientEngins);


/**
   * @swagger
   * /api/engins/get/{id}:
   *   get:
   *     description: get engin 
   *     tags: [Engin]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: engin id
   *         required: true
   *         type: string
   *         in: path
   *     security:              
   *      - Bearer: [] 
   *     responses:
   *       200:
   *         description: Success
   *       204:
   *         description: No Content
   */
  app.get('/api/engins/get/:id',
  passport_client.authenticate('client-rule', { session: false }),
    engincontroller.getEngin);

/**
     * @swagger
     * /api/engins/delete/{id}:
     *   delete:
     *     description: delete engin
     *     tags: [Engin]
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: engin id
     *         required: true
     *         type: string
     *         in: path
     *     security:              
     *      - Bearer: [] 
     *     responses:
     *       200:
     *         description: Success
     *       204:
     *         description: No Content
     */
    app.delete('/api/engins/delete/:id',
    passport_client.authenticate('client-rule', { session: false }),
        engincontroller.deleteEngin);

/**
     * @swagger
     * /api/engins/update:
     *    post:
     *      description: add Engin
     *      tags: [Engin]
     *      produces:
     *      - application/json
     *      parameters:
     *        - name: id
     *          description: engin id
     *          type: string
     *          in: formData
     *        - name: marque
     *          description: engin marque
     *          type: string
     *          in: formData
     *        - name: type
     *          description: engin type
     *          type: string
     *          in: formData
     *        - name: model
     *          description: engin model
     *          type: string
     *          in: formData
     *        - name: num_serie
     *          description: engin num serie
     *          type: string
     *          in: formData
     *        - name: immatriculation
     *          description: engin immatriculation
     *          type: string
     *          in: formData
     *        - name: num_parq
     *          description: engin num parq
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
    app.post('/api/engins/update',
    passport_client.authenticate('client-rule', { session: false }),
    engincontroller.updateEngin);

}
