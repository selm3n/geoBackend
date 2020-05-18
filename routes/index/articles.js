
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
     *       - name: poids_carton
     *         description: poids carton
     *         type: string
     *         in: formData
     *       - name: volume_carton
     *         description: volume carton
     *         type: string
     *         in: formData
     *       - name: prix_remise
     *         description: prix remise
     *         type: string
     *         in: formData
     *       - name: monnaie
     *         description: monnaie
     *         type: string
     *         in: formData
     *       - name: code_remise
     *         description: code remise
     *         type: string
     *         in: formData
     *       - name: pourcentage_remise
     *         description: pourcentage remise
     *         type: string
     *         in: formData
     *       - name: unite_vente
     *         description: unite vente
     *         type: string
     *         in: formData
     *       - name: carton_euro
     *         description: carton_euro
     *         type: string
     *         in: formData
     *       - name: palette_euro
     *         description: palette euro
     *         type: string
     *         in: formData
     *       - name: palette_qte
     *         description: palette qte
     *         type: number
     *         in: formData
     *       - name: code_douanier
     *         description: code douanier
     *         type: string
     *         in: formData
     *       - name: ean_code
     *         description: ean code
     *         type: string
     *         in: formData
     *       - name: pays_origine
     *         description: pays origine
     *         type: string
     *         in: formData
     *       - name: hazardous_good
     *         description: hazardous good
     *         type: string
     *         in: formData
     *       - name: longueur
     *         description: longueur
     *         type: number
     *         in: formData
     *       - name: largeur
     *         description: largeur
     *         type: number
     *         in: formData
     *       - name: hauteur
     *         description: hauteur
     *         type: number
     *         in: formData
     *       - name: subpac_type
     *         description: subpac_type
     *         type: string
     *         in: formData
     *       - name: subpac_longueur
     *         description: subpac longueur
     *         type: number
     *         in: formData
     *       - name: subpac_largeur
     *         description: subpac largeur
     *         type: number
     *         in: formData
     *       - name: subpac_hauteur
     *         description: subpac_hauteur
     *         type: number
     *         in: formData
     *       - name: subpac_poids
     *         description: subpac poids
     *         type: string
     *         in: formData
     *       - name: subpac_qte
     *         description: subpac qte
     *         type: string
     *         in: formData
     *       - name: carton_type
     *         description: carton type
     *         type: string
     *         in: formData
     *       - name: longueur_carton
     *         description: longueur carton
     *         type: number
     *         in: formData
     *       - name: largeur_carton
     *         description: largeur carton
     *         type: number
     *         in: formData
     *       - name: hauteur_carton
     *         description: hauteur carton
     *         type: number
     *         in: formData
     *       - name: carton_qte
     *         description: carton qte
     *         type: number
     *         in: formData
     *       - name: source
     *         description: source
     *         type: string
     *         in: formData
     *       - name: model
     *         description: model
     *         type: string
     *         in: formData
     *       - name: num_serie
     *         description: numero de serie
     *         type: string
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
     *       - name: poids_carton
     *         description: poids carton
     *         type: string
     *         in: formData
     *       - name: volume_carton
     *         description: volume carton
     *         type: string
     *         in: formData
     *       - name: prix_remise
     *         description: prix remise
     *         type: string
     *         in: formData
     *       - name: monnaie
     *         description: monnaie
     *         type: string
     *         in: formData
     *       - name: code_remise
     *         description: code remise
     *         type: string
     *         in: formData
     *       - name: pourcentage_remise
     *         description: pourcentage remise
     *         type: string
     *         in: formData
     *       - name: unite_vente
     *         description: unite vente
     *         type: string
     *         in: formData
     *       - name: carton_euro
     *         description: carton_euro
     *         type: string
     *         in: formData
     *       - name: palette_euro
     *         description: palette euro
     *         type: string
     *         in: formData
     *       - name: palette_qte
     *         description: palette qte
     *         type: number
     *         in: formData
     *       - name: code_douanier
     *         description: code douanier
     *         type: string
     *         in: formData
     *       - name: ean_code
     *         description: ean code
     *         type: string
     *         in: formData
     *       - name: pays_origine
     *         description: pays origine
     *         type: string
     *         in: formData
     *       - name: hazardous_good
     *         description: hazardous good
     *         type: string
     *         in: formData
     *       - name: longueur
     *         description: longueur
     *         type: number
     *         in: formData
     *       - name: largeur
     *         description: largeur
     *         type: number
     *         in: formData
     *       - name: hauteur
     *         description: hauteur
     *         type: number
     *         in: formData
     *       - name: subpac_type
     *         description: subpac_type
     *         type: string
     *         in: formData
     *       - name: subpac_longueur
     *         description: subpac longueur
     *         type: number
     *         in: formData
     *       - name: subpac_largeur
     *         description: subpac largeur
     *         type: number
     *         in: formData
     *       - name: subpac_hauteur
     *         description: subpac_hauteur
     *         type: number
     *         in: formData
     *       - name: subpac_poids
     *         description: subpac poids
     *         type: string
     *         in: formData
     *       - name: subpac_qte
     *         description: subpac qte
     *         type: string
     *         in: formData
     *       - name: carton_type
     *         description: carton type
     *         type: string
     *         in: formData
     *       - name: longueur_carton
     *         description: longueur carton
     *         type: number
     *         in: formData
     *       - name: largeur_carton
     *         description: largeur carton
     *         type: number
     *         in: formData
     *       - name: hauteur_carton
     *         description: hauteur carton
     *         type: number
     *         in: formData
     *       - name: carton_qte
     *         description: carton qte
     *         type: number
     *         in: formData
     *       - name: source
     *         description: source
     *         type: string
     *         in: formData
     *       - name: model
     *         description: model
     *         type: string
     *         in: formData
     *       - name: num_serie
     *         description: numero de serie
     *         type: string
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
       * /articles/all/{offset}:
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
       *     responses:
       *       200:
       *         description: Success
       *       204:
       *         description: No Content
       */
    app.get('/articles/all/:offset',
        //passport.authenticate('jwt', { session: false }),
        articlecontroller.allArticles);

      /**
     * @swagger
     * /articles/length:
     *   get:
     *     description: articles length
     *     tags: [Article]
     *     responses:
     *       200:
     *         description: Success
     *       204:
     *         description: No Content
     */
  app.get('/articles/length',
  articlecontroller.articlesLength);

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
