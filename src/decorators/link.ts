export interface LinkArgs {
    label: string
    url: string
    transform?: (val: any) => string
    section?: string
}

export function link({ label, url, transform, section }: LinkArgs) {
    return function(target: Object, propName: string) {
        Object.defineProperty(target, `${propName}-UILink`, {
            get() {
                return {
                    label,
                    type: 'link',
                    url: transform ? transform(url) : url,
                    ...(section && { section })
                }
            },
            enumerable: true
        })
    }
}
