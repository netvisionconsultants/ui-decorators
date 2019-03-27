export interface FieldArgs {
    label: string
    transform?: (val: any) => string
}

export function field({ label, transform }: FieldArgs) {
    return function(target: Object, propName: string) {
        Object.defineProperty(target, `${propName}-UIField`, {
            get() {
                return {
                    label,
                    type: 'field',
                    value: transform ? transform(this[propName]) : this[propName]
                }
            },
            enumerable: true
        })
    }
}
