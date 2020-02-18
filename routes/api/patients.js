
const patientcontroller = require("../../controllers/patient");
const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports.setup = function(app) {


app.post('/api/patients/inscription', patientcontroller.addPatient);


app.post('/api/login', patientcontroller.loginPatient);


app.get('/api/current', passport.authenticate('jwt', { session: false }), patientcontroller.currentPatient);


}
