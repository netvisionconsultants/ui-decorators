import { FieldArgs, Component } from '../../types'

export function field({ label, displayEmpty = false, longValue = false, transform }: FieldArgs) {
    return function(target: Object, propName: string) {
        Object.defineProperty(target, `${propName}-UIField`, {
            get() {
                const component: Component = {
                    label,
                    longValue,
                    displayEmpty,
                    type: 'field',
                    fieldName: propName,
                    value: transform ? transform(this[propName]) : this[propName]
                }
                return component
            },
            enumerable: true
        })
    }
}
