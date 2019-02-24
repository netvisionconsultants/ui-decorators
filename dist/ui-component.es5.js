function source(name) {
    return function (constructor) {
        constructor.prototype._source = name;
    };
}
function field(_a) {
    var label = _a.label, transform = _a.transform;
    return function (target, propName) {
        Object.defineProperty(target, propName + "-UIField", {
            get: function () {
                return ({
                    label: label,
                    type: 'field',
                    value: transform(this[propName])
                });
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
            source: '',
        };
        for (var k in this) {
            if (k.endsWith("UIField")) {
                component.fields.push(this[k]);
            }
            if (k === '_source') {
                component.source = this[k];
            }
        }
        return JSON.stringify(component);
    };
    return UIComponent;
}());

export default UIComponent;
export { source, field };
//# sourceMappingURL=ui-component.es5.js.map
