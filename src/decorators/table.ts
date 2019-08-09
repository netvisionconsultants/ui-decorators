export interface TableArgs {
    label: string
    columns: Array<string>
    sortOrder?: SortOrder
    sortingColumn?: String
    transform?: (val: Array<any>) => Array<any>
    section?: string
}

export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC'
}

export function createTable(
    rows: Array<any>,
    columns: Array<String>,
    sortOrder?: SortOrder,
    sortingColumn?: String,
    transform?: (val: Array<any>) => Array<any>
) {
    if (!rows || rows.length === 0) return []

    if (columns.length === 0) throw new Error('Columns must be provided to the table() decorator')

    let sortingColumnIdx: number

    if (!sortOrder) {
        sortOrder = SortOrder.ASC
    }

    if (!sortingColumn) {
        sortingColumn = columns[0]
        sortingColumnIdx = 0
    } else {
        sortingColumnIdx = columns.indexOf(sortingColumn)
        if (sortingColumnIdx < 0) throw new Error('sortingColumn does not exist')
    }

    const mappedRows = rows.map(row => {
        return columns.map(column => {
            return row[column as any]
        })
    })

    const sortedRows = mappedRows.sort(
        (a: any, b: any): number => {
            if (a[sortingColumnIdx] < b[sortingColumnIdx]) {
                return sortOrder === SortOrder.ASC ? -1 : 1
            }
            if (a[sortingColumnIdx] > b[sortingColumnIdx]) {
                return sortOrder === SortOrder.ASC ? 1 : -1
            }
            return 0
        }
    )

    return transform ? transform(sortedRows) : sortedRows
}

export function table({ label, columns, sortOrder, sortingColumn, transform, section }: TableArgs) {
    return function(target: Object, propName: string) {
        Object.defineProperty(target, `${propName}-UITable`, {
            get() {
                return {
                    label,
                    columns,
                    type: 'table',
                    value: createTable(
                        this[propName],
                        columns,
                        sortOrder,
                        sortingColumn,
                        transform
                    ),
                    ...(section && { section })
                }
            },
            enumerable: true
        })
    }
}
