export interface TableFieldArgs {
    label: string
    transform?: (val: any) => string
}

export function tableField({ label, transform }: TableFieldArgs) {
    return function(target: any, propName: string) {
        Object.defineProperty(target, `${propName}-UITableField`, {
            get() {
                return {
                    label,
                    fieldName: propName,
                    value: transform ? transform(this[propName]) : this[propName]
                }
            },
            enumerable: true
        })
    }
}
