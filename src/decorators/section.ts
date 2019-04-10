export interface Section {
    name: string
    title: string
    order: number
}

export function hasSection({ name, title, order }: Section) {
    return function(constructor: any) {
        if (!constructor.prototype._hasSections) {
            constructor.prototype._hasSections = {}
        }
        constructor.prototype._hasSections[name] = { name, title, order, components: [] }
    }
}
