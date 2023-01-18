import {Storage} from "../utils/storage";
import {get_user_jwt} from "./user";

async function makeRequest(url = '', method='GET', data = {}) {
  url = `http://0.0.0.0:5000${url}`

  let jwt = get_user_jwt()
  let params = {
    method: method,
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    }),
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  }

  if (method !== 'GET'){
    params.body =  JSON.stringify(data)
  }

  const response = await fetch(url, params);
  return response.json(); // parses JSON response into native JavaScript objects
}


export async function makeGetRequest(url){
    return makeRequest(url, "GET")
}

export async function makePostRequest(url, data = {}){
    return makeRequest(url, "POST", data)
}

export async function makePutRequest(url, data = {}){
    return makeRequest(url, "PUT", data)
}