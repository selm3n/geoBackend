
const articlecontroller = require("../../controllers/article");
const jwt = require('jsonwebtoken');
// const passport = require('passport');
const passport_client = require('passport');
// const multer = require('../../config/multer');

var multer = require("multer");
const path = require("path");

const { check, validationResult } = require("express-validator");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
  },
  language: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.language.replace(/\s/g, ""));
  }
});
const upload = multer({
  storage: storage,
  //mimetype: "image/jpeg"
});

module.exports.setup = function (app) {

  /**
     * @swagger
     * /api/articles/all/{offset}:
     *   get:
     *     description: client current
     *     tags: [Article]
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: offset
     *         description: paginator offset
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
  app.get('/api/articles/all/:offset',
  passport_client.authenticate('client-rule', { session: false }),
    articlecontroller.allArticles);

    /**
     * @swagger
     * /api/articles/length:
     *   get:
     *     description: client current
     *     tags: [Article]
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
  app.get('/api/articles/length',
  passport_client.authenticate('client-rule', { session: false }),
  articlecontroller.articlesLength);

  /**
       * @swagger
       * /api/articles/search:
       *   post:
       *     description: client current
       *     tags: [Article]
       *     produces:
       *       - application/json
       *     parameters:
       *       - name: search
       *         description: word to search
       *         required: true
       *         type: string
       *         in: formData
       *     security:              
       *      - Bearer: [] 
       *     responses:
       *       200:
       *         description: Success
       *       204:
       *         description: No Content
       */
  app.post('/api/articles/search',
  passport_client.authenticate('client-rule', { session: false }),
    articlecontroller.searchArticles);

  /**
   * @swagger
   * /api/articles/get/{id}:
   *   get:
   *     description: client current
   *     tags: [Article]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: article id
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
  app.get('/api/articles/get/:id',
  passport_client.authenticate('client-rule', { session: false }),
    articlecontroller.getArticle);

}
