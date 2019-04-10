export interface Section {
    name: string;
    title: string;
}
export declare function hasSection({ name, title }: Section): (constructor: any) => void;
