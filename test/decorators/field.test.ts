import {} from 'ts-jest'
import { FieldArgs } from '../../src/types'
import { field } from '../../src/decorators/property/field'

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

    it('transform, displayEmpty, and longValue are optional', () => {
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
    it('displayEmpty returns', () => {
        const target: any = { testProp: 'originalVal' }
        const prop = 'testProp'
        const args: FieldArgs = {
            label: 'label',
            displayEmpty: true
        }
        field(args)(target, prop)
        const testField: Object = target['testProp-UIField']
        expect(testField).toHaveProperty('displayEmpty')
        expect((testField as any).displayEmpty).toBe(true)
    })
    it('longValue returns', () => {
        const target: any = { testProp: 'originalVal' }
        const prop = 'testProp'
        const args: FieldArgs = {
            label: 'label',
            longValue: true
        }
        field(args)(target, prop)
        const testField: Object = target['testProp-UIField']
        expect(testField).toHaveProperty('longValue')
        expect((testField as any).longValue).toBe(true)
    })
})
