import React, {useCallback, useEffect, useState} from 'react';
import 'react-tabs/style/react-tabs.css';

import Select from "react-select";
import {
    requestClassNames,
    requestFamilies,
    requestGenera, requestKingdoms,
    requestOrders, requestPhyla,
    requestTaxa
} from "../../../../api_client/taxon";


export const SelectTaxonComponent = () => {
    const [kingdom, setKingdom] = useState('')
    const [phylum, setPhylum] = useState('')
    const [className, setClassName] = useState('')
    const [order, setOrder] = useState('')
    const [family, setFamily] = useState('')
    const [genus, setGenus] = useState('')
    const [taxon, setTaxon] = useState('')

    const [kingdoms, setKingdoms] = useState([])
    const [phyla, setPhyla] = useState([])
    const [classNames, setClassNames] = useState([])
    const [orders, setOrders] = useState([])
    const [families, setFamilies] = useState([])
    const [genera, setGenera] = useState([])
    const [taxa, setTaxa] = useState([])

    useEffect(() => {
        async function fetchData() {
            const kingdomsList = await requestKingdoms()
            if (kingdomsList) {setKingdoms(kingdomsList)}
        }
        fetchData();
    }, []);

    const getPhyla = useCallback(async (kingdomID) => {
        const phylaList = await requestPhyla(kingdomID)
        if (phylaList) {setPhyla(phylaList)}
    }, [setPhyla])

    const getClassNames = useCallback(async (phylumId) => {
        const classNamesList = await requestClassNames(phylumId)
        if (classNamesList) {setClassNames(classNamesList)}
    }, [phylum, setClassNames])

    const getOrders = useCallback(async (classNameId) => {
        const ordersList = await requestOrders(classNameId)
        if (ordersList) {setOrders(ordersList)}
    }, [className, setOrders])

    const getFamilies = useCallback(async (orderId) => {
        const familiesList = await requestFamilies(orderId)
        if (familiesList) {setFamilies(familiesList)}
    }, [order, setFamilies])

    const getGenera = useCallback(async (familyId) => {
        const generaList = await requestGenera(familyId)
        if (generaList) {setGenera(generaList)}
    }, [family, setGenera])

    const getTaxa = useCallback(async (genusId) => {
        const taxa = await requestTaxa(genusId)
        if (taxa) {setTaxa(taxa)}
    }, [genus, setTaxa])

    // if (kingdom) {await getPhyla()}
    // if (phylum) {await getClassName()}
    // if (className) {await getFamilies()}
    // if (family) {await getTaxa()}

    let kingdomsMap = {};
    let phylaMap = {};
    let familiesMap = {};
    let taxaMap = {};
    let phylaOptions;
    let classNamesMap = {};
    let ordersMap = {};
    let generaMap = {};
    let classNamesOptions;
    let familiesOptions;
    let taxaOptions;
    let ordersOptions;
    let generaOptions;

    kingdoms.forEach((kingdom) => {
        kingdomsMap[kingdom.id] = kingdom
    })
    let kingdomsOptions = kingdoms.map((kingdom) => {
        return {'value': kingdom.id, 'label': kingdom.name}
    })

    if (kingdom) {
        phyla.forEach((phylum) => {
            phylaMap[phylum.id] = phylum
        })
        phylaOptions = phyla.map((phylum) => {
            return {'value': phylum.id, 'label': phylum.name}
        })
    }

    if (phylum) {
        classNames.forEach((className) => {
            classNamesMap[className.id] = className
        })
        classNamesOptions = classNames.map((className) => {
            return {'value': className.id, 'label': className.name}
        })
    }

    if (className) {
        orders.forEach((order) => {
            ordersMap[order.id] = order
        })
        ordersOptions = orders.map((order) => {
            return {'value': order.id, 'label': order.name}
        })
    }

    if (order) {
        families.forEach((family) => {
            familiesMap[family.id] = family
        })
        familiesOptions = families.map((family) => {
            return {'value': family.id, 'label': family.name}
        })
    }

    if (family) {
        genera.forEach((genus) => {
            generaMap[genus.id] = genus
        })
        generaOptions = genera.map((genus) => {
            return {'value': genus.id, 'label': genus.name}
        })
    }

    if (genus) {
        taxa.forEach((taxon) => {
            taxaMap[taxon.id] = taxon
        })
        taxaOptions = taxa.map((taxon) => {
            return {'value': taxon.id, 'label': taxon.name}
        })
    }


    return  <>
        <Select options={kingdomsOptions} onChange={ async (value) => { setKingdom(kingdomsMap[value.value]); await getPhyla(value.value)}}/>
        {
            kingdom &&
            <Select options={phylaOptions} onChange={async (value) => {
                setPhylum(phylaMap[value.value]);
                await getClassNames(value.value)
            }}/>
        }
        {
            phylum &&
            <Select options={classNamesOptions} onChange={async (value) => {
                setClassName(classNamesMap[value.value]);
                await getOrders(value.value)
            }}/>
        }
        {
            className &&
            <Select options={ordersOptions} onChange={async (value) => {
                setOrder(ordersMap[value.value]);
                await getFamilies(value.value)
            }}/>
        }
        {
            order &&
            <Select options={familiesOptions} onChange={async (value) => {
                setFamily(familiesMap[value.value]);
                await getGenera(value.value)
            }}/>
        }
        {
            family &&
            <Select options={generaOptions} onChange={async (value) => {
                setGenus(generaMap[value.value]);
                await getTaxa(value.value)
            }}/>
        }
        {
            genus &&
            <Select options={taxaOptions} onChange={async (value) => {
                setTaxon(taxaMap[value.value]);
            }}/>
        }
    </>

}
