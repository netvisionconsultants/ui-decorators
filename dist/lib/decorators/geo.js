"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function geoDataSuperType(name) {
    return function (constructor) {
        constructor.prototype._geoDataSuperType = name;
    };
}
exports.geoDataSuperType = geoDataSuperType;
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
exports.propertyDecoratorBuilder = propertyDecoratorBuilder;
function geoId(args) {
    return propertyDecoratorBuilder('GeoId', args);
}
exports.geoId = geoId;
function geoDataType(args) {
    return propertyDecoratorBuilder('GeoDataType', args);
}
exports.geoDataType = geoDataType;
function geoDisplayName(args) {
    return propertyDecoratorBuilder('GeoDisplayName', args);
}
exports.geoDisplayName = geoDisplayName;
function geoImage(args) {
    return propertyDecoratorBuilder('GeoImage', args);
}
exports.geoImage = geoImage;
function geoImageDirection(args) {
    return propertyDecoratorBuilder('GeoImageDirection', args);
}
exports.geoImageDirection = geoImageDirection;
function geoColor(args) {
    return propertyDecoratorBuilder('GeoColor', args);
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
//# sourceMappingURL=geo.js.map