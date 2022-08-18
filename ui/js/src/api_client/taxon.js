import {makeGetRequest} from "./request";

export async function requestKingdoms(){
    return makeGetRequest(
        `/api/v1/taxon/kingdoms/`
    )
}

export async function requestPhyla(kingdomId){
    return makeGetRequest(
        `/api/v1/taxon/phyla/${kingdomId}/`
    )
}

export async function requestClassNames(phylumId){
    return makeGetRequest(
        `/api/v1/taxon/class-names/${phylumId}/`
    )
}

export async function requestOrders(classNameID){
    return makeGetRequest(
        `/api/v1/taxon/orders/${classNameID}/`
    )
}

export async function requestFamilies(orderId){
    return makeGetRequest(
        `/api/v1/taxon/families/${orderId}/`
    )
}


export async function requestGenera(familyId){
    return makeGetRequest(
        `/api/v1/taxon/genera/${familyId}/`
    )
}


export async function requestTaxa(genusId){
    return makeGetRequest(
        `/api/v1/taxon/taxa/${genusId}/`
    )
}

export async function requestTaxaSearch(term){
    return makeGetRequest(
        `/api/v1/taxon/search/${term}/`
    )
}
