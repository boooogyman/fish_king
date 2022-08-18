import {makeGetRequest, makePostRequest} from './request'
import {Storage} from '../utils/storage'

export async function getUserInfo(userId){
    return makeGetRequest(`/api/v1/users/${userId}/`)
}


export async function login(email, password){
    let resp = await makePostRequest(
        `/api/v1/users/login/`,
        {email, password}
    )

    if (!('user' in resp)) {
        return
    }

    Storage.set("user_jwt", resp.jwt)

    return true
}


export function get_user_jwt(){
    return Storage.get('user_jwt')
}


export async function createUser({email, phone, firstName, lastName, password}){
    let resp = makePostRequest(
        `/api/v1/users/sign-in/`,
        {email, phone, first_name: firstName, last_name: lastName, password}
    )
    console.log(resp)
}