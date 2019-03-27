"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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