
const usercontroller = require("../../controllers/user");
const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports.setup = function(app) {


app.post('/api/users/inscription', usercontroller.addUser);


app.post('/api/login', usercontroller.loginUser);


app.get('/api/current', passport.authenticate('jwt', { session: false }), usercontroller.currentUser);


}
