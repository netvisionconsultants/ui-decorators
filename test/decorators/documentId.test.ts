import {} from 'ts-jest'
import { documentId } from '../../src/decorators/property/documentId'

describe('documentId() decorator', () => {
    it('documentId() defines the new property', () => {
        const target: any = { testProp: 'originalVal' }
        const prop = 'testProp'
        documentId()(target, prop)
        expect(target).toHaveProperty('_documentId')
        expect((target as any)._documentId).toEqual('originalVal')
    })
})
