"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function field(_a) {
    var label = _a.label, _b = _a.displayEmpty, displayEmpty = _b === void 0 ? false : _b, _c = _a.longValue, longValue = _c === void 0 ? false : _c, transform = _a.transform;
    return function (target, propName) {
        Object.defineProperty(target, propName + "-UIField", {
            get: function () {
                return {
                    label: label,
                    longValue: longValue,
                    displayEmpty: displayEmpty,
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