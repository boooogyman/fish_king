import {makeGetRequest, makePostRequest} from "./request";

export async function createSamplingProtocol({name,
    deviceName,
    deviceDescription,
    sampleSizeValue,
    sampleSizeUnit, creatorId
}){
    return makePostRequest(
        `/api/v1/sampling-protocols/`,
        {
            name,
            device_name: deviceName,
            device_description: deviceDescription,
            sample_size_value: sampleSizeValue,
            sample_size_unit: sampleSizeUnit,
            creator_id: creatorId
        }
    )
}

export async function requestMySamplingProtocols(){
    return makeGetRequest(
        `/api/v1/sampling-protocols/my-list/`,
    )
}


export async function requestSamplingProtocols(){
    return makeGetRequest(
        `/api/v1/sampling-protocols/list/`,
    )
}