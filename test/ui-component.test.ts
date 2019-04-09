import {} from 'ts-jest'
import UIComponent from '../src/ui-component'
import { table, SortOrder } from '../src/decorators/table'
import { field, FieldArgs } from '../src/decorators/field'
import { link, LinkArgs } from '../src/decorators/link'
import { documentId } from '../src/decorators/documentId'
import { source } from '../src/decorators/source'

describe('UIComponent', () => {
    it('UIComponent is instantiable', () => {
        expect(new UIComponent()).toBeInstanceOf(UIComponent)
    })

    it('UIComponent.renderComponent() should return default JSON', () => {
        const component = new UIComponent()
        const json = component.renderComponent()
        expect(json).toHaveProperty('components')
        expect(json).toHaveProperty('source')
    })

    it('UIComponent.renderComponent() should add UIFields', () => {
        @source('Telegeography')
        class TestComponent extends UIComponent {
            @field({ label: 'label', transform: val => `${val}-changed` })
            foo: string

            constructor(foo: string) {
                super()
                this.foo = foo
            }
        }
        const testComponent = new TestComponent('foo')
        const json: Object = testComponent.renderComponent()
        expect(json).toHaveProperty('components')
        expect((json as any).components[0]).toHaveProperty('label')
        expect((json as any).components[0]).toHaveProperty('type')
        expect((json as any).components[0]).toHaveProperty('value')
        expect((json as any).components[0].label).toEqual('label')
        expect((json as any).components[0].type).toEqual('field')
        expect((json as any).components[0].value).toEqual('foo-changed')
    })

    it('UIComponent.renderComponent() should add UITables', () => {
        @source('Telegeography')
        class TestComponent extends UIComponent {
            @table({
                title: 'Table Title',
                columns: ['col3', 'col2', 'col1'],
                sortingColumn: 'col2',
                sortOrder: SortOrder.DESC
            })
            foo: Array<any>

            constructor(foo: Array<any>) {
                super()
                this.foo = foo
            }
        }
        const rows = [
            { col2: '3', col1: 'col1', col3: 'c' },
            { col2: '4', col1: 'col1', col3: 'b' },
            { col2: '1', col1: 'col1', col3: 'e' },
            { col2: '2', col1: 'col1', col3: 'a' },
            { col2: '5', col1: 'col1', col3: 'd' }
        ]
        const testComponent = new TestComponent(rows)
        const json: Object = testComponent.renderComponent()
        expect(json).toHaveProperty('components')
        expect((json as any).components[0]).toHaveProperty('title')
        expect((json as any).components[0]).toHaveProperty('columns')
        expect((json as any).components[0]).toHaveProperty('type')
        expect((json as any).components[0]).toHaveProperty('value')
        expect((json as any).components[0].value[0]).toEqual(['d', '5', 'col1'])
    })

    it('UIComponent.renderComponent() should add source field', () => {
        @source('Telegeography')
        class TestComponent extends UIComponent {
            @field({ label: 'label', transform: val => `${val}-changed` })
            foo: string

            constructor(foo: string) {
                super()
                this.foo = foo
            }
        }
        const testComponent = new TestComponent('foo')
        const json: Object = testComponent.renderComponent()
        expect(json).toHaveProperty('source')
        expect((json as any).source).toEqual('Telegeography')
    })
    it('UIComponent.renderComponent() should add link field', () => {
        @source('Telegeography')
        class TestComponent extends UIComponent {
            @field({ label: 'label', transform: val => `${val}-changed` })
            foo: string

            @link({ label: 'label', url: 'http://www.google.com' })
            foo2: string

            constructor(foo: string, foo2: string) {
                super()
                this.foo = foo
                this.foo2 = foo2
            }
        }
        const testComponent = new TestComponent('foo', 'google')
        const json: Object = testComponent.renderComponent()
        expect((json as any).components[1]).toHaveProperty('type')
        expect((json as any).components[1].type).toEqual('link')
        expect((json as any).components[1].url).toEqual('http://www.google.com')
        expect((json as any).source).toEqual('Telegeography')
    })
    it('UIComponent.renderComponent() should add documentId field', () => {
        @source('Telegeography')
        class TestComponent extends UIComponent {
            @field({ label: 'label', transform: val => `${val}-changed` })
            foo: string

            @link({ label: 'label', url: 'http://www.google.com' })
            foo2: string

            @documentId()
            id: string

            constructor(foo: string, foo2: string, id: string) {
                super()
                this.foo = foo
                this.foo2 = foo2
                this.id = id
            }
        }
        const testComponent = new TestComponent('foo', 'google', 'abcd1234')
        const json: Object = testComponent.renderComponent()
        expect(json as any).toHaveProperty('documentId')
        expect((json as any).documentId).toEqual('abcd1234')
    })
})
