import {requestMyProtocols, requestProtocols} from "../api_client/samplingProtocols";

export async function getAllProtocols() {
    let data = await requestProtocols();
    console.log(data)

    return data
}


export async function getMyProtocols() {
    let data = await requestMyProtocols();
    console.log(data);
    return data
}