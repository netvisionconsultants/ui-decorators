"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function field(_a) {
    var label = _a.label, transform = _a.transform;
    return function (target, propName) {
        Object.defineProperty(target, propName + "-UIField", {
            get: function () {
                return {
                    label: label,
                    type: 'field',
                    value: transform ? transform(this[propName]) : this[propName]
                };
            },
            enumerable: true
        });
    };
}
exports.field = field;
//# sourceMappingURL=field.js.map