"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function documentType(type) {
    return function (constructor) {
        constructor.prototype._documentType = type;
    };
}
exports.documentType = documentType;
//# sourceMappingURL=documentType.js.map