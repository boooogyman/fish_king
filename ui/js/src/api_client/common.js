import {makeGetRequest} from "./request";

export async function requestHomePageInitData(){
    return makeGetRequest(`/api/v1/common/init-data/`)
}