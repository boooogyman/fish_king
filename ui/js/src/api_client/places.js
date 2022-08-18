import {makeGetRequest, makePostRequest} from "./request";

export async function createPlace({name, lat, lon, townId, creatorId}){
    return makePostRequest(
        `/api/v1/places/`,
        {name, lat, lon, town_id: townId, creator_id: creatorId}
    )
}

export async function requestMyPlaces(){
    return makeGetRequest(
        `/api/v1/places/my-list/`,
    )

}


export async function requestPlaces(){
    return makeGetRequest(
        `/api/v1/places/list/`,
    )
}