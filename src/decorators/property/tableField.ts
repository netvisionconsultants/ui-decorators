import { TableFieldArgs, Component } from '../../types'

export function tableField({ label, transform }: TableFieldArgs) {
    return function(target: any, propName: string) {
        Object.defineProperty(target, `${propName}-UITableField`, {
            get() {
                const component: Component = {
                    label,
                    fieldName: propName,
                    type: 'tableField',
                    value: transform ? transform(this[propName]) : this[propName]
                }
                return component
            },
            enumerable: true
        })
    }
}
