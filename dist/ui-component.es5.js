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

export default UIComponent;
//# sourceMappingURL=ui-component.es5.js.map
