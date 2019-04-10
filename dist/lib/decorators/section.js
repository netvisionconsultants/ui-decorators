"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hasSection(_a) {
    var name = _a.name, title = _a.title;
    return function (constructor) {
        if (!constructor.prototype._hasSections) {
            constructor.prototype._hasSections = {};
        }
        constructor.prototype._hasSections[name] = { name: name, title: title, components: [] };
    };
}
exports.hasSection = hasSection;
//# sourceMappingURL=section.js.map