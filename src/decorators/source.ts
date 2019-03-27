export function source(name: string) {
    return function(constructor: any) {
        constructor.prototype._source = name
    }
}
