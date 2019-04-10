export { source } from './decorators/source'
export { table, TableArgs } from './decorators/table'
export { field, FieldArgs } from './decorators/field'
export { link, LinkArgs } from './decorators/link'
export { documentId } from './decorators/documentId'
export { hasSection, Section } from './decorators/section'

export interface Component {
    components: Array<any>
    source: any
    documentId: any
}

export default class UIComponent {
    renderComponent() {
        const body: Component = {
            components: [],
            documentId: '',
            source: ''
        }

        if ((this as any)['_hasSections']) {
            ;(this as any)['sections'] = (this as any)['_hasSections']
        }

        for (let k in this) {
            if (k.endsWith('UIField') || k.endsWith('UITable') || k.endsWith('UILink')) {
                const component: any = this[k]
                if (component.section) {
                    ;(this as any)['sections'][component.section].components.push(this[k])
                } else {
                    body.components.push(component)
                }
            }
            if (k === '_source') {
                body.source = this[k]
            }
            if (k === '_documentId') {
                body.documentId = this[k]
            }
        }
        for (const key in (this as any)['sections']) {
            body.components.push({
                type: 'section',
                ...(this as any)['sections'][key]
            })
        }
        return body
    }
}
