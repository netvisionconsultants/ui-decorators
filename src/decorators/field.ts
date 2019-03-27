export interface FieldArgs {
    label: string
    displayEmpty?: boolean
    longValue?: boolean
    transform?: (val: any) => string
}

export function field({ label, displayEmpty = false, longValue = false, transform }: FieldArgs) {
    return function(target: Object, propName: string) {
        Object.defineProperty(target, `${propName}-UIField`, {
            get() {
                return {
                    label,
                    longValue,
                    displayEmpty,
                    type: 'field',
                    value: transform ? transform(this[propName]) : this[propName]
                }
            },
            enumerable: true
        })
    }
}
