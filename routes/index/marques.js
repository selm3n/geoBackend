const marquecontroller = require("../../controllers/marque");
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
     * /marques/add:
     *   post:
     *     description: client inscription
     *     tags: [Marque]
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: nom
     *         description: nom marque
     *         type: string
     *         in: formData
     *       - name: image
     *         description: image marque
     *         type: file
     *         in: formData
     *     responses:
     *       200:
     *         description: Success
     *       204:
     *         description: No Content
     */
    app.post('/marques/add',
        upload.fields([
            { name: "image", maxCount: 1 },
        ]),
        marquecontroller.addMarque);

/**
     * @swagger
     * /marques/update:
     *   post:
     *     description: client inscription
     *     tags: [Marque]
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: marque id
     *         required: true
     *         type: string
     *         in: formData
     *       - name: nom
     *         description: nom marque
     *         type: string
     *         in: formData
     *       - name: image
     *         description: image marque
     *         type: file
     *         in: formData
     *     responses:
     *       200:
     *         description: Success
     *       204:
     *         description: No Content
     */
    app.post('/marques/update',
        //passport.authenticate('jwt', { session: false }),
        upload.fields([
            { name: "image", maxCount: 1 },
            
        ]),
        marquecontroller.updateMarque);

/**
     * @swagger
     * /marques/delete/{id}:
     *   delete:
     *     description: client current
     *     tags: [Marque]
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: marque id
     *         required: true
     *         type: string
     *         in: path
     *     responses:
     *       200:
     *         description: Success
     *       204:
     *         description: No Content
     */
    app.delete('/marques/delete/:id',
        marquecontroller.deleteMarque);

}
