import React, {useCallback, useContext, useState} from 'react';
import 'react-tabs/style/react-tabs.css';
import {BIBLIO} from "../../../../constants";
import {requestCreateSample} from "../../../../api_client/sample";
import {EditSampleModalComponent} from "./editSample";
import {GlobalContext} from "../../../../context";


const ViewBiblioSampleHeaderComponent = () => {
    return (
        <tr>
            <td>Taxon name</td>
            <td>Bibliography</td>
            <td></td>
        </tr>
    )
}

const ViewBiblioSampleComponent = ({sample, index, editSample}) => {
    if (!sample) {
        return <></>
    }
    return (
        <tr key={index}>
            <td>{sample.taxon && sample.taxon.name}</td>
            <td>{sample.reference && sample.reference.bibliography}</td>
            <td><p onClick={() => {editSample(sample.id)}}>edit</p></td>
        </tr>
    )
}

const ViewRealSampleHeaderComponent = () => {
    return (
        <tr>
            <td>Taxon</td>
            <td>Mass</td>
            <td>Count</td>
            <td></td>
        </tr>
    )
}

const ViewRealSampleComponent = ({sample, index, editSample}) => {
    if (!sample) {
        return <></>
    }
    return (
        <tr key={index}>
            <td>{sample.taxon && sample.taxon.name}</td>
            <td>{sample.mass}</td>
            <td>{sample.count}</td>
            <td><p onClick={() => {editSample(sample.id)}}>edit</p></td>
        </tr>
    )
}


export const ViewSamplesComponent = ({}) => {
    const {research, setResearch} = useContext(GlobalContext);
    const [isAddSampleModalOpen, setIsAddSampleModalOpen] = useState(false)
    const [currentSampleId, setCurrentSampleId] = useState(0)

    const samples = research.samples

    const editSample = useCallback(async (sampleId) => {
        setCurrentSampleId(sampleId)
        setIsAddSampleModalOpen(true)
    }, [setIsAddSampleModalOpen, setCurrentSampleId])

    const deleteSample = useCallback(async (sampleId) => {

    }, [setIsAddSampleModalOpen, setCurrentSampleId])

    const addSample = useCallback(async () => {
        const sample = await requestCreateSample(research.id)
        const updatedResearch = {...research, ...{samples: [...research.samples, sample]}}
        setResearch(updatedResearch)
        await editSample(sample.id)
    }, [research, setResearch])

    const Component = research.realm.id === BIBLIO && ViewBiblioSampleComponent || ViewRealSampleComponent
    const Header = research.realm.id === BIBLIO && ViewBiblioSampleHeaderComponent || ViewRealSampleHeaderComponent
    if (!samples) {
        return <></>
    }
    return (
        <>
            <h4>Samples</h4>
            <i className="link" onClick={addSample}>add</i>
            <table>
                <tbody>
                <Header/>

                {
                    samples.map((sample, index) => (
                        <Component key={index} sample={sample} index={index} editSample={editSample}/>
                    ))
                }
                </tbody>
            </table>
            <EditSampleModalComponent
                isAddSampleModalOpen={isAddSampleModalOpen}
                setIsAddSampleModalOpen={setIsAddSampleModalOpen}
                sampleId={currentSampleId}
            />
        </>
    );
}
