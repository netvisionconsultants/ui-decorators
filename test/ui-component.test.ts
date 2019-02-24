import UIComponent, {
    field,
    source,
    FieldArgs,
    Component,
} from "../src/ui-component";

describe("UIComponent", () => {
    it("UIComponent is instantiable", () => {
        expect(new UIComponent()).toBeInstanceOf(UIComponent);
    });

    it("source() adds the _source field to a contructor", () => {
        const konstructor = { prototype: {} };
        source('name')(konstructor);
        expect(konstructor.prototype).toHaveProperty('_source');
        expect((konstructor.prototype as any)._source).toEqual('name');
    });

    it("field() defines the new property", () => {
        const target: any = { testProp: 'originalVal' };
        const prop = 'testProp';
        const args: FieldArgs = {
            label: 'label',
            transform: val => `${val}-test`,
        };
        field(args)(target, prop);
        const testField: Object = target['testProp-UIField'];
        expect(testField).toHaveProperty('label');
        expect(testField).toHaveProperty('type');
        expect(testField).toHaveProperty('value');
    });

    it("UIComponent.renderComponent() should return default JSON", () => {
        const component = new UIComponent();
        const jsonStr = component.renderComponent();
        const json = JSON.parse(jsonStr);
        expect(json).toHaveProperty('fields');
        expect(json).toHaveProperty('source');
    });

    it("UIComponent.renderComponent() should add UIFields", () => {
        @source("Telegeography")
        class TestComponent extends UIComponent {
            @field({ label: 'label', transform: val => `${val}-changed` })
            foo: string;

            constructor(foo: string) {
                super();
                this.foo = foo;
            }
        }
        const testComponent = new TestComponent('foo');
        const jsonStr: string = testComponent.renderComponent();
        const json: Object = JSON.parse(jsonStr);
        expect(json).toHaveProperty('fields');
        expect((json as any).fields[0]).toHaveProperty('label');
        expect((json as any).fields[0]).toHaveProperty('type');
        expect((json as any).fields[0]).toHaveProperty('value');
        expect((json as any).fields[0].label).toEqual('label');
        expect((json as any).fields[0].type).toEqual('field');
        expect((json as any).fields[0].value).toEqual('foo-changed');
    });

    it("UIComponent.renderComponent() should add source field", () => {
        @source("Telegeography")
        class TestComponent extends UIComponent {
            @field({ label: 'label', transform: val => `${val}-changed` })
            foo: string;

            constructor(foo: string) {
                super();
                this.foo = foo;
            }
        }
        const testComponent = new TestComponent('foo');
        const jsonStr: string = testComponent.renderComponent();
        const json: Object = JSON.parse(jsonStr);
        expect(json).toHaveProperty('source');
        expect((json as any).source).toEqual('Telegeography');
    });
});
