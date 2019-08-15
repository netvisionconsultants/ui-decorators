import {} from 'ts-jest'
import { LinkArgs } from '../../../src/types'
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
        const testField: Object = target['testProp-UILink']
        expect(testField).toHaveProperty('label')
        expect(testField).toHaveProperty('url')
        expect(testField).toHaveProperty('type')
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
        const testField: Object = target['testProp-UILink']
        expect(testField).toHaveProperty('label')
        expect(testField).toHaveProperty('type')
        expect(testField).toHaveProperty('url')
        expect((testField as any).url).toBe('http://www.google.com-test')
    })
})
