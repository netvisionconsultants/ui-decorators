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
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder = exports.SortOrder || (exports.SortOrder = {}));
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
exports.createTable = createTable;
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
exports.table = table;
//# sourceMappingURL=table.js.map