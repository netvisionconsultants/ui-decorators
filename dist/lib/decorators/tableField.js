"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tableField(_a) {
    var label = _a.label, transform = _a.transform;
    return function (target, propName) {
        target.tableColumns.push({
            accessor: propName,
            label: label,
        });
        Object.defineProperty(target, propName + "-UITableField", {
            get: function () {
                return {
                    label: label,
                    fieldName: propName,
                    value: transform ? transform(this[propName]) : this[propName],
                };
            },
            enumerable: true
        });
    };
}
exports.tableField = tableField;
//# sourceMappingURL=tableField.js.map