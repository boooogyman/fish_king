import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {GlobalContext} from "../../context";
import {SelectPlaceComponent} from "./widgets/places/selectPlace";
import {SelectSamplingProtocolComponent} from "./widgets/samplingProtcols/selectSamplingProtocol";
import {DefineConditionsComponent} from "./widgets/conditions/defineConditions";
import {getResearch} from "../../services/research";
import {requestUpdateResearch} from "../../api_client/research";
import {ViewConditionsComponent} from "./widgets/conditions/viewConditions";
import {EditSampleModalComponent} from "./widgets/samples/addSample";
import {requestCreateSample} from "../../api_client/sample";
import {ViewSamplesComponent} from "./widgets/samples/viewSample";


export const EditResearchComponent = () => {
    const navigate = useNavigate();
    const {currentUser} = useContext(GlobalContext);
    const {researchId} = useParams()
    const [research, setResearch] = useState({place: {}, samplingProtocol: {}, samples: [], fbas: []})

    useEffect(() => {
        async function fetchData() {
            setResearch(await getResearch(researchId))
        }
        fetchData();
    }, []);

    const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false)
    const [isSamplingProtocolModalOpen, setIsSamplingProtocolModalOpen] = useState(false)
    const [isConditionsModalOpen, setIsConditionsModalOpen] = useState(false)
    const [isAddSampleModalOpen, setIsAddSampleModalOpen] = useState(false)
    const [currentSampleId, setCurrentSampleId] = useState(0)
    const [currentFBAId, setCurrentFBAId] = useState(0)

    const updateResearch = useCallback(async (change) => {
        const updatedResearch = {...research, ...change}
        setResearch(updatedResearch)
        await requestUpdateResearch(research.id, change)
    }, [setResearch, research])

    const addSample = useCallback(async () => {
        const sample = await requestCreateSample(research.id)
        const updatedResearch = {...research, ...{samples: [...research.samples, sample]}}
        setResearch(updatedResearch)
        setCurrentSampleId(sample.id)
        setIsAddSampleModalOpen(true)
    }, [research, setIsAddSampleModalOpen, setCurrentSampleId, setResearch])

    const editSample = useCallback(async (data) => {
        research.samples[research.samples.findIndex((el) => el.id === currentSampleId)] = data
        setResearch(
            {...research, samples: research.samples}
        )
    }, [research, setResearch, currentSampleId])


    const currentSample = research.samples.find((el)=> el.id === currentSampleId)

    return (
        <div>
            <div>Create Research</div>
            <p>Current User: {currentUser.firstName}</p>
            <p>Place: {research.place.name} <i className="link" onClick={() => setIsPlaceModalOpen(true)}>edit</i></p>
            <p>Protocol: {research.samplingProtocol.name} <i className="link" onClick={() => setIsSamplingProtocolModalOpen(true)}>edit</i></p>
            <p>Conditions: <i className="link" onClick={() => setIsConditionsModalOpen(true)}>edit</i></p>
            <ViewConditionsComponent indicators={research.indicators}/>
            <p>Samples: <i className="link" onClick={addSample}>add</i></p>
            <ViewSamplesComponent research={research} samples={research.samples}/>

            <SelectPlaceComponent
                isPlaceModalOpen={isPlaceModalOpen}
                setIsPlaceModalOpen={setIsPlaceModalOpen}
                research={research}
                updateResearch={updateResearch}
            />
            <SelectSamplingProtocolComponent
                isSamplingProtocolModalOpen={isSamplingProtocolModalOpen}
                setIsSamplingProtocolModalOpen={setIsSamplingProtocolModalOpen}
                research={research}
                updateResearch={updateResearch}
            />
            <DefineConditionsComponent
                isConditionsModalOpen={isConditionsModalOpen}
                setIsConditionsModalOpen={setIsConditionsModalOpen}
                research={research}
                setResearch={setResearch}
            />
            <EditSampleModalComponent
                isAddSampleModalOpen={isAddSampleModalOpen}
                setIsAddSampleModalOpen={setIsAddSampleModalOpen}
                research={research}
                currentSample={currentSample}
                editSample={editSample}
            />
        </div>
    );
}