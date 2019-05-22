import {} from 'ts-jest'
import UIComponent, { source } from '../../src/ui-component'
import {
    geoId,
    geoDataType,
    geoDisplayName,
    geoColor,
    geoLocations
} from '../../src/decorators/geo'

describe('geo', () => {
    it('UIComponent.renderGeoComponent() should render', () => {
        @source('source')
        class TestComponent extends UIComponent {
            @geoColor()
            color: string

            @geoId()
            id: string

            @geoDataType()
            type: string

            @geoDisplayName()
            name: string

            @geoLocations({ type: 'point' })
            locations: string

            constructor(id: string, color: string, type: string, name: string, locations: string) {
                super()
                this.color = color
                this.id = id
                this.type = type
                this.name = name
                this.locations = locations
            }
        }
        const testComponent = new TestComponent(
            'id',
            'blue',
            'wifi',
            'McDonalds Wifi',
            '10.0, -10.0'
        )
        const comp: any = testComponent.renderGeoComponent()
        expect(comp).toEqual({
            color: 'blue',
            dataType: 'wifi',
            displayName: 'McDonalds Wifi',
            documentId: 'id',
            geoType: 'point',
            locations: '10.0, -10.0',
            source: 'source'
        })
    })
})
