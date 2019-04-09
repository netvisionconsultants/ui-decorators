export function documentId() {
    return function(target: Object, propName: string) {
        Object.defineProperty(target, `_documentId`, {
            get() {
                return this[propName]
            },
            enumerable: true
        })
    }
}
