export function getIndicatorTypes(typeRealms){
    let t = {}

    typeRealms.forEach(realm => {
        realm.types.forEach(type => {
            type.realm = realm
            t[type.id] = type
        })
    })

    return t;
}