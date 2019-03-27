import {} from 'ts-jest'
import UIComponent, {
  field,
  source,
  table,
  FieldArgs,
  TableArgs,
  SortOrder,
  Component
} from '../src/ui-component'

describe('UIComponent', () => {
  it('UIComponent is instantiable', () => {
    expect(new UIComponent()).toBeInstanceOf(UIComponent)
  })

  it('source() adds the _source field to a contructor', () => {
    const konstructor = { prototype: {} }
    source('name')(konstructor)
    expect(konstructor.prototype).toHaveProperty('_source')
    expect((konstructor.prototype as any)._source).toEqual('name')
  })

  it('field() defines the new property', () => {
    const target: any = { testProp: 'originalVal' }
    const prop = 'testProp'
    const args: FieldArgs = {
      label: 'label',
      transform: val => `${val}-test`
    }
    field(args)(target, prop)
    const testField: Object = target['testProp-UIField']
    expect(testField).toHaveProperty('label')
    expect(testField).toHaveProperty('type')
    expect(testField).toHaveProperty('value')
  })

  it('table() creates the table component', () => {
    const target: any = {
      testProp: [
        { col2: '3', col1: 'col1', col3: 'c' },
        { col2: '4', col1: 'col1', col3: 'b' },
        { col2: '1', col1: 'col1', col3: 'e' },
        { col2: '2', col1: 'col1', col3: 'a' },
        { col2: '5', col1: 'col1', col3: 'd' }
      ]
    }
    const prop = 'testProp'
    const args: TableArgs = {
      title: 'Table Title',
      columns: ['col3', 'col2', 'col1'],
      sortingColumn: 'col3',
      sortOrder: SortOrder.DESC
    }
    table(args)(target, prop)
    const testTable: Object = target['testProp-UITable']
  })

  it('transform() is called', () => {
    const target: any = { testProp: 'originalVal' }
    const prop = 'testProp'
    const args: FieldArgs = {
      label: 'label',
      transform: val => `${val}-test`
    }
    field(args)(target, prop)
    const testField: Object = target['testProp-UIField']
    expect(testField).toHaveProperty('label')
    expect(testField).toHaveProperty('type')
    expect(testField).toHaveProperty('value')
    expect((testField as any).value).toBe('originalVal-test')
  })

  it('transform is optional', () => {
    const target: any = { testProp: 'originalVal' }
    const prop = 'testProp'
    const args: FieldArgs = {
      label: 'label'
    }
    field(args)(target, prop)
    const testField: Object = target['testProp-UIField']
    expect(testField).toHaveProperty('label')
    expect(testField).toHaveProperty('type')
    expect(testField).toHaveProperty('value')
    expect((testField as any).value).toBe('originalVal')
  })

  it('UIComponent.renderComponent() should return default JSON', () => {
    const component = new UIComponent()
    const json = component.renderComponent()
    expect(json).toHaveProperty('fields')
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
    expect(json).toHaveProperty('fields')
    expect((json as any).fields[0]).toHaveProperty('label')
    expect((json as any).fields[0]).toHaveProperty('type')
    expect((json as any).fields[0]).toHaveProperty('value')
    expect((json as any).fields[0].label).toEqual('label')
    expect((json as any).fields[0].type).toEqual('field')
    expect((json as any).fields[0].value).toEqual('foo-changed')
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
    expect(json).toHaveProperty('tables')
    expect((json as any).tables[0]).toHaveProperty('title')
    expect((json as any).tables[0]).toHaveProperty('columns')
    expect((json as any).tables[0]).toHaveProperty('type')
    expect((json as any).tables[0]).toHaveProperty('value')
    expect((json as any).tables[0].value[0]).toEqual(['d', '5', 'col1'])
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
})
