import { IUIDocument, DocumentBody, GeoDocumentBody, TableColumns, TableRow } from './types';
export { source } from './decorators/class/source';
export { table } from './decorators/property/table';
export { field } from './decorators/property/field';
export { link } from './decorators/property/link';
export { documentId } from './decorators/property/documentId';
export { documentName } from './decorators/property/documentName';
export { documentType } from './decorators/class/documentType';
export { tableField } from './decorators/property/tableField';
export { geoId, geoDataType, geoDisplayName, geoColor, geoLocations, geoDataSuperType, geoImage, geoImageDirection } from './decorators/geo';
export default class UIDocument implements IUIDocument {
    [key: string]: any;
    getTableColumns(): TableColumns;
    renderDocumentAsTabular(): TableRow;
    renderGeoDocument(): GeoDocumentBody;
    renderDocument(): DocumentBody;
}
