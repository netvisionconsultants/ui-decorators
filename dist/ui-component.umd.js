(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.uiComponent = factory());
}(this, (function () { 'use strict';

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

    return UIComponent;

})));
//# sourceMappingURL=ui-component.umd.js.map
