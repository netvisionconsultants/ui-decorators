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
        var title = _a.title, columns = _a.columns, sortOrder = _a.sortOrder, sortingColumn = _a.sortingColumn, transform = _a.transform, section = _a.section;
        return function (target, propName) {
            Object.defineProperty(target, propName + "-UITable", {
                get: function () {
                    return __assign({ title: title,
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

    function hasSection(_a) {
        var name = _a.name, title = _a.title;
        return function (constructor) {
            if (!constructor.prototype._hasSections) {
                constructor.prototype._hasSections = {};
            }
            constructor.prototype._hasSections[name] = { name: name, title: title, components: [] };
        };
    }

    var UIComponent = /** @class */ (function () {
        function UIComponent() {
        }
        UIComponent.prototype.renderComponent = function () {
            var sections = {};
            var body = {
                components: [],
                sections: {},
                documentId: '',
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
                if (k === '_source') {
                    body.source = this[k];
                }
                if (k === '_documentId') {
                    body.documentId = this[k];
                }
            }
            for (var key in sections) {
                body.sections[key] = {
                    type: 'section',
                    title: this['_hasSections'][key].title,
                    components: sections[key].components
                };
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
    exports.hasSection = hasSection;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ui-component.umd.js.map
