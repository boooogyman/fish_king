import {makeGetRequest, makePostRequest, makePutRequest} from "./request";

export async function createResearch({ownerId, realmId}){
    return makePostRequest(
        `/api/v1/researches/`,
        {
            owner_id: ownerId,
            realm_id: realmId
        }
    )
}

export async function requestUpdateResearch(researchId, change){
    return makePutRequest(
        `/api/v1/researches/update/${researchId}/`,
        change
    )
}

export async function requestResearch(researchId){
    return makeGetRequest(
        `/api/v1/researches/${researchId}/`,
    )

}


export async function requestMyResearches(){
    return makeGetRequest(
        `/api/v1/researches/my-list/`,
    )

}