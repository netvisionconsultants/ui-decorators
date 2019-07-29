import {} from 'ts-jest'
import UIComponent, { source } from '../../src/ui-component'
import {
    geoId,
    geoDataType,
    geoDisplayName,
    geoColor,
    geoLocations,
    geoDataSuperType,
    geoImage,
    geoImageDirection
} from '../../src/decorators/geo'

describe('geo', () => {
    it('UIComponent.renderGeoComponent() should render', () => {
        @source('source')
        @geoDataSuperType('super')
        class TestComponent extends UIComponent {
            @geoColor({ color: 'red' })
            color: string

            @geoId()
            id: string

            @geoDataType()
            type: string

            @geoDisplayName()
            name: string

            @geoLocations({ type: 'point' })
            locations: string

            @geoImage()
            image: string

            @geoImageDirection({ transform: val => val.replace(' degrees', '') })
            imageDirection: string

            constructor(
                id: string,
                color: string,
                type: string,
                name: string,
                locations: string,
                image: string,
                imageDirection: string
            ) {
                super()
                this.color = color
                this.id = id
                this.type = type
                this.name = name
                this.locations = locations
                this.image = image
                this.imageDirection = imageDirection
            }
        }
        const testComponent = new TestComponent(
            'id',
            'blue',
            'wifi',
            'McDonalds Wifi',
            '10.0, -10.0',
            'http://www.image.com',
            '123.45 degrees'
        )
        const comp: any = testComponent.renderGeoComponent()
        expect(comp).toEqual({
            color: 'red',
            dataType: 'wifi',
            displayName: 'McDonalds Wifi',
            documentId: 'id',
            geoType: 'point',
            locations: '10.0, -10.0',
            source: 'source',
            geoDataSuperType: 'super',
            image: 'http://www.image.com',
            imageDirection: '123.45'
        })
    })
})
