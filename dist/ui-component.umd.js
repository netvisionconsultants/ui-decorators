(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.uiComponent = {})));
}(this, (function (exports) { 'use strict';

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
                  return {
                      label: label,
                      type: 'field',
                      value: transform ? transform(this[propName]) : this[propName]
                  };
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
              source: ''
          };
          for (var k in this) {
              if (k.endsWith('UIField')) {
                  component.fields.push(this[k]);
              }
              if (k === '_source') {
                  component.source = this[k];
              }
          }
          return component;
      };
      return UIComponent;
  }());

  exports.source = source;
  exports.field = field;
  exports.default = UIComponent;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ui-component.umd.js.map
