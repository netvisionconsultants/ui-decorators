export interface GeoArgs {
    transform?: (val: any) => string
    type?: string
    color?: string
}

export interface GeoLocationsArgs {
    type: string
    transform?: (val: any) => string
}

export function geoId(args?: GeoArgs) {
    return function(target: Object, propName: string) {
        Object.defineProperty(target, `${propName}-GeoId`, {
            get() {
                return args && args.transform ? args.transform(this[propName]) : this[propName]
            },
            enumerable: true
        })
    }
}

export function geoDataType(args?: GeoArgs) {
    return function(target: Object, propName: string) {
        Object.defineProperty(target, `${propName}-GeoDataType`, {
            get() {
                return args && args.transform ? args.transform(this[propName]) : this[propName]
            },
            enumerable: true
        })
    }
}

export function geoDataSuperType(name: string) {
    return function(constructor: any) {
        constructor.prototype._geoDataSuperType = name
    }
}

export function geoDisplayName(args?: GeoArgs) {
    return function(target: Object, propName: string) {
        Object.defineProperty(target, `${propName}-GeoDisplayName`, {
            get() {
                return args && args.transform ? args.transform(this[propName]) : this[propName]
            },
            enumerable: true
        })
    }
}

export function geoColor(args?: GeoArgs) {
    return function(target: Object, propName: string) {
        Object.defineProperty(target, `${propName}-GeoColor`, {
            get() {
                return args && args.color ? args.color : this[propName]
            },
            enumerable: true
        })
    }
}

export function geoLocations(args: GeoArgs) {
    return function(target: Object, propName: string) {
        Object.defineProperty(target, `${propName}-GeoLocations`, {
            get() {
                return {
                    value: args.transform ? args.transform(this[propName]) : this[propName],
                    type: args.type
                }
            },
            enumerable: true
        })
    }
}
