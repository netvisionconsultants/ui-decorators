export interface FieldArgs {
    label: string;
    displayEmpty?: boolean;
    longValue?: boolean;
    transform?: (val: any) => string;
}
export declare function field({ label, displayEmpty, longValue, transform }: FieldArgs): (target: Object, propName: string) => void;
