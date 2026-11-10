"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.months = exports.PI = void 0;
exports.SayHi = SayHi;
exports.PI = 3.14;
exports.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function SayHi(name) {
    return ("Hello, " + name);
}
class User {
    title;
    name;
    constructor(title, name) {
        this.title = title;
        this.name = name;
    }
    concat() {
        return this.title + " " + this.name;
    }
}
exports.User = User;
//# sourceMappingURL=modulo.js.map