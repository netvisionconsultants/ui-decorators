"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../../types");
function createTable(rows, columns, sortOrder, sortingColumn, transform) {
    if (!rows || rows.length === 0)
        return [];
    if (columns.length === 0)
        throw new Error('Columns must be provided to the table() decorator');
    var sortingColumnIdx;
    if (!sortOrder) {
        sortOrder = types_1.SortOrder.ASC;
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
            return sortOrder === types_1.SortOrder.ASC ? -1 : 1;
        }
        if (a[sortingColumnIdx] > b[sortingColumnIdx]) {
            return sortOrder === types_1.SortOrder.ASC ? 1 : -1;
        }
        return 0;
    });
    return transform ? transform(sortedRows) : sortedRows;
}
exports.createTable = createTable;
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
exports.table = table;
//# sourceMappingURL=table.js.map