import {OSMMapComponent} from "./OSMMap";

export const MapComponent = ({addPlace, myPlaces, allPlaces, setPlace}) => {

    return (
            <OSMMapComponent addPlace={addPlace} myPlaces={myPlaces} allPlaces={allPlaces} setPlace={setPlace} />
    );
}
