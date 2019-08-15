import {} from 'ts-jest'
import { documentType } from '../../../src/decorators/class/documentType'

describe('source() decorator', () => {
    it('source() adds the _source field to a contructor', () => {
        const konstructor = { prototype: {} }
        documentType('cable')(konstructor)
        expect(konstructor.prototype).toHaveProperty('_documentType')
        expect((konstructor.prototype as any)._documentType).toEqual('cable')
    })
})
