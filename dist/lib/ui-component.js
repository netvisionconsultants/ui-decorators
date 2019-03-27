"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var source_1 = require("./decorators/source");
exports.source = source_1.source;
var table_1 = require("./decorators/table");
exports.table = table_1.table;
var field_1 = require("./decorators/field");
exports.field = field_1.field;
var UIComponent = /** @class */ (function () {
    function UIComponent() {
    }
    UIComponent.prototype.renderComponent = function () {
        var component = {
            fields: [],
            tables: [],
            source: ''
        };
        for (var k in this) {
            if (k.endsWith('UIField')) {
                component.fields.push(this[k]);
            }
            if (k.endsWith('UITable')) {
                component.tables.push(this[k]);
            }
            if (k === '_source') {
                component.source = this[k];
            }
        }
        return component;
    };
    return UIComponent;
}());
exports.default = UIComponent;
//# sourceMappingURL=ui-component.js.map