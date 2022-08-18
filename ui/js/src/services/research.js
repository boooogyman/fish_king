import {requestResearch} from "../api_client/research";


export async function getResearch(researchId) {
    let data = await requestResearch(researchId);
    console.log(data);
    return data
}