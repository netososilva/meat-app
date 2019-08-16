"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return another !== undefined && another.email === this.email
            && another.password === this.password;
    };
    return User;
}());
exports.User = User;
exports.users = {
    "netososilva@gmail.com": new User('netososilva@gmail.com', 'Neto', '123'),
    "camillam.s@gmail.com": new User('camillam.s@gmail.com', 'Camilla', '123')
};
