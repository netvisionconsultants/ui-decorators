import {} from 'ts-jest'
import { source } from '../../../src/decorators/class/source'

describe('source() decorator', () => {
    it('source() adds the _source field to a contructor', () => {
        const konstructor = { prototype: {} }
        source('name')(konstructor)
        expect(konstructor.prototype).toHaveProperty('_source')
        expect((konstructor.prototype as any)._source).toEqual('name')
    })
})
