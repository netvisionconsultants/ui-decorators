import {} from 'ts-jest'
import UIDocument, { source } from '../../src/UIDocument'
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
    it('UIDocument.renderGeoDocument() should render', () => {
        @source('source')
        @geoDataSuperType('super')
        class TestComponent extends UIDocument {
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
        const comp: any = testComponent.renderGeoDocument()
        expect(comp).toEqual({
            color: 'blue',
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

    it('geoDataSuperType() should add field to prototype', () => {
        const foo: any = {
            prototype: {}
        }
        geoDataSuperType('structure')(foo)
        expect(foo.prototype._geoDataSuperType).toEqual('structure')
    })

    it('geoLocations() transforms value', () => {
        const foo: any = {}
        const transform = jest.fn().mockReturnValue('transformed')
        geoLocations({ type: 'type', transform })(foo, 'prop')
        const val = foo['prop-GeoLocations']
        expect(val).toEqual({
            type: 'type',
            value: 'transformed'
        })
    })
})
