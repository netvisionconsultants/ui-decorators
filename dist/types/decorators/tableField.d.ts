export interface TableFieldArgs {
    label: string;
    transform?: (val: any) => string;
}
export declare function tableField({ label, transform }: TableFieldArgs): (target: any, propName: string) => void;
