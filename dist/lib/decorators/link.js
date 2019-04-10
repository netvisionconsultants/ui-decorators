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
exports.link = link;
//# sourceMappingURL=link.js.map