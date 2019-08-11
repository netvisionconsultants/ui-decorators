"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
function field(_a) {
    var label = _a.label, _b = _a.displayEmpty, displayEmpty = _b === void 0 ? false : _b, _c = _a.longValue, longValue = _c === void 0 ? false : _c, transform = _a.transform, section = _a.section;
    return function (target, propName) {
        Object.defineProperty(target, propName + "-UIField", {
            get: function () {
                return __assign({ label: label,
                    longValue: longValue,
                    displayEmpty: displayEmpty, type: 'field', fieldName: propName, value: transform ? transform(this[propName]) : this[propName] }, (section && { section: section }));
            },
            enumerable: true
        });
    };
}
exports.field = field;
//# sourceMappingURL=field.js.map