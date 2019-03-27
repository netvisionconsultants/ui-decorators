export interface TableArgs {
    title: string;
    columns: Array<string>;
    sortOrder?: SortOrder;
    sortingColumn?: String;
    transform?: (val: Array<any>) => Array<any>;
}
export declare enum SortOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export declare function createTable(rows: Array<any>, columns: Array<String>, sortOrder?: SortOrder, sortingColumn?: String, transform?: (val: Array<any>) => Array<any>): any[];
export declare function table({ title, columns, sortOrder, sortingColumn, transform }: TableArgs): (target: Object, propName: string) => void;
