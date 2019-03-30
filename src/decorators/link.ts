export interface LinkArgs {
    label: string
    url: string
    transform?: (val: any) => string
}

export function link({ label, url, transform }: LinkArgs) {
    return function(target: Object, propName: string) {
        Object.defineProperty(target, `${propName}-UILink`, {
            get() {
                return {
                    label,
                    type: 'link',
                    url: transform ? transform(url) : url
                }
            },
            enumerable: true
        })
    }
}
