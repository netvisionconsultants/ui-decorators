"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function documentId() {
    return function (target, propName) {
        Object.defineProperty(target, "_documentId", {
            get: function () {
                return this[propName];
            },
            enumerable: true
        });
    };
}
exports.documentId = documentId;
//# sourceMappingURL=documentId.js.map