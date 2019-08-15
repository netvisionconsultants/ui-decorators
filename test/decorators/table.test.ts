import {} from 'ts-jest'
import { TableArgs, SortOrder } from '../../src/types'
import { table } from '../../src/decorators/property/table'

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
    it('handles empty columns', () => {
        const target: any = {
            testProp: tableValue
        }
        const prop = 'testProp'
        const args: TableArgs = {
            title: 'Table Title',
            columns: [],
            sortingColumn: 'col4'
        }
        expect(() => {
            table(args)(target, prop)
            target['testProp-UITable']
        }).toThrow('Columns must be provided to the table() decorator')
    })
    it('handles a bad sorting column', () => {
        const target: any = {
            testProp: tableValue
        }
        const prop = 'testProp'
        const args: TableArgs = {
            title: 'Table Title',
            columns: ['col3', 'col2', 'col1'],
            sortingColumn: 'col4'
        }
        expect(() => {
            table(args)(target, prop)
            target['testProp-UITable']
        }).toThrow('sortingColumn does not exist')
    })
    it('handles sorting equal values', () => {
        const tableValue: any = [
            { col2: '1', col1: 'col1', col3: 'c' },
            { col2: '1', col1: 'col1', col3: 'b' },
            { col2: '1', col1: 'col1', col3: 'e' },
            { col2: '1', col1: 'col1', col3: 'a' },
            { col2: '1', col1: 'col1', col3: 'd' }
        ]
        const target: any = {
            testProp: tableValue
        }
        const prop = 'testProp'
        const args: TableArgs = {
            title: 'Table Title',
            columns: ['col3', 'col2', 'col1'],
            sortingColumn: 'col2'
        }
        table(args)(target, prop)
        const testTable: Object = target['testProp-UITable']
        expect((testTable as any).value[0]).toEqual(['c', '1', 'col1'])
    })
    it('handles empty rows', () => {
        const emptyRows: any = []
        const target: any = {
            testProp: emptyRows
        }
        const prop = 'testProp'
        const args: TableArgs = {
            title: 'Table Title',
            columns: ['col3', 'col2', 'col1'],
            sortingColumn: 'col2'
        }
        table(args)(target, prop)
        const testTable: Object = target['testProp-UITable']
        expect((testTable as any).value).toEqual([])
    })
    it('transform() modifies the return value', () => {
        const rows: any = [
            { col2: '1', col1: 'col1', col3: 'c' },
            { col2: '1', col1: 'col1', col3: 'b' },
            { col2: '1', col1: 'col1', col3: 'e' },
            { col2: '1', col1: 'col1', col3: 'a' },
            { col2: '1', col1: 'col1', col3: 'd' }
        ]
        const target: any = {
            testProp: rows
        }
        const prop = 'testProp'
        const args: TableArgs = {
            title: 'Table Title',
            columns: ['col3', 'col2', 'col1'],
            sortingColumn: 'col2',
            transform: (a: any) => a
        }
        table(args)(target, prop)
        const testTable: Object = target['testProp-UITable']
        expect((testTable as any).value[0]).toEqual(['c', '1', 'col1'])
    })
    it('transform() modifies the return value', () => {
        const rows: any = [
            { col2: '1', col1: 'col1', col3: 'c' },
            { col2: '1', col1: 'col1', col3: 'b' },
            { col2: '1', col1: 'col1', col3: 'e' },
            { col2: '1', col1: 'col1', col3: 'a' },
            { col2: '1', col1: 'col1', col3: 'd' }
        ]
        const target: any = {
            testProp: rows
        }
        const prop = 'testProp'
        const args: TableArgs = {
            title: 'Table Title',
            columns: ['col3', 'col2', 'col1'],
            sortingColumn: 'col2',
            transform: (a: any) => [1]
        }
        table(args)(target, prop)
        const testTable: Object = target['testProp-UITable']
        expect((testTable as any).value).toEqual([1])
    })
})
