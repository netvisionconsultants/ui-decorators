export type TableColumns = Array<{
    accessor: string
    label: string
}>

export interface TableRow {
    [key: string]: string | number
}

export interface BaseArgs {
    label: string
    transform?: (val: any) => string
}

export interface FieldArgs extends BaseArgs {
    displayEmpty?: boolean
    longValue?: boolean
}

export interface LinkArgs extends BaseArgs {
    url: string
}

export interface TableFieldArgs extends BaseArgs {}

export interface GeoArgs {
    transform?: (val: any) => string
    type?: string
    color?: string
    url?: string
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

export interface Component {
    label?: string
    longValue?: boolean
    displayEmpty?: boolean
    type: string
    fieldName?: string
    value?: string | Array<any>
    url?: string
}

export interface TableComponent extends Component {
    title: string
    columns: Array<string>
}

export interface IUIDocument {
    getTableColumns: () => TableColumns
    renderDocumentAsTabular: () => any
    renderGeoDocument: () => any
    renderDocument: () => any
}

export interface DocumentBody {
    components: Array<any>
    source: any
    documentId: any
    documentName: any
    documentType: any
}

export interface GeoDocumentBody {
    source: string
    documentId: string
    dataType: string
    geoType: string
    locations: any
    displayName: string
    color: string
    geoDataSuperType: string
    image: any
    imageDirection: any
}
