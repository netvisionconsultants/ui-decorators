(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.uiComponent = {})));
}(this, (function (exports) { 'use strict';

    function source(name) {
        return function (constructor) {
            constructor.prototype._source = name;
        };
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

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
        var label = _a.label, columns = _a.columns, sortOrder = _a.sortOrder, sortingColumn = _a.sortingColumn, transform = _a.transform, section = _a.section;
        return function (target, propName) {
            Object.defineProperty(target, propName + "-UITable", {
                get: function () {
                    return __assign({ label: label,
                        columns: columns, type: 'table', value: createTable(this[propName], columns, sortOrder, sortingColumn, transform) }, (section && { section: section }));
                },
                enumerable: true
            });
        };
    }

    function field(_a) {
        var label = _a.label, _b = _a.displayEmpty, displayEmpty = _b === void 0 ? false : _b, _c = _a.longValue, longValue = _c === void 0 ? false : _c, transform = _a.transform, section = _a.section;
        return function (target, propName) {
            Object.defineProperty(target, propName + "-UIField", {
                get: function () {
                    return __assign({ label: label,
                        longValue: longValue,
                        displayEmpty: displayEmpty, type: 'field', value: transform ? transform(this[propName]) : this[propName] }, (section && { section: section }));
                },
                enumerable: true
            });
        };
    }

    function link(_a) {
        var label = _a.label, url = _a.url, transform = _a.transform, section = _a.section;
        return function (target, propName) {
            Object.defineProperty(target, propName + "-UILink", {
                get: function () {
                    return __assign({ label: label, type: 'link', url: transform ? transform(url) : url }, (section && { section: section }));
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

    function hasSection(_a) {
        var name = _a.name, title = _a.title, order = _a.order;
        return function (constructor) {
            if (!constructor.prototype._hasSections) {
                constructor.prototype._hasSections = {};
            }
            constructor.prototype._hasSections[name] = { name: name, title: title, order: order, components: [] };
        };
    }

    function geoId(args) {
        return function (target, propName) {
            Object.defineProperty(target, propName + "-GeoId", {
                get: function () {
                    return args && args.transform ? args.transform(this[propName]) : this[propName];
                },
                enumerable: true
            });
        };
    }
    function geoDataType(args) {
        return function (target, propName) {
            Object.defineProperty(target, propName + "-GeoDataType", {
                get: function () {
                    return args && args.transform ? args.transform(this[propName]) : this[propName];
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
    function geoDisplayName(args) {
        return function (target, propName) {
            Object.defineProperty(target, propName + "-GeoDisplayName", {
                get: function () {
                    return args && args.transform ? args.transform(this[propName]) : this[propName];
                },
                enumerable: true
            });
        };
    }
    function geoColor(args) {
        return function (target, propName) {
            Object.defineProperty(target, propName + "-GeoColor", {
                get: function () {
                    return args && args.color ? args.color : this[propName];
                },
                enumerable: true
            });
        };
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
    function geoImage(args) {
        return function (target, propName) {
            Object.defineProperty(target, propName + "-GeoImage", {
                get: function () {
                    return args && args.transform ? args.transform(this[propName]) : this[propName];
                },
                enumerable: true
            });
        };
    }
    function geoImageDirection(args) {
        return function (target, propName) {
            Object.defineProperty(target, propName + "-GeoImageDirection", {
                get: function () {
                    return args && args.transform ? args.transform(this[propName]) : this[propName];
                },
                enumerable: true
            });
        };
    }

    var UIComponent = /** @class */ (function () {
        function UIComponent() {
        }
        UIComponent.prototype.renderGeoComponent = function () {
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
    exports.source = source;
    exports.table = table;
    exports.field = field;
    exports.link = link;
    exports.documentId = documentId;
    exports.documentName = documentName;
    exports.documentType = documentType;
    exports.hasSection = hasSection;
    exports.geoId = geoId;
    exports.geoDataType = geoDataType;
    exports.geoDisplayName = geoDisplayName;
    exports.geoColor = geoColor;
    exports.geoLocations = geoLocations;
    exports.geoDataSuperType = geoDataSuperType;
    exports.geoImage = geoImage;
    exports.geoImageDirection = geoImageDirection;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ui-component.umd.js.map
