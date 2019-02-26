export interface Component {
  fields: Array<any>
  source: string
}

export interface FieldArgs {
  label: string
  transform?: (val: any) => string
}

export function source(name: string) {
  return function(constructor: any) {
    constructor.prototype._source = name
  }
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

export default class UIComponent {
  renderComponent() {
    const component: Component = {
      fields: [],
      source: ''
    }

    for (let k in this) {
      if (k.endsWith('UIField')) {
        component.fields.push(this[k])
      }
      if (k === '_source') {
        component.source = this[k].toString()
      }
    }
    return JSON.stringify(component)
  }
}
