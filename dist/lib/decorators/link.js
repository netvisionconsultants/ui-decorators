"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function link(_a) {
    var label = _a.label, url = _a.url, transform = _a.transform;
    return function (target, propName) {
        Object.defineProperty(target, propName + "-UILink", {
            get: function () {
                return {
                    label: label,
                    type: 'link',
                    url: transform ? transform(url) : url
                };
            },
            enumerable: true
        });
    };
}
exports.link = link;
//# sourceMappingURL=link.js.map