import {} from 'ts-jest'
import { documentName } from '../../src/decorators/property/documentName'

describe('documentName() decorator', () => {
    it('documentId() defines the new property', () => {
        const target: any = { testProp: 'originalVal' }
        const prop = 'testProp'
        documentName()(target, prop)
        expect(target).toHaveProperty('_documentName')
        expect((target as any)._documentName).toEqual('originalVal')
    })
})
