export function documentType(type: string) {
    return function(constructor: any) {
        constructor.prototype._documentType = type
    }
}
