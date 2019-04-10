export interface FieldArgs {
    label: string;
    displayEmpty?: boolean;
    longValue?: boolean;
    transform?: (val: any) => string;
    section?: string;
}
export declare function field({ label, displayEmpty, longValue, transform, section }: FieldArgs): (target: Object, propName: string) => void;
