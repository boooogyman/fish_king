import {makeGetRequest, makePostRequest, makePutRequest} from "./request";

export async function createIndicator({
    typeId,
    value,
    researchId,
}){
    return makePostRequest(
        `/api/v1/researches/indicator/`,
        {
            type_id: typeId,
            value,
            research_id: researchId,
        }
    )
}

export async function updateIndicator({
    id,
    typeId,
    value,
    researchId,
}){
    return makePutRequest(
        `/api/v1/researches/indicator/update/${id}`,
        {
            type_id: typeId,
            value,
            research_id: researchId,
        }
    )
}
