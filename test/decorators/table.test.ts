import {} from 'ts-jest'
import { TableArgs, table, SortOrder } from '../../src/decorators/table'

const tableValue: any = [
    { col2: '3', col1: 'col1', col3: 'c' },
    { col2: '4', col1: 'col1', col3: 'b' },
    { col2: '1', col1: 'col1', col3: 'e' },
    { col2: '2', col1: 'col1', col3: 'a' },
    { col2: '5', col1: 'col1', col3: 'd' }
]

describe('table() decorator', () => {
    it('creates the table component', () => {
        const target: any = {
            testProp: tableValue
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
        expect((testTable as any).value[0]).toEqual(['e', '1', 'col1'])
    })
    it('sorts ASC if sortOrder is not passed', () => {
        const target: any = {
            testProp: tableValue
        }
        const prop = 'testProp'
        const args: TableArgs = {
            title: 'Table Title',
            columns: ['col3', 'col2', 'col1'],
            sortingColumn: 'col3'
        }
        table(args)(target, prop)
        const testTable: Object = target['testProp-UITable']
        expect((testTable as any).value[0]).toEqual(['a', '2', 'col1'])
    })
    it('uses first column as sortingColumn by default', () => {
        const target: any = {
            testProp: tableValue
        }
        const prop = 'testProp'
        const args: TableArgs = {
            title: 'Table Title',
            columns: ['col3', 'col2', 'col1']
        }
        table(args)(target, prop)
        const testTable: Object = target['testProp-UITable']
        expect((testTable as any).value[0]).toEqual(['a', '2', 'col1'])
    })
})
