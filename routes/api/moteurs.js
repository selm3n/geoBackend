const moteurcontroller = require("../../controllers/moteur");
const jwt = require('jsonwebtoken');
// const passport = require('passport');
const passport_client = require('passport');

module.exports.setup = function(app) {

/**
     * @swagger
     * /api/moteur/add:
     *    post:
     *      description: add Moteur
     *      tags: [Moteur]
     *      produces:
     *      - application/json
     *      parameters:
     *        - name: marque
     *          description: moteur marque
     *          type: string
     *          in: formData
     *        - name: model
     *          description: moteur model
     *          type: string
     *          in: formData
     *        - name: num_arrg
     *          description: moteur num arrg
     *          type: string
     *          in: formData
     *        - name: num_serie
     *          description: moteur num serie
     *          type: string
     *          in: formData
     *        - name: monte_engin
     *          description: moteur monte engin
     *          type: string
     *          in: formData
     *        - name: num_parq
     *          description: moteur num parq
     *          type: string
     *          in: formData
     *        - name: engin
     *          description: moteur engin
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
    app.post('/api/moteur/add',
    passport_client.authenticate('client-rule', { session: false }),
    moteurcontroller.addMoteur);

    /**
     * @swagger
     * /api/moteurs/client/all:
     *   get:
     *     description: all moteurs
     *     tags: [Moteur]
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
  app.get('/api/moteurs/client/all',
  passport_client.authenticate('client-rule', { session: false }),
    moteurcontroller.allClientMoteurs);


/**
   * @swagger
   * /api/moteurs/get/{id}:
   *   get:
   *     description: get moteur 
   *     tags: [Moteur]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: moteur id
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
  app.get('/api/moteurs/get/:id',
  passport_client.authenticate('client-rule', { session: false }),
    moteurcontroller.getMoteur);

/**
     * @swagger
     * /api/moteurs/delete/{id}:
     *   delete:
     *     description: delete moteur
     *     tags: [Moteur]
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: moteur id
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
    app.delete('/api/moteurs/delete/:id',
    passport_client.authenticate('client-rule', { session: false }),
        moteurcontroller.deleteMoteur);

/**
     * @swagger
     * /api/moteurs/update:
     *    post:
     *      description: add Moteur
     *      tags: [Moteur]
     *      produces:
     *      - application/json
     *      parameters:
     *        - name: id
     *          description: moteur id
     *          type: string
     *          in: formData
     *        - name: marque
     *          description: moteur marque
     *          type: string
     *          in: formData
     *        - name: model
     *          description: moteur model
     *          type: string
     *          in: formData
     *        - name: num_arrg
     *          description: moteur num arrg
     *          type: string
     *          in: formData
     *        - name: num_serie
     *          description: moteur num serie
     *          type: string
     *          in: formData
     *        - name: monte_engin
     *          description: moteur monte engin
     *          type: string
     *          in: formData
     *        - name: num_parq
     *          description: moteur num parq
     *          type: string
     *          in: formData
     *        - name: engin
     *          description: moteur engin
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
    app.post('/api/moteurs/update',
    passport_client.authenticate('client-rule', { session: false }),
    moteurcontroller.updateMoteur);

}