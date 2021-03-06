import {} from 'ts-jest'
import { LinkArgs, Component } from '../../../src/types'
import { link } from '../../../src/decorators/property/link'

describe('link() decorator', () => {
    it('link() defines the new property', () => {
        const target: any = { testProp: 'originalVal' }
        const prop = 'testProp'
        const args: LinkArgs = {
            label: 'label',
            url: 'http://www.google.com'
        }
        link(args)(target, prop)
        const component: Component = target['testProp-UILink']
        expect(component).toEqual({
            label: 'label',
            type: 'link',
            url: 'http://www.google.com'
        })
    })

    it('transform() is called', () => {
        const target: any = { testProp: 'originalVal' }
        const prop = 'testProp'
        const args: LinkArgs = {
            label: 'label',
            url: 'http://www.google.com',
            transform: val => `${val}-test`
        }
        link(args)(target, prop)
        const component: Component = target['testProp-UILink']
        expect(component).toEqual({
            label: 'label',
            type: 'link',
            url: 'http://www.google.com-test'
        })
    })
})
