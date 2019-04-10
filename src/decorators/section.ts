export interface Section {
    name: string
    title: string
}

export function hasSection({ name, title }: Section) {
    return function(constructor: any) {
        if (!constructor.prototype._hasSections) {
            constructor.prototype._hasSections = {}
        }
        constructor.prototype._hasSections[name] = { name, title, components: [] }
    }
}
