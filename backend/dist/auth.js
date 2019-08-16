"use strict";
exports.__esModule = true;
var users_1 = require("./users");
var jwt = require("jsonwebtoken");
var api_config_1 = require("./api-config");
exports.handleAuthentication = function (request, response) {
    var user = request.body;
    if (!isValid(user)) {
        response.status(403).json({ message: 'Dados inválidos.' });
        return;
    }
    var dbUser = users_1.users[user.email];
    var token = jwt.sign({ sub: dbUser.email, iss: 'meat-api' }, api_config_1.apiConfig.secret);
    response.json({ name: dbUser.name, email: dbUser.email, accessToken: token });
};
function isValid(user) {
    if (!user)
        return false;
    var dbUser = users_1.users[user.email];
    return dbUser !== undefined && dbUser.matches(user);
}
