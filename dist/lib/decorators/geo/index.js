"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.geoId = geoId;
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
exports.geoDataType = geoDataType;
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
exports.geoDisplayName = geoDisplayName;
function geoColor(args) {
    return function (target, propName) {
        Object.defineProperty(target, propName + "-GeoColor", {
            get: function () {
                return args && args.transform ? args.transform(this[propName]) : this[propName];
            },
            enumerable: true
        });
    };
}
exports.geoColor = geoColor;
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
exports.geoLocations = geoLocations;
//# sourceMappingURL=index.js.map