export { source } from './decorators/source'
export { table, TableArgs } from './decorators/table'
export { field, FieldArgs } from './decorators/field'
export { link, LinkArgs } from './decorators/link'
export { documentId } from './decorators/documentId'
export { hasSection, Section } from './decorators/section'
export { geoId, geoDataType, geoDisplayName, geoColor, geoLocations } from './decorators/geo'

export interface Component {
    components: Array<any>
    source: any
    documentId: any
    sections: any
}

export interface GeoComponent {
    source: any
    documentId: any
    dataType: any
    geoType: any
    locations: any
    displayName: any
    color: any
}

export default class UIComponent {
    renderGeoComponent() {
        const geoComponent: GeoComponent = {
            source: '',
            documentId: '',
            dataType: '',
            geoType: '',
            locations: '',
            displayName: '',
            color: ''
        }

        for (let k in this) {
            if (k.endsWith('GeoId')) {
                geoComponent.documentId = this[k]
            } else if (k.endsWith('GeoColor')) {
                geoComponent.color = this[k]
            } else if (k.endsWith('GeoDataType')) {
                geoComponent.dataType = this[k]
            } else if (k.endsWith('GeoDisplayName')) {
                geoComponent.displayName = this[k]
            } else if (k.endsWith('GeoLocations')) {
                geoComponent.locations = (this[k] as any).value
                geoComponent.geoType = (this[k] as any).type
            } else if (k === '_source') {
                geoComponent.source = this[k]
            }
        }
        return geoComponent
    }

    renderComponent() {
        let sections: any = {}
        const body: Component = {
            components: [],
            sections: [],
            documentId: '',
            source: ''
        }

        for (let k in this) {
            if (k.endsWith('UIField') || k.endsWith('UITable') || k.endsWith('UILink')) {
                const component: any = this[k]
                if (component.section) {
                    if (!sections[component.section]) {
                        sections[component.section] = { components: [] }
                    }
                    sections[component.section].components.push(this[k])
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
        for (const key in sections) {
            body.sections.push({
                type: 'section',
                title: (this as any)['_hasSections'][key].title,
                order: (this as any)['_hasSections'][key].order,
                components: sections[key].components
            })
        }
        return body
    }
}
