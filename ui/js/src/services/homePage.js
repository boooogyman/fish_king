import {requestHomePageInitData} from "../api_client/common";

export async  function getHomePageInitData() {
    let data = await requestHomePageInitData()

    return data
}