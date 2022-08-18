import {requestMyPlaces, requestPlaces} from "../api_client/places";

export async function getAllPlaces() {
    let data = await requestPlaces();
    console.log(data)

    return data
}


export async function getMyPlaces() {
    let data = await requestMyPlaces();
    console.log(data);
    return data
}