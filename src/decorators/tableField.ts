export interface TableFieldArgs {
    label: string
    transform?: (val: any) => string
}

export function tableField({ label, transform }: TableFieldArgs) {
    return function(target: any, propName: string) {
        target.tableColumns.push({
            accessor: propName,
            label
        })

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
