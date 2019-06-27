export interface GeoArgs {
    transform?: (val: any) => string;
    type?: string;
    color?: string;
    url?: string;
}
export interface GeoLocationsArgs {
    type: string;
    transform?: (val: any) => string;
}
export declare function geoId(args?: GeoArgs): (target: Object, propName: string) => void;
export declare function geoDataType(args?: GeoArgs): (target: Object, propName: string) => void;
export declare function geoDataSuperType(name: string): (constructor: any) => void;
export declare function geoDisplayName(args?: GeoArgs): (target: Object, propName: string) => void;
export declare function geoColor(args?: GeoArgs): (target: Object, propName: string) => void;
export declare function geoLocations(args: GeoArgs): (target: Object, propName: string) => void;
export declare function geoImage(args: GeoArgs): (target: Object, propName: string) => void;
