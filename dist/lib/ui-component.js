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
var documentName_1 = require("./decorators/documentName");
exports.documentName = documentName_1.documentName;
var documentType_1 = require("./decorators/documentType");
exports.documentType = documentType_1.documentType;
var section_1 = require("./decorators/section");
exports.hasSection = section_1.hasSection;
var UIComponent = /** @class */ (function () {
    function UIComponent() {
    }
    UIComponent.prototype.renderComponent = function () {
        var sections = {};
        var body = {
            components: [],
            sections: [],
            documentId: '',
            documentName: '',
            documentType: '',
            source: ''
        };
        for (var k in this) {
            if (k.endsWith('UIField') || k.endsWith('UITable') || k.endsWith('UILink')) {
                var component = this[k];
                if (component.section) {
                    if (!sections[component.section]) {
                        sections[component.section] = { components: [] };
                    }
                    sections[component.section].components.push(this[k]);
                }
                else {
                    body.components.push(component);
                }
            }
            else if (k === '_source') {
                body.source = this[k];
            }
            else if (k === '_documentId') {
                body.documentId = this[k];
            }
            else if (k === '_documentName') {
                body.documentName = this[k];
            }
            else if (k === '_documentType') {
                body.documentType = this[k];
            }
        }
        for (var key in sections) {
            body.sections.push({
                type: 'section',
                title: this['_hasSections'][key].title,
                order: this['_hasSections'][key].order,
                components: sections[key].components
            });
        }
        return body;
    };
    return UIComponent;
}());
exports.default = UIComponent;
//# sourceMappingURL=ui-component.js.map