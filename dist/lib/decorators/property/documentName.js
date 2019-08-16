"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function documentName() {
    return function (target, propName) {
        Object.defineProperty(target, "_documentName", {
            get: function () {
                return this[propName];
            },
            enumerable: true
        });
    };
}
exports.documentName = documentName;
//# sourceMappingURL=documentName.js.map