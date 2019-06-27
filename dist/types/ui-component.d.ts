export { source } from './decorators/source';
export { table, TableArgs } from './decorators/table';
export { field, FieldArgs } from './decorators/field';
export { link, LinkArgs } from './decorators/link';
export { documentId } from './decorators/documentId';
export { documentName } from './decorators/documentName';
export { documentType } from './decorators/documentType';
export { hasSection, Section } from './decorators/section';
export { geoId, geoDataType, geoDisplayName, geoColor, geoLocations, geoDataSuperType, geoImage } from './decorators/geo';
export interface Component {
    components: Array<any>;
    source: any;
    documentId: any;
    documentName: any;
    documentType: any;
    sections: any;
}
export interface GeoComponent {
    source: any;
    documentId: any;
    dataType: any;
    geoType: any;
    locations: any;
    displayName: any;
    color: any;
    geoDataSuperType: any;
    image: any;
}
export default class UIComponent {
    renderGeoComponent(): GeoComponent;
    renderComponent(): Component;
}
