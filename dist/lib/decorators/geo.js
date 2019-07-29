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
function geoDataSuperType(name) {
    return function (constructor) {
        constructor.prototype._geoDataSuperType = name;
    };
}
exports.geoDataSuperType = geoDataSuperType;
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
                return args && args.color ? args.color : this[propName];
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
exports.geoImage = geoImage;
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
exports.geoImageDirection = geoImageDirection;
//# sourceMappingURL=geo.js.map