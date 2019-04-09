export interface LinkArgs {
    label: string;
    url: string;
    transform?: (val: any) => string;
}
export declare function link({ label, url, transform }: LinkArgs): (target: Object, propName: string) => void;
