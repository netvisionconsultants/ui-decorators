export { source } from './decorators/source'
export { table, TableArgs } from './decorators/table'
export { field, FieldArgs } from './decorators/field'

export interface Component {
    fields: Array<any>
    source: any
    tables: Array<any>
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
