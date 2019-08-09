export interface TableArgs {
    label: string;
    columns: Array<string>;
    sortOrder?: SortOrder;
    sortingColumn?: String;
    transform?: (val: Array<any>) => Array<any>;
    section?: string;
}
export declare enum SortOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export declare function createTable(rows: Array<any>, columns: Array<String>, sortOrder?: SortOrder, sortingColumn?: String, transform?: (val: Array<any>) => Array<any>): any[];
export declare function table({ label, columns, sortOrder, sortingColumn, transform, section }: TableArgs): (target: Object, propName: string) => void;
