export { source } from './decorators/source';
export { table, TableArgs } from './decorators/table';
export { field, FieldArgs } from './decorators/field';
export interface Component {
    fields: Array<any>;
    source: any;
    tables: Array<any>;
}
export default class UIComponent {
    renderComponent(): Component;
}
