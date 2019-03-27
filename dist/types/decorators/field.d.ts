export interface FieldArgs {
    label: string;
    transform?: (val: any) => string;
}
export declare function field({ label, transform }: FieldArgs): (target: Object, propName: string) => void;
