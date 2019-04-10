export interface Section {
    name: string;
    title: string;
    order: number;
}
export declare function hasSection({ name, title, order }: Section): (constructor: any) => void;
