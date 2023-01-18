import {makeGetRequest, makePostRequest, makePutRequest} from "./request";


export async function requestUpdateSample(sampleId, change){
    return makePutRequest(
        `/api/v1/sample-structure/update/${sampleId}/`,
        change
    )
}

export async function requestCreateSample(researchId){
    return makePostRequest(
        `/api/v1/sample-structure/${researchId}/`
    )
}

export async function requestSaveReference(data){
    return makePostRequest(
        `/api/v1/references/`,
        data
    )
}


export async function requestReferencesSearch(term){
    return makeGetRequest(
        `/api/v1/references/search/${term}/`
    )
}

export async function requestCreateFBA(sampleId){
    return makePostRequest(
        `/api/v1/fba/`,
        {sample_id: sampleId}
    )
}

export async function requestUpdateFBA(sampleId, change){
    return makePutRequest(
        `/api/v1/fba/update/${sampleId}/`,
        {
            l_capital: change.lCapital,
            l_lowercase: change.lLowerCase,
            m_capital: change.mCapital,
            m_lowercase: change.mLowerCase,
            gender: change.gender,
            z_capital: change.zCapital,
            age: change.age,
            eggs_count: change.eggsCount,
            food: change.food,
        }
    )
}

