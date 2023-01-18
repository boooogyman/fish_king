import {makeGetRequest, makePostRequest} from "./request";

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

export async function requestSaveTaxon(data){
    return makePostRequest(
        `/api/v1/taxon/`,
        {
            kingdom: data.kingdom,
            phylum: data.phylum,
            class_name: data.className,
            family: data.family,
            scientific_name: data.name,
            scientific_name_ukraine: data.scientificNameUkraine,
            parent_id: data.parentId,
            rank: data.rank,
            col_id: data.colId,
            researcher_id: data.researcherId,
        }
    )
}
