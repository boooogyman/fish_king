import {requestMySamplingProtocols, requestSamplingProtocols} from "../api_client/samplingProtocols";

export async function getAllSamplingProtocols() {
    let data = await requestSamplingProtocols();
    console.log(data)

    return data
}


export async function getMySamplingProtocols() {
    let data = await requestMySamplingProtocols();
    console.log(data);
    return data
}