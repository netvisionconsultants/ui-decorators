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
var section_1 = require("./decorators/section");
exports.hasSection = section_1.hasSection;
var UIComponent = /** @class */ (function () {
    function UIComponent() {
    }
    UIComponent.prototype.renderComponent = function () {
        var body = {
            components: [],
            documentId: '',
            source: ''
        };
        if (this['_hasSections']) {
            this['sections'] = this['_hasSections'];
        }
        for (var k in this) {
            if (k.endsWith('UIField') || k.endsWith('UITable') || k.endsWith('UILink')) {
                var component = this[k];
                if (component.section) {
                    this['sections'][component.section].components.push(this[k]);
                }
                else {
                    body.components.push(component);
                }
            }
            if (k === '_source') {
                body.source = this[k];
            }
            if (k === '_documentId') {
                body.documentId = this[k];
            }
        }
        for (var key in this['sections']) {
            body.components.push(__assign({ type: 'section' }, this['sections'][key]));
        }
        return body;
    };
    return UIComponent;
}());
exports.default = UIComponent;
//# sourceMappingURL=ui-component.js.map