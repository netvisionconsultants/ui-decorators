export interface LinkArgs {
    label: string;
    url: string;
    transform?: (val: any) => string;
    section?: string;
}
export declare function link({ label, url, transform, section }: LinkArgs): (target: Object, propName: string) => void;
