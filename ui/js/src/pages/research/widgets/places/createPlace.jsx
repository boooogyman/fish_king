import React, {useCallback, useState} from 'react';
import {createPlace} from "../../../../api_client/places";
import {useContext} from "react";
import {GlobalContext} from "../../../../context";

export const CreatePlaceComponent = ({place, addPlace}) => {
    const [name, setName] = useState("")
    const [lat, setLat] = useState(place && place.lat || "")
    const [lon, setLon] = useState(place && place.lon || "")
    const [townId, setTownId] = useState('')
    const {currentUser} = useContext(GlobalContext);

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault()
        const newPlace = {
            name,
            lat,
            lon,
            townId,
            creatorId: currentUser.id,
        }
        const {id} = await createPlace(newPlace)
        newPlace.id = id
        addPlace(newPlace)
    }, [name, lat, lon, townId])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                    <tr>
                        <td><input  name='name' onChange={(e) => setName(e.target.value)}/></td>
                        <td><label htmlFor='name'>Name</label></td>
                    </tr>
                    <tr>
                        <td><input name='lat' value={lat} onChange={(e) => setLat(e.target.value)}/></td>
                        <td><label htmlFor='lat'>Lat</label></td>
                    </tr>
                    <tr>
                        <td><input name='lon' value={lon} onChange={(e) => setLon(e.target.value)}/></td>
                        <td><label htmlFor='lon'>Lon</label></td>
                    </tr>
                    <tr>
                        <td><input name='city' onChange={(e) => setTownId(e.target.value)}/></td>
                        <td><label htmlFor='phone'>Last name</label></td>
                    </tr>
                    <tr>
                        <td><input type='submit'/></td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}
