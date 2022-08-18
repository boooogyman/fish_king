import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import {useState} from "react";
import {CreatePlaceComponent} from "../places/createPlace";


const OSMMapComponentMarkerInner = ({place, setPlace}) => {
    return <>
        <p>{place.name}</p>
        <p onClick={() => {setPlace(place)}}>Use</p>
      </>
}

const OSMMapComponentMarker = ({setNewPlace, place, setPlace, isNewPlace=false, addPlace}) => {
    return <Marker key={place.id} position={[place.lat, place.lon]}>
        <Popup >
            {isNewPlace &&
                <CreatePlaceComponent place={place} addPlace={(place) => {setNewPlace(null); addPlace(place)}}/>
                ||  <OSMMapComponentMarkerInner place={place} setPlace={setPlace}/>
            }
        </Popup>
    </Marker>
}


const OSMMapComponentInner = ({myPlaces, allPlaces, setPlace, addPlace}) => {
    const [newPlace, setNewPlace] = useState(null)

    useMapEvents({
        click(e) {
            setNewPlace({lat: e.latlng.lat.toString(), lon:e.latlng.lng.toString()})
        },

    })

    return (
        <>
            <TileLayer
                attribution='1'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {myPlaces.map(place => (
                <OSMMapComponentMarker key={place.id} place={place} setPlace={setPlace}/>
            ))}
            {allPlaces.map(place => (
                <OSMMapComponentMarker key={place.id} place={place} setPlace={setPlace}/>
            ))}
            {newPlace && <OSMMapComponentMarker key="new_place" isNewPlace={true} place={newPlace} setPlace={setPlace} addPlace={addPlace} setNewPlace={setNewPlace}/> }
        </>
    )

}


export const OSMMapComponent = ({addPlace, myPlaces, allPlaces, setPlace}) => {
    return (
      <MapContainer  id="map" center={[48.505, 32]} zoom={6} scrollWheelZoom={false}>
        <OSMMapComponentInner addPlace={addPlace} myPlaces={myPlaces} allPlaces={allPlaces} setPlace={setPlace}/>
      </MapContainer>
    )

}