export function documentName() {
    return function(target: Object, propName: string) {
        Object.defineProperty(target, `_documentName`, {
            get() {
                return this[propName]
            },
            enumerable: true
        })
    }
}
