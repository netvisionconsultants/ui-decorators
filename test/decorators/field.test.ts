import {} from 'ts-jest'
import { field, FieldArgs } from '../../src/decorators/field'

describe('field() decorator', () => {
    it('field() defines the new property', () => {
        const target: any = { testProp: 'originalVal' }
        const prop = 'testProp'
        const args: FieldArgs = {
            label: 'label',
            transform: val => `${val}-test`
        }
        field(args)(target, prop)
        const testField: Object = target['testProp-UIField']
        expect(testField).toHaveProperty('label')
        expect(testField).toHaveProperty('type')
        expect(testField).toHaveProperty('value')
    })
    it('transform() is called', () => {
        const target: any = { testProp: 'originalVal' }
        const prop = 'testProp'
        const args: FieldArgs = {
            label: 'label',
            transform: val => `${val}-test`
        }
        field(args)(target, prop)
        const testField: Object = target['testProp-UIField']
        expect(testField).toHaveProperty('label')
        expect(testField).toHaveProperty('type')
        expect(testField).toHaveProperty('value')
        expect((testField as any).value).toBe('originalVal-test')
    })

    it('transform is optional', () => {
        const target: any = { testProp: 'originalVal' }
        const prop = 'testProp'
        const args: FieldArgs = {
            label: 'label'
        }
        field(args)(target, prop)
        const testField: Object = target['testProp-UIField']
        expect(testField).toHaveProperty('label')
        expect(testField).toHaveProperty('type')
        expect(testField).toHaveProperty('value')
        expect((testField as any).value).toBe('originalVal')
    })
})
