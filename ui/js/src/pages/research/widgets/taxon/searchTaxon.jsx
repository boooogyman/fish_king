import React, {useCallback, useState} from 'react';
import AsyncSelect from "react-select/async";
import {requestTaxaSearch} from "../../../../api_client/taxon";


export const SearchTaxonComponent = ({
    setSampleData
}) => {
    const [taxa, setTaxa] = useState({})
    const [taxon, setTaxon] = useState({})

    const loadOptions = useCallback( async (term, callback) => {
        if (!term) {return}
        const taxa = await requestTaxaSearch(term)
        setTaxa(taxa)
        const options = taxa.map((taxon) => {return {value: taxon.id, label: `${taxon.name} - ${taxon.id}` }})
        callback(options)
    }, [setTaxa]);

    const onChange = useCallback( async (taxonOption) => {
        if (!taxa.length){return}

        const taxaMap = {};
        taxa.forEach((taxon) => {
            taxaMap[taxon.id] = taxon
        })
        const taxon = taxaMap[taxonOption.value]
        setTaxon(taxon)
        setSampleData({taxon})
    }, [taxa, setTaxa]);

    return (

        <AsyncSelect
            cacheOptions={true}
            loadOptions={loadOptions}
            onChange={onChange}
        />
    );
}
