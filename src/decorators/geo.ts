import { GeoArgs } from '../types'

export function geoDataSuperType(name: string) {
    return function(constructor: any) {
        constructor.prototype._geoDataSuperType = name
    }
}

export function propertyDecoratorBuilder(suffix: string, args?: GeoArgs) {
    return function(target: Object, propName: string) {
        Object.defineProperty(target, `${propName}-${suffix}`, {
            get() {
                return args && args.transform ? args.transform(this[propName]) : this[propName]
            },
            enumerable: true
        })
    }
}

export function geoId(args?: GeoArgs) {
    return propertyDecoratorBuilder('GeoId', args)
}

export function geoDataType(args?: GeoArgs) {
    return propertyDecoratorBuilder('GeoDataType', args)
}

export function geoDisplayName(args?: GeoArgs) {
    return propertyDecoratorBuilder('GeoDisplayName', args)
}

export function geoImage(args?: GeoArgs) {
    return propertyDecoratorBuilder('GeoImage', args)
}

export function geoImageDirection(args?: GeoArgs) {
    return propertyDecoratorBuilder('GeoImageDirection', args)
}

export function geoColor(args?: GeoArgs) {
    return propertyDecoratorBuilder('GeoColor', args)
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
