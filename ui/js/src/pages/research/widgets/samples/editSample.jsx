import React, {useCallback, useContext, useState} from 'react';
import Modal from "react-modal";
import 'react-tabs/style/react-tabs.css';
import {requestCreateSample, requestReferencesSearch, requestUpdateSample} from "../../../../api_client/sample";
import {customModalStyles, REAL} from "../../../../constants";
import {AddTaxonModalFormComponent} from "../taxon/addTaxonForm";
import {AddReferenceFormComponent} from "./addReferenceForm";
import {EditFBAComponent} from "../fba/editFBA";
import {AsyncSelectWithSearch} from "../../../../common/asyncSelectWithSearch";
import {requestTaxaSearch} from "../../../../api_client/taxon";
import {GlobalContext} from "../../../../context";


const RealSampleFormComponent = ({
    sample,
    setSampleData
}) => {
    const [mass, setMass] = useState(sample.mass)
    const [count, setCount] = useState(sample.count)

    const updateSampleData = useCallback(() => {
        setSampleData({
            mass,
            count,
        })
    }, [mass, count])
    return [
        <tr key={10}>
            <td><input name='mass' defaultValue={sample.mass} onBlur={updateSampleData}
                       onChange={(e) => setMass(e.target.value)}/></td>
            <td><label htmlFor='mass'>mass</label></td>
        </tr>,
        <tr key={11}>
            <td><input name='count' defaultValue={sample.count} onBlur={updateSampleData}
                       onChange={(e) => setCount(e.target.value)}/></td>
            <td><label htmlFor='count'>count</label></td>
        </tr>
    ]
}


export const BiblioSampleFormComponent = ({
    sample,
  setSampleData
}) => {
    const [population, setPopulation] = useState("")
    const [isAddReferenceModalOpen, setIsAddReferenceModalOpen] = useState(false)

    const onPopulationChange = useCallback(async (e) => {
        setPopulation(e.target.value)
        setSampleData({population: e.target.value})
    }, [setPopulation]);

    return [
                <tr key={21}>
                    <td>
                        <AsyncSelectWithSearch
                            requestItems={requestReferencesSearch}
                            getItemLabel={(reference) => `${reference.bibliography} - ${reference.id}`}
                            setData={(reference) => setSampleData({reference})}
                            defaultValue={sample}
                        />
                    </td>
                    <td>
                        <b onClick={() => setIsAddReferenceModalOpen(true)}>or Add reference</b>
                        <AddReferenceFormComponent
                            setIsAddReferenceModalOpen={setIsAddReferenceModalOpen}
                            isAddReferenceModalOpen={isAddReferenceModalOpen}
                            setSampleData={setSampleData}
                        />
                    </td>
                </tr>,
                <tr key={23}>
                    <td>
                        <input name="population" defaultValue={sample.population} onChange={onPopulationChange}/>
                    </td>
                    <td>
                        <label htmlFor='population'>population</label>
                    </td>
                </tr>
    ];
}


export const EditSampleContentComponent = ({sampleId}) => {
    const [isAddTaxonModalOpen, setIsAddTaxonModalOpen] = useState(false)
    const {research, setResearch} = useContext(GlobalContext);
    const sample = research.samples.find((el)=> el.id === sampleId)

    const setSampleData = useCallback(async (data) => {
        const currentSample = research.samples.find((el)=> el.id === sampleId)

        const updatedSample = {...currentSample, ...data};
        research.samples[research.samples.findIndex((el) => el.id === sampleId)] = updatedSample
        setResearch(
            {...research, samples: research.samples}
        )
        await requestUpdateSample(sampleId, updatedSample)
    }, [])

    return (
        <div>
            <table style={{width: "50%", border: 0}}>
                <tbody>
                <tr>
                    <td colSpan={2}>
                        <AsyncSelectWithSearch
                            requestItems={requestTaxaSearch}
                            getItemLabel={(taxon) => `${taxon.name} - ${taxon.id}`}
                            setData={(taxon) => setSampleData({taxon})}
                            defaultValue={sample.taxon}
                        />
                    </td>
                    <td>
                        <p className="link" onClick={() => setIsAddTaxonModalOpen(true)}>or Add Taxon</p>
                        <AddTaxonModalFormComponent
                            setIsAddTaxonModalOpen={setIsAddTaxonModalOpen}
                            isAddTaxonModalOpen={isAddTaxonModalOpen}
                            setSampleData={setSampleData}
                        />
                    </td>
                </tr>
                {
                    (research && research.realm && research.realm.id) === REAL &&
                    <RealSampleFormComponent setSampleData={setSampleData} sample={sample}/> ||
                    <BiblioSampleFormComponent setSampleData={setSampleData} sample={sample}/>
                }
                </tbody>
            </table>
            <EditFBAComponent setSample={setSampleData} sample={sample}/>
        </div>
    );
}

export const EditSampleModalComponent = (
    {
        isAddSampleModalOpen,
        setIsAddSampleModalOpen,
        sampleId,
    }) => {

    return (
        <Modal
            ariaHideApp={false}
            isOpen={isAddSampleModalOpen}
            onRequestClose={() => setIsAddSampleModalOpen(false)}
            style={customModalStyles}
            shouldCloseOnOverlayClick={true}
            contentLabel="Choose SamplingProtocol"
        >
            <p onClick={() => setIsAddSampleModalOpen(false)}>close</p>
            <EditSampleContentComponent
                sampleId={sampleId}
            />
        </Modal>
    );
}
