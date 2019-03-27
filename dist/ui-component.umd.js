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
        var title = _a.title, columns = _a.columns, sortOrder = _a.sortOrder, sortingColumn = _a.sortingColumn, transform = _a.transform;
        return function (target, propName) {
            Object.defineProperty(target, propName + "-UITable", {
                get: function () {
                    return {
                        title: title,
                        columns: columns,
                        type: 'table',
                        value: createTable(this[propName], columns, sortOrder, sortingColumn, transform)
                    };
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
                    return {
                        label: label,
                        longValue: longValue,
                        displayEmpty: displayEmpty,
                        type: 'field',
                        value: transform ? transform(this[propName]) : this[propName]
                    };
                },
                enumerable: true
            });
        };
    }

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
    exports.source = source;
    exports.table = table;
    exports.field = field;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ui-component.umd.js.map
