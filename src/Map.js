import React from 'react'
import {Map as LeafletMap , TileLayer} from 'react-leaflet'

function Map() {
    return (
        <div className='map'>
            <h1>i am a map</h1>

            <LeafletMap>
<TileLayer></TileLayer>
            </LeafletMap>
        </div>
    )
}

export default Map
