"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var source_1 = require("./decorators/source");
exports.source = source_1.source;
var table_1 = require("./decorators/table");
exports.table = table_1.table;
var field_1 = require("./decorators/field");
exports.field = field_1.field;
var link_1 = require("./decorators/link");
exports.link = link_1.link;
var documentId_1 = require("./decorators/documentId");
exports.documentId = documentId_1.documentId;
var UIComponent = /** @class */ (function () {
    function UIComponent() {
    }
    UIComponent.prototype.renderComponent = function () {
        var component = {
            components: [],
            documentId: '',
            source: ''
        };
        for (var k in this) {
            if (k.endsWith('UIField')) {
                component.components.push(this[k]);
            }
            if (k.endsWith('UITable')) {
                component.components.push(this[k]);
            }
            if (k.endsWith('UILink')) {
                component.components.push(this[k]);
            }
            if (k === '_source') {
                component.source = this[k];
            }
            if (k === '_documentId') {
                component.documentId = this[k];
            }
        }
        return component;
    };
    return UIComponent;
}());
exports.default = UIComponent;
//# sourceMappingURL=ui-component.js.map