"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function source(name) {
    return function (constructor) {
        constructor.prototype._source = name;
    };
}
exports.source = source;
//# sourceMappingURL=source.js.map