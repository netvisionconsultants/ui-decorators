export { source } from './decorators/source';
export { table, TableArgs } from './decorators/table';
export { field, FieldArgs } from './decorators/field';
export { link, LinkArgs } from './decorators/link';
export { documentId } from './decorators/documentId';
export interface Component {
    components: Array<any>;
    source: any;
    documentId: any;
}
export default class UIComponent {
    renderComponent(): Component;
}
