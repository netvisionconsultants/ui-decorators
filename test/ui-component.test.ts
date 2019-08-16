import {} from 'ts-jest'
import UIDocument from '../src/ui-component'
import { SortOrder } from '../src/types'
import { table } from '../src/decorators/property/table'
import { field } from '../src/decorators/property/field'
import { link } from '../src/decorators/property/link'
import { documentId } from '../src/decorators/property/documentId'
import { documentName } from '../src/decorators/property/documentName'
import { documentType } from '../src/decorators/class/documentType'
import { source } from '../src/decorators/class/source'
import { tableField } from '../src/decorators/property/tableField'

describe('UIDocument', () => {
    it('UIDocument is instantiable', () => {
        expect(new UIDocument()).toBeInstanceOf(UIDocument)
    })

    it('UIDocument.renderDocument() should return default JSON', () => {
        const component = new UIDocument()
        const json = component.renderDocument()
        expect(json).toEqual({
            components: [],
            documentId: '',
            documentName: '',
            documentType: '',
            source: ''
        })
    })

    it('UIDocument.renderDocument() should add UIFields', () => {
        @source('Telegeography')
        class TestComponent extends UIDocument {
            @field({ label: 'label', transform: val => `${val}-changed` })
            foo: string

            constructor(foo: string) {
                super()
                this.foo = foo
            }
        }
        const testComponent = new TestComponent('foo')
        const json: Object = testComponent.renderDocument()
        expect(json).toEqual({
            components: [
                {
                    displayEmpty: false,
                    fieldName: 'foo',
                    label: 'label',
                    longValue: false,
                    type: 'field',
                    value: 'foo-changed'
                }
            ],
            documentId: '',
            documentName: '',
            documentType: '',
            source: 'Telegeography'
        })
    })

    it('UIDocument.renderDocument() should add UITables', () => {
        @source('Telegeography')
        class TestComponent extends UIDocument {
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
        const json: Object = testComponent.renderDocument()
        expect(json).toEqual({
            components: [
                {
                    title: 'Table Title',
                    type: 'table',
                    columns: ['col3', 'col2', 'col1'],
                    value: [
                        ['d', '5', 'col1'],
                        ['b', '4', 'col1'],
                        ['c', '3', 'col1'],
                        ['a', '2', 'col1'],
                        ['e', '1', 'col1']
                    ]
                }
            ],
            documentId: '',
            documentName: '',
            documentType: '',
            source: 'Telegeography'
        })
    })

    it('UIDocument.renderDocument() should add source field', () => {
        @source('Telegeography')
        class TestComponent extends UIDocument {
            @field({ label: 'label' })
            foo: string

            constructor(foo: string) {
                super()
                this.foo = foo
            }
        }
        const testComponent = new TestComponent('foo')
        const json: Object = testComponent.renderDocument()
        expect((json as any).source).toEqual('Telegeography')
    })

    it('UIDocument.renderDocument() should add documentType', () => {
        @source('Telegeography')
        @documentType('cable')
        class TestComponent extends UIDocument {
            @field({ label: 'label' })
            foo: string

            constructor(foo: string) {
                super()
                this.foo = foo
            }
        }
        const testComponent = new TestComponent('foo')
        const json: Object = testComponent.renderDocument()
        expect((json as any).documentType).toEqual('cable')
    })

    it('UIDocument.renderDocument() should add link field', () => {
        @source('Telegeography')
        class TestComponent extends UIDocument {
            @link({ label: 'label', url: 'http://www.google.com' })
            foo: string

            constructor(foo: string) {
                super()
                this.foo = foo
            }
        }
        const testComponent = new TestComponent('google')
        const json: Object = testComponent.renderDocument()
        expect(json).toEqual({
            components: [
                {
                    label: 'label',
                    type: 'link',
                    url: 'http://www.google.com'
                }
            ],
            documentId: '',
            documentName: '',
            documentType: '',
            source: 'Telegeography'
        })
    })

    it('UIDocument.renderDocument() should add documentId field', () => {
        @source('Telegeography')
        class TestComponent extends UIDocument {
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
        const json: Object = testComponent.renderDocument()
        expect((json as any).documentId).toEqual('abcd1234')
    })

    it('UIDocument.renderDocument() should add documentName field', () => {
        @source('Telegeography')
        class TestComponent extends UIDocument {
            @field({ label: 'label', transform: val => `${val}-changed` })
            foo: string

            @link({ label: 'label', url: 'http://www.google.com' })
            foo2: string

            @documentName()
            id: string

            constructor(foo: string, foo2: string, id: string) {
                super()
                this.foo = foo
                this.foo2 = foo2
                this.id = id
            }
        }
        const testComponent = new TestComponent('foo', 'google', 'abcd1234')
        const json: Object = testComponent.renderDocument()
        expect((json as any).documentName).toEqual('abcd1234')
    })

    it('UIDocument.renderDocumentAsTabular()', () => {
        @source('Telegeography')
        class TestComponent extends UIDocument {
            @tableField({ label: 'Foo Display' })
            foo: string

            @tableField({ label: 'ID Display' })
            id: string

            @tableField({ label: 'Name Display' })
            name: string

            constructor(foo: string, id: string, name: string) {
                super()
                this.foo = foo
                this.id = id
                this.name = name
            }
        }

        const reg = new TestComponent('foo', 'id', 'name').getTableColumns()
        expect(reg).toEqual([
            { accessor: 'foo', label: 'Foo Display' },
            { accessor: 'id', label: 'ID Display' },
            { accessor: 'name', label: 'Name Display' }
        ])
        const testComponent = new TestComponent('foo', 'id', 'name')
        const json: Object = testComponent.renderDocumentAsTabular()
        expect(json).toEqual({
            foo: 'foo',
            id: 'id',
            name: 'name'
        })
    })
})
