import React, {useCallback, useState} from 'react';
import 'react-tabs/style/react-tabs.css';
import {requestCreateFBA} from "../../../../api_client/sample";
import {FBAComponent} from "./viewFBAs";


export const EditFBAComponent = (
    {
        sample,
        setSample,
    }) => {

    const addNewFBA = useCallback(async () => {
        const newFBA = await requestCreateFBA(sample.id)
        setSample({...sample, fbas: [...sample.fbas, newFBA]})
    }, [sample])

    return (<>
            <h3>FBAs</h3>
            <FBAComponent FBAs={sample.fbas} sample={sample}  editSample={setSample}/>
            <p onClick={addNewFBA}>ADD FBA</p>

        </>
    );
}


