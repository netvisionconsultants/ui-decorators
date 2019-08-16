"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var source_1 = require("./decorators/class/source");
exports.source = source_1.source;
var table_1 = require("./decorators/property/table");
exports.table = table_1.table;
var field_1 = require("./decorators/property/field");
exports.field = field_1.field;
var link_1 = require("./decorators/property/link");
exports.link = link_1.link;
var documentId_1 = require("./decorators/property/documentId");
exports.documentId = documentId_1.documentId;
var documentName_1 = require("./decorators/property/documentName");
exports.documentName = documentName_1.documentName;
var documentType_1 = require("./decorators/class/documentType");
exports.documentType = documentType_1.documentType;
var tableField_1 = require("./decorators/property/tableField");
exports.tableField = tableField_1.tableField;
var geo_1 = require("./decorators/geo");
exports.geoId = geo_1.geoId;
exports.geoDataType = geo_1.geoDataType;
exports.geoDisplayName = geo_1.geoDisplayName;
exports.geoColor = geo_1.geoColor;
exports.geoLocations = geo_1.geoLocations;
exports.geoDataSuperType = geo_1.geoDataSuperType;
exports.geoImage = geo_1.geoImage;
exports.geoImageDirection = geo_1.geoImageDirection;
var UIDocument = /** @class */ (function () {
    function UIDocument() {
    }
    UIDocument.prototype.getTableColumns = function () {
        var tableColumns = [];
        for (var k in this) {
            if (k.endsWith('-UITableField')) {
                var _a = this[k], fieldName = _a.fieldName, label = _a.label;
                tableColumns.push({
                    accessor: fieldName,
                    label: label
                });
            }
        }
        return tableColumns;
    };
    UIDocument.prototype.renderDocumentAsTabular = function () {
        var row = {};
        for (var k in this) {
            if (k.endsWith('-UITableField')) {
                var _a = this[k], fieldName = _a.fieldName, value = _a.value;
                row[fieldName] = value;
            }
        }
        return row;
    };
    UIDocument.prototype.renderGeoDocument = function () {
        var geoComponent = {
            source: '',
            documentId: '',
            dataType: '',
            geoType: '',
            locations: '',
            image: '',
            imageDirection: '',
            displayName: '',
            color: '',
            geoDataSuperType: ''
        };
        for (var k in this) {
            if (k.endsWith('GeoId')) {
                geoComponent.documentId = this[k];
            }
            else if (k.endsWith('GeoColor')) {
                geoComponent.color = this[k];
            }
            else if (k.endsWith('GeoDataType')) {
                geoComponent.dataType = this[k];
            }
            else if (k.endsWith('GeoDisplayName')) {
                geoComponent.displayName = this[k];
            }
            else if (k.endsWith('GeoImage')) {
                geoComponent.image = this[k];
            }
            else if (k.endsWith('GeoImageDirection')) {
                geoComponent.imageDirection = this[k];
            }
            else if (k.endsWith('GeoLocations')) {
                geoComponent.locations = this[k].value;
                geoComponent.geoType = this[k].type;
            }
            else if (k === '_source') {
                geoComponent.source = this[k];
            }
            else if (k === '_geoDataSuperType') {
                geoComponent.geoDataSuperType = this[k];
            }
        }
        return geoComponent;
    };
    UIDocument.prototype.renderDocument = function () {
        var body = {
            components: [],
            documentId: '',
            documentName: '',
            documentType: '',
            source: ''
        };
        for (var k in this) {
            if (k.endsWith('UIField') || k.endsWith('UITable') || k.endsWith('UILink')) {
                var component = this[k];
                body.components.push(component);
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
        return body;
    };
    return UIDocument;
}());
exports.default = UIDocument;
//# sourceMappingURL=ui-component.js.map