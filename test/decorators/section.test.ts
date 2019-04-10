import {} from 'ts-jest'
import { hasSection, Section } from '../../src/decorators/section'

describe('hasSection() decorator', () => {
    it('creates the _hasSections array and adds to it', () => {
        const konstructor = { prototype: {} }
        const args: Section = { name: 'section1', title: 'Section One', order: 1 }
        hasSection(args)(konstructor)
        expect((konstructor as any).prototype).toHaveProperty('_hasSections')
    })
    it('works when _hasSections exists', () => {
        const konstructor = {
            prototype: {
                _hasSections: {}
            }
        }
        const args: Section = { name: 'section1', title: 'Section One', order: 1 }
        hasSection(args)(konstructor)
        expect((konstructor as any).prototype).toHaveProperty('_hasSections')
    })
})
