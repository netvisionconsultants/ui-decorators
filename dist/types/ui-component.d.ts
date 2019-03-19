export interface Component {
    fields: Array<any>;
    source: any;
}
export interface FieldArgs {
    label: string;
    transform?: (val: any) => string;
}
export declare function source(name: string): (constructor: any) => void;
export declare function field({ label, transform }: FieldArgs): (target: Object, propName: string) => void;
export default class UIComponent {
    renderComponent(): Component;
}
