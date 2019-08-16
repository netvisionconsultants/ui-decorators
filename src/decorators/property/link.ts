import { LinkArgs, Component } from '../../types'

export function link({ label, url, transform }: LinkArgs) {
    return function(target: Object, propName: string) {
        Object.defineProperty(target, `${propName}-UILink`, {
            get() {
                const component: Component = {
                    label,
                    type: 'link',
                    url: transform ? transform(url) : url
                }
                return component
            },
            enumerable: true
        })
    }
}
