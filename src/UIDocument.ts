import {
    Component,
    IUIDocument,
    DocumentBody,
    GeoDocumentBody,
    TableColumns,
    TableRow
} from './types'
export { source } from './decorators/class/source'
export { table } from './decorators/property/table'
export { field } from './decorators/property/field'
export { link } from './decorators/property/link'
export { documentId } from './decorators/property/documentId'
export { documentName } from './decorators/property/documentName'
export { documentType } from './decorators/class/documentType'
export { tableField } from './decorators/property/tableField'
export {
    geoId,
    geoDataType,
    geoDisplayName,
    geoColor,
    geoLocations,
    geoDataSuperType,
    geoImage,
    geoImageDirection
} from './decorators/geo'

export default class UIDocument implements IUIDocument {
    [key: string]: any

    getTableColumns(): TableColumns {
        const tableColumns: TableColumns = []

        for (let k in this) {
            if (k.endsWith('-UITableField')) {
                const { fieldName, label } = this[k] as any
                tableColumns.push({
                    accessor: fieldName,
                    label
                })
            }
        }
        return tableColumns
    }

    renderDocumentAsTabular() {
        const row: TableRow = {}

        for (const k in this) {
            if (k.endsWith('-UITableField')) {
                const { fieldName, value } = this[k] as any
                row[fieldName] = value
            }
        }

        return row
    }

    renderGeoDocument() {
        const geoComponent: GeoDocumentBody = {
            source: '',
            documentId: '',
            dataType: '',
            geoType: '',
            locations: '',
            image: '',
            imageDirection: '',
            displayName: '',
            color: '',
            geoDataSuperType: ''
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
            } else if (k.endsWith('GeoImage')) {
                geoComponent.image = this[k]
            } else if (k.endsWith('GeoImageDirection')) {
                geoComponent.imageDirection = this[k]
            } else if (k.endsWith('GeoLocations')) {
                geoComponent.locations = this[k].value
                geoComponent.geoType = this[k].type
            } else if (k === '_source') {
                geoComponent.source = this[k]
            } else if (k === '_geoDataSuperType') {
                geoComponent.geoDataSuperType = this[k]
            }
        }
        return geoComponent
    }

    renderDocument() {
        const body: DocumentBody = {
            components: [],
            documentId: '',
            documentName: '',
            documentType: '',
            source: ''
        }

        for (let k in this) {
            if (k.endsWith('UIField') || k.endsWith('UITable') || k.endsWith('UILink')) {
                const component: Component = this[k]
                body.components.push(component)
            } else if (k === '_source') {
                body.source = this[k]
            } else if (k === '_documentId') {
                body.documentId = this[k]
            } else if (k === '_documentName') {
                body.documentName = this[k]
            } else if (k === '_documentType') {
                body.documentType = this[k]
            }
        }
        return body
    }
}
