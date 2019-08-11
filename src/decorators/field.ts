export interface FieldArgs {
    label: string
    displayEmpty?: boolean
    longValue?: boolean
    transform?: (val: any) => string
    section?: string
}

export function field({
    label,
    displayEmpty = false,
    longValue = false,
    transform,
    section
}: FieldArgs) {
    return function(target: Object, propName: string) {
        Object.defineProperty(target, `${propName}-UIField`, {
            get() {
                return {
                    label,
                    longValue,
                    displayEmpty,
                    type: 'field',
                    fieldName: propName,
                    value: transform ? transform(this[propName]) : this[propName],
                    ...(section && { section })
                }
            },
            enumerable: true
        })
    }
}
