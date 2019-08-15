export function documentName() {
    return function(target: Object, propName: string) {
        Object.defineProperty(target, `_documentName`, {
            get(): string {
                return this[propName]
            },
            enumerable: true
        })
    }
}
