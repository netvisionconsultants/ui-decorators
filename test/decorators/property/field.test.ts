import {} from 'ts-jest'
import { FieldArgs, Component } from '../../../src/types'
import { field } from '../../../src/decorators/property/field'

describe('field() decorator', () => {
    it('field() defines the new property', () => {
        const target: any = { testProp: 'originalVal' }
        const prop = 'testProp'
        const args: FieldArgs = {
            label: 'label',
            transform: val => `${val}-test`
        }
        field(args)(target, prop)
        const component: Component = target['testProp-UIField']
        expect(component).toEqual({
            displayEmpty: false,
            fieldName: 'testProp',
            label: 'label',
            longValue: false,
            type: 'field',
            value: 'originalVal-test'
        })
    })

    it('transform, displayEmpty, and longValue are optional', () => {
        const target: any = { testProp: 'originalVal' }
        const prop = 'testProp'
        const args: FieldArgs = {
            label: 'label'
        }
        field(args)(target, prop)
        const component: Component = target['testProp-UIField']
        expect(component).toEqual({
            displayEmpty: false,
            fieldName: 'testProp',
            label: 'label',
            longValue: false,
            type: 'field',
            value: 'originalVal'
        })
    })

    it('displayEmpty is set', () => {
        const target: any = { testProp: 'originalVal' }
        const prop = 'testProp'
        const args: FieldArgs = {
            label: 'label',
            displayEmpty: true
        }
        field(args)(target, prop)
        const component: Component = target['testProp-UIField']
        expect(component).toEqual({
            displayEmpty: true,
            fieldName: 'testProp',
            label: 'label',
            longValue: false,
            type: 'field',
            value: 'originalVal'
        })
    })

    it('longValue is set', () => {
        const target: any = { testProp: 'originalVal' }
        const prop = 'testProp'
        const args: FieldArgs = {
            label: 'label',
            longValue: true
        }
        field(args)(target, prop)
        const component: Component = target['testProp-UIField']
        expect(component).toEqual({
            displayEmpty: false,
            fieldName: 'testProp',
            label: 'label',
            longValue: true,
            type: 'field',
            value: 'originalVal'
        })
    })
})
