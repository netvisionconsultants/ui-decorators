export interface Component {
  fields: Array<any>
  source: any
  tables: Array<any>
}

export interface FieldArgs {
  label: string
  transform?: (val: any) => string
}
export interface TableArgs {
  title: string
  columns: Array<string>
  sortOrder?: SortOrder
  sortingColumn?: String
  transform?: (val: Array<any>) => Array<any>
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

export function source(name: string) {
  return function(constructor: any) {
    constructor.prototype._source = name
  }
}

export function createTable(
  rows: Array<any>,
  columns: Array<String>,
  sortOrder?: SortOrder,
  sortingColumn?: String,
  transform?: (val: Array<any>) => Array<any>
) {
  // TODO: Check if there are the right amount of columns
  let sortingColumnIdx: number

  if (!sortOrder) {
    sortOrder = SortOrder.ASC
  }

  if (!sortingColumn) {
    sortingColumn = columns[0]
    sortingColumnIdx = 0
  } else {
    // TODO: check sorting column exists in columns
    sortingColumnIdx = columns.indexOf(sortingColumn)
  }

  const mappedRows = rows.map(row => {
    return columns.map(column => {
      return row[column as any]
    })
  })

  const sortedRows = mappedRows.sort(
    (a: any, b: any): number => {
      if (a[sortingColumnIdx] < b[sortingColumnIdx]) return sortOrder === SortOrder.ASC ? -1 : 1
      if (a[sortingColumnIdx] > b[sortingColumnIdx]) return sortOrder === SortOrder.ASC ? 1 : -1
      return 0
    }
  )

  return transform ? transform(sortedRows) : sortedRows
}

export function table({ title, columns, sortOrder, sortingColumn, transform }: TableArgs) {
  return function(target: Object, propName: string) {
    Object.defineProperty(target, `${propName}-UITable`, {
      get() {
        return {
          title,
          columns,
          type: 'table',
          value: createTable(this[propName], columns, sortOrder, sortingColumn, transform)
        }
      },
      enumerable: true
    })
  }
}

export function field({ label, transform }: FieldArgs) {
  return function(target: Object, propName: string) {
    Object.defineProperty(target, `${propName}-UIField`, {
      get() {
        return {
          label,
          type: 'field',
          value: transform ? transform(this[propName]) : this[propName]
        }
      },
      enumerable: true
    })
  }
}

export default class UIComponent {
  renderComponent() {
    const component: Component = {
      fields: [],
      tables: [],
      source: ''
    }

    for (let k in this) {
      if (k.endsWith('UIField')) {
        component.fields.push(this[k])
      }
      if (k.endsWith('UITable')) {
        component.tables.push(this[k])
      }
      if (k === '_source') {
        component.source = this[k]
      }
    }
    return component
  }
}
