export { source } from './decorators/source'
export { table, TableArgs } from './decorators/table'
export { field, FieldArgs } from './decorators/field'
export { link, LinkArgs } from './decorators/link'
export { documentId } from './decorators/documentId'

export interface Component {
    components: Array<any>
    source: any
    documentId: any
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
            if (k === '_documentId') {
                component.documentId = this[k]
            }
        }
        return component
    }
}
