import React, {useCallback, useState} from 'react';
import Modal from "react-modal";
import 'react-tabs/style/react-tabs.css';
import {requestReferencesSearch, requestUpdateSample} from "../../../../api_client/sample";
import AsyncSelect from "react-select/async";
import {SearchTaxonComponent} from "../taxon/searchTaxon";
import {customModalStyles, REAL} from "../../../../constants";
import {AddTaxonModalFormComponent} from "../taxon/addTaxonForm";
import {AddReferenceFormComponent} from "./addReferenceForm";
import {EditFBAComponent} from "../fba/addFBA";


const RealSampleFormComponent = ({
                                     setSampleData
                                 }) => {
    const [mass, setMass] = useState("")
    const [count, setCount] = useState("")

    const updateSampleData = useCallback(() => {
        setSampleData({
            mass,
            count,
        })
    }, [mass, count])
    return [
        <tr key={10}>
            <td><input name='mass' defaultValue={mass} onBlur={updateSampleData}
                       onChange={(e) => setMass(e.target.value)}/></td>
            <td><label htmlFor='mass'>mass</label></td>
        </tr>,
        <tr key={11}>
            <td><input name='count' defaultValue={count} onBlur={updateSampleData}
                       onChange={(e) => setCount(e.target.value)}/></td>
            <td><label htmlFor='count'>count</label></td>
        </tr>
    ]
}


export const BiblioSampleFormComponent = ({
                                              setSampleData
                                          }) => {
    const [references, setReferences] = useState({})
    const [reference, setReference] = useState({})
    const [population, setPopulation] = useState("")
    const [isAddReferenceModalOpen, setIsAddReferenceModalOpen] = useState(false)

    const loadOptions = useCallback(async (term, callback) => {
        if (!term) {
            return
        }
        const references = await requestReferencesSearch(term)
        setReferences(references)
        const options = references.map((reference) => {
            return {value: reference.id, label: `${reference.bibliography} - ${reference.id}`}
        })
        callback(options)
    }, [setReferences]);

    const onReferenceChange = useCallback(async (referenceOption) => {
        if (!references.length) {
            return
        }

        const taxaMap = {};
        references.forEach((taxon) => {
            taxaMap[taxon.id] = taxon
        })
        const reference = taxaMap[referenceOption.value]
        setReference(reference)
        setSampleData({reference})
    }, [references, setReference]);

    const onPopulationChange = useCallback(async (e) => {
        setPopulation(e.target.value)
        setSampleData({population: e.target.value})
    }, [setPopulation]);

    return [
                <tr key={21}>
                    <td>
                        <AsyncSelect
                            cacheOptions={true}
                            loadOptions={loadOptions}
                            onChange={onReferenceChange}
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
                        <input name="population" defaultValue={population} onChange={onPopulationChange}/>
                    </td>
                    <td>
                        <label htmlFor='population'>population</label>
                    </td>
                </tr>
    ];
}


export const EditSampleModalComponent = (
    {
        isAddSampleModalOpen,
        setIsAddSampleModalOpen,
        research,
        currentSample,
        editSample
    }) => {
    const [isAddTaxonModalOpen, setIsAddTaxonModalOpen] = useState(false)

    const setSampleData = useCallback(async (data) => {
        const updatedSample = {...currentSample, ...data};
        editSample(updatedSample)
        await requestUpdateSample(currentSample.id, updatedSample)
    }, [currentSample, currentSample])

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
            <div>
                <table style={{width: "100%"}}>
                    <tbody>
                    <tr>
                        <td><SearchTaxonComponent setSampleData={setSampleData}/></td>
                        <td>
                            <b onClick={() => setIsAddTaxonModalOpen(true)}>or Add Taxon</b>
                            <AddTaxonModalFormComponent
                                setIsAddTaxonModalOpen={setIsAddTaxonModalOpen}
                                isAddTaxonModalOpen={isAddTaxonModalOpen}
                                setSampleData={setSampleData}
                            />
                        </td>
                    </tr>
                    {
                        (research && research.realm && research.realm.id) === REAL &&
                        <RealSampleFormComponent setSampleData={setSampleData}/> ||
                        <BiblioSampleFormComponent setSampleData={setSampleData}/>
                    }
                    </tbody>
                </table>
                <EditFBAComponent setSample={setSampleData()} sample={currentSample}/>
            </div>
        </Modal>
    );
}
