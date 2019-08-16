"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tableField(_a) {
    var label = _a.label, transform = _a.transform;
    return function (target, propName) {
        Object.defineProperty(target, propName + "-UITableField", {
            get: function () {
                var component = {
                    label: label,
                    fieldName: propName,
                    type: 'tableField',
                    value: transform ? transform(this[propName]) : this[propName]
                };
                return component;
            },
            enumerable: true
        });
    };
}
exports.tableField = tableField;
//# sourceMappingURL=tableField.js.map