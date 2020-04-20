
const articlecontroller = require("../../controllers/article");
const jwt = require('jsonwebtoken');
const passport = require('passport');
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
     * /articles/add:
     *   post:
     *     description: client inscription
     *     tags: [Article]
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: ref
     *         description: reference article
     *         required: true
     *         type: string
     *         in: formData
     *       - name: ref_geo
     *         description: ref. art. geoNegoce
     *         type: string
     *         in: formData
     *       - name: fournisseur
     *         description: fournisseur
     *         type: string
     *         in: formData
     *       - name: designation
     *         description: designation
     *         type: string
     *         in: formData
     *       - name: prix_achat
     *         description: prix_achat
     *         type: string
     *         in: formData
     *       - name: prix_vente
     *         description: prix_vente
     *         required: true
     *         type: string
     *         in: formData
     *       - name: qte
     *         description: qte
     *         type: string
     *         in: formData
     *       - name: poids
     *         description: poids
     *         in: formData
     *       - name: volume
     *         description: volume
     *         type: string
     *         in: formData
     *       - name: marque
     *         description: marque
     *         type: string
     *         in: formData
     *       - name: categorie
     *         description: categorie
     *         type: string
     *         in: formData
     *       - name: adaptable
     *         description: is adaptable 
     *         type: boolean
     *         in: formData
     *       - name: remise
     *         description: remise
     *         type: number
     *         in: formData
     *       - name: nom
     *         description: nom article
     *         type: string
     *         in: formData
     *       - name: tva
     *         description: tva
     *         type: number
     *         in: formData
     *       - name: image
     *         description: image article
     *         type: file
     *         in: formData
     *       - name: files
     *         description: files
     *         type: file
     *         in: formData
     *       - name: description
     *         description: description
     *         type: string
     *         in: formData
     *     responses:
     *       200:
     *         description: Success
     *       204:
     *         description: No Content
     */
    app.post('/articles/add',
        //passport.authenticate('jwt', { session: false }),
        upload.fields([
            { name: "image", maxCount: 1 },
            {
                name: "files",
                maxCount: 100
            }
        ]),
        articlecontroller.addArticle);

    /**
     * @swagger
     * /articles/update:
     *   post:
     *     description: client inscription
     *     tags: [Article]
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: article id
     *         required: true
     *         type: string
     *         in: formData
     *       - name: ref
     *         description: reference article
     *         required: true
     *         type: string
     *         in: formData
     *       - name: ref_geo
     *         description: ref. art. geoNegoce
     *         type: string
     *         in: formData
     *       - name: fournisseur
     *         description: fournisseur
     *         type: string
     *         in: formData
     *       - name: designation
     *         description: designation
     *         type: string
     *         in: formData
     *       - name: prix_achat
     *         description: prix_achat
     *         type: string
     *         in: formData
     *       - name: prix_vente
     *         description: prix_vente
     *         required: true
     *         type: string
     *         in: formData
     *       - name: qte
     *         description: qte
     *         type: string
     *         in: formData
     *       - name: poids
     *         description: poids
     *         in: formData
     *       - name: volume
     *         description: volume
     *         type: string
     *         in: formData
     *       - name: marque
     *         description: marque
     *         type: string
     *         in: formData
     *       - name: categorie
     *         description: categorie
     *         type: string
     *         in: formData
     *       - name: adaptable
     *         description: is adaptable 
     *         type: boolean
     *         in: formData
     *       - name: remise
     *         description: remise
     *         type: number
     *         in: formData
     *       - name: nom
     *         description: nom article
     *         type: string
     *         in: formData
     *       - name: tva
     *         description: tva
     *         type: number
     *         in: formData
     *       - name: image
     *         description: image article
     *         type: file
     *         in: formData
     *       - name: files
     *         description: files
     *         type: file
     *         in: formData
     *       - name: description
     *         description: description
     *         type: string
     *         in: formData
     *     responses:
     *       200:
     *         description: Success
     *       204:
     *         description: No Content
     */
    app.post('/articles/update',
        //passport.authenticate('jwt', { session: false }),
        upload.fields([
            { name: "image", maxCount: 1 },
            {
                name: "files",
                maxCount: 100
            }
        ]),
        articlecontroller.updateArticle);

    /**
       * @swagger
       * /articles/all:
       *   get:
       *     description: client current
       *     tags: [Article]
       *     produces:
       *       - application/json
       *     responses:
       *       200:
       *         description: Success
       *       204:
       *         description: No Content
       */
    app.get('/articles/all',
        //passport.authenticate('jwt', { session: false }),
        articlecontroller.allArticles);

    /**
     * @swagger
     * /articles/delete/{id}:
     *   delete:
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
     *     responses:
     *       200:
     *         description: Success
     *       204:
     *         description: No Content
     */
    app.delete('/articles/delete/:id',
        //passport.authenticate('jwt', { session: false }),
        articlecontroller.deleteArticle);

   /**
     * @swagger
     * /articles/get/{id}:
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
     *     responses:
     *       200:
     *         description: Success
     *       204:
     *         description: No Content
     */
    app.get('/articles/get/:id',
        //passport.authenticate('jwt', { session: false }),
        articlecontroller.getArticle);



}
