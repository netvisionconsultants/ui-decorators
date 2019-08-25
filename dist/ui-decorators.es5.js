function source(name) {
    return function (constructor) {
        constructor.prototype._source = name;
    };
}

var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder || (SortOrder = {}));

function createTable(rows, columns, sortOrder, sortingColumn, transform) {
    if (!rows || rows.length === 0)
        return [];
    if (columns.length === 0)
        throw new Error('Columns must be provided to the table() decorator');
    var sortingColumnIdx;
    if (!sortOrder) {
        sortOrder = SortOrder.ASC;
    }
    if (!sortingColumn) {
        sortingColumn = columns[0];
        sortingColumnIdx = 0;
    }
    else {
        sortingColumnIdx = columns.indexOf(sortingColumn);
        if (sortingColumnIdx < 0)
            throw new Error('sortingColumn does not exist');
    }
    var mappedRows = rows.map(function (row) {
        return columns.map(function (column) {
            return row[column];
        });
    });
    var sortedRows = mappedRows.sort(function (a, b) {
        if (a[sortingColumnIdx] < b[sortingColumnIdx]) {
            return sortOrder === SortOrder.ASC ? -1 : 1;
        }
        if (a[sortingColumnIdx] > b[sortingColumnIdx]) {
            return sortOrder === SortOrder.ASC ? 1 : -1;
        }
        return 0;
    });
    return transform ? transform(sortedRows) : sortedRows;
}
function table(_a) {
    var label = _a.label, columns = _a.columns, sortOrder = _a.sortOrder, sortingColumn = _a.sortingColumn, transform = _a.transform;
    return function (target, propName) {
        Object.defineProperty(target, propName + "-UITable", {
            get: function () {
                var component = {
                    label: label,
                    columns: columns,
                    type: 'table',
                    value: createTable(this[propName], columns, sortOrder, sortingColumn, transform)
                };
                return component;
            },
            enumerable: true
        });
    };
}

function field(_a) {
    var label = _a.label, _b = _a.displayEmpty, displayEmpty = _b === void 0 ? false : _b, _c = _a.longValue, longValue = _c === void 0 ? false : _c, transform = _a.transform;
    return function (target, propName) {
        Object.defineProperty(target, propName + "-UIField", {
            get: function () {
                var component = {
                    label: label,
                    longValue: longValue,
                    displayEmpty: displayEmpty,
                    type: 'field',
                    fieldName: propName,
                    value: transform ? transform(this[propName]) : this[propName]
                };
                return component;
            },
            enumerable: true
        });
    };
}

function link(_a) {
    var label = _a.label, url = _a.url, transform = _a.transform;
    return function (target, propName) {
        Object.defineProperty(target, propName + "-UILink", {
            get: function () {
                var component = {
                    label: label,
                    type: 'link',
                    url: transform ? transform(url) : url
                };
                return component;
            },
            enumerable: true
        });
    };
}

function documentId() {
    return function (target, propName) {
        Object.defineProperty(target, "_documentId", {
            get: function () {
                return this[propName];
            },
            enumerable: true
        });
    };
}

function documentName() {
    return function (target, propName) {
        Object.defineProperty(target, "_documentName", {
            get: function () {
                return this[propName];
            },
            enumerable: true
        });
    };
}

function documentType(type) {
    return function (constructor) {
        constructor.prototype._documentType = type;
    };
}

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

function geoDataSuperType(name) {
    return function (constructor) {
        constructor.prototype._geoDataSuperType = name;
    };
}
function propertyDecoratorBuilder(suffix, args) {
    return function (target, propName) {
        Object.defineProperty(target, propName + "-" + suffix, {
            get: function () {
                return args && args.transform ? args.transform(this[propName]) : this[propName];
            },
            enumerable: true
        });
    };
}
function geoId(args) {
    return propertyDecoratorBuilder('GeoId', args);
}
function geoDataType(args) {
    return propertyDecoratorBuilder('GeoDataType', args);
}
function geoDisplayName(args) {
    return propertyDecoratorBuilder('GeoDisplayName', args);
}
function geoImage(args) {
    return propertyDecoratorBuilder('GeoImage', args);
}
function geoImageDirection(args) {
    return propertyDecoratorBuilder('GeoImageDirection', args);
}
function geoColor(args) {
    return propertyDecoratorBuilder('GeoColor', args);
}
function geoLocations(args) {
    return function (target, propName) {
        Object.defineProperty(target, propName + "-GeoLocations", {
            get: function () {
                return {
                    value: args.transform ? args.transform(this[propName]) : this[propName],
                    type: args.type
                };
            },
            enumerable: true
        });
    };
}

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

export default UIDocument;
export { source, table, field, link, documentId, documentName, documentType, tableField, geoId, geoDataType, geoDisplayName, geoColor, geoLocations, geoDataSuperType, geoImage, geoImageDirection };
//# sourceMappingURL=ui-decorators.es5.js.map
