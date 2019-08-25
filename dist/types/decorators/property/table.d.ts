import { TableArgs, SortOrder } from '../../types';
export declare function createTable(rows: Array<any>, columns: Array<String>, sortOrder?: SortOrder, sortingColumn?: String, transform?: (val: Array<any>) => Array<any>): any[];
export declare function table({ label, columns, sortOrder, sortingColumn, transform }: TableArgs): (target: Object, propName: string) => void;
