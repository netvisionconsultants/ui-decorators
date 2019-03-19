"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var ui_component_1 = require("../src/ui-component");
describe("UIComponent", function () {
    it("UIComponent is instantiable", function () {
        expect(new ui_component_1.default()).toBeInstanceOf(ui_component_1.default);
    });
    it("source() adds the _source field to a contructor", function () {
        var konstructor = { prototype: {} };
        ui_component_1.source('name')(konstructor);
        expect(konstructor.prototype).toHaveProperty('_source');
        expect(konstructor.prototype._source).toEqual('name');
    });
    it("field() defines the new property", function () {
        var target = { testProp: 'originalVal' };
        var prop = 'testProp';
        var args = {
            label: 'label',
            transform: function (val) { return val + "-test"; },
        };
        ui_component_1.field(args)(target, prop);
        var testField = target['testProp-UIField'];
        expect(testField).toHaveProperty('label');
        expect(testField).toHaveProperty('type');
        expect(testField).toHaveProperty('value');
    });
    it("field() works without transform function defined", function () {
        var target = { testProp: 'originalVal' };
        var prop = 'testProp';
        var args = {
            label: 'label',
        };
        ui_component_1.field(args)(target, prop);
        var testField = target['testProp-UIField'];
        expect(testField).toHaveProperty('label');
        expect(testField).toHaveProperty('type');
        expect(testField).toHaveProperty('value');
    });
    it("UIComponent.renderComponent() should return default JSON", function () {
        var component = new ui_component_1.default();
        var jsonStr = component.renderComponent();
        var json = JSON.parse(jsonStr);
        expect(json).toHaveProperty('fields');
        expect(json).toHaveProperty('source');
    });
    it("UIComponent.renderComponent() should add UIFields", function () {
        var TestComponent = /** @class */ (function (_super) {
            __extends(TestComponent, _super);
            function TestComponent(foo) {
                var _this = _super.call(this) || this;
                _this.foo = foo;
                return _this;
            }
            __decorate([
                ui_component_1.field({ label: 'label', transform: function (val) { return val + "-changed"; } }),
                __metadata("design:type", String)
            ], TestComponent.prototype, "foo", void 0);
            TestComponent = __decorate([
                ui_component_1.source("Telegeography"),
                __metadata("design:paramtypes", [String])
            ], TestComponent);
            return TestComponent;
        }(ui_component_1.default));
        var testComponent = new TestComponent('foo');
        var jsonStr = testComponent.renderComponent();
        var json = JSON.parse(jsonStr);
        expect(json).toHaveProperty('fields');
        expect(json.fields[0]).toHaveProperty('label');
        expect(json.fields[0]).toHaveProperty('type');
        expect(json.fields[0]).toHaveProperty('value');
        expect(json.fields[0].label).toEqual('label');
        expect(json.fields[0].type).toEqual('field');
        expect(json.fields[0].value).toEqual('foo-changed');
    });
    it("UIComponent.renderComponent() should add source field", function () {
        var TestComponent = /** @class */ (function (_super) {
            __extends(TestComponent, _super);
            function TestComponent(foo) {
                var _this = _super.call(this) || this;
                _this.foo = foo;
                return _this;
            }
            __decorate([
                ui_component_1.field({ label: 'label', transform: function (val) { return val + "-changed"; } }),
                __metadata("design:type", String)
            ], TestComponent.prototype, "foo", void 0);
            TestComponent = __decorate([
                ui_component_1.source("Telegeography"),
                __metadata("design:paramtypes", [String])
            ], TestComponent);
            return TestComponent;
        }(ui_component_1.default));
        var testComponent = new TestComponent('foo');
        var jsonStr = testComponent.renderComponent();
        var json = JSON.parse(jsonStr);
        expect(json).toHaveProperty('source');
        expect(json.source).toEqual('Telegeography');
    });
});
//# sourceMappingURL=ui-component.test.js.map