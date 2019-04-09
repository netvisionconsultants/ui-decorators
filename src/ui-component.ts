export { source } from './decorators/source'
export { table, TableArgs } from './decorators/table'
export { field, FieldArgs } from './decorators/field'

export interface Component {
    components: Array<any>
    source: any
    documentId: string
}

export default class UIComponent {
    renderComponent() {
        const component: Component = {
            components: [],
            documentId: '',
            source: ''
        }

        for (let k in this) {
            if (k.endsWith('UIField')) {
                component.components.push(this[k])
            }
            if (k.endsWith('UITable')) {
                component.components.push(this[k])
            }
            if (k.endsWith('UILink')) {
                component.components.push(this[k])
            }
            if (k === '_source') {
                component.source = this[k]
            }
        }
        return component
    }
}
