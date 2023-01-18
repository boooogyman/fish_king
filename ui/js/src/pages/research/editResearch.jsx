import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {GlobalContext} from "../../context";
import {SelectPlaceComponent} from "./widgets/places/selectPlace";
import {SelectSamplingProtocolComponent} from "./widgets/samplingProtcols/selectSamplingProtocol";
import {DefineConditionsComponent} from "./widgets/conditions/defineConditions";
import {getResearch} from "../../services/research";
import {requestUpdateResearch} from "../../api_client/research";
import {ViewConditionsComponent} from "./widgets/conditions/viewConditions";
import {ViewSamplesComponent} from "./widgets/samples/viewSample";


export const EditResearchComponent = () => {
    const {currentUser, research, setResearch} = useContext(GlobalContext);
    const {researchId} = useParams()

    useEffect(() => {
        async function fetchData() {
            setResearch(await getResearch(researchId))
        }

        fetchData();
    }, []);

    const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false)
    const [isSamplingProtocolModalOpen, setIsSamplingProtocolModalOpen] = useState(false)
    const [isConditionsModalOpen, setIsConditionsModalOpen] = useState(false)

    const updateResearch = useCallback(async (change) => {
        const updatedResearch = {...research, ...change}
        setResearch(updatedResearch)
        await requestUpdateResearch(research.id, change)
    }, [setResearch, research])

    if (!research.id) {
        return
    }
    return (
        <div>
            <h3 style={{textAlign: "center"}}>Edit Research</h3>

            <div style={{width: "50%", paddingLeft: "500px"}}>
                <div className="row">
                    <div className="column">
                        <p>Current User: {currentUser.firstName}</p>
                        <p>Place: {research.place.name} <i className="link"
                                                           onClick={() => setIsPlaceModalOpen(true)}>edit</i></p>
                        <p>Protocol: {research.samplingProtocol.name} <i className="link"
                                                                         onClick={() => setIsSamplingProtocolModalOpen(true)}>edit</i>
                        </p>
                        <p>Conditions: <i className="link" onClick={() => setIsConditionsModalOpen(true)}>edit</i></p>
                        <ViewConditionsComponent indicators={research.indicators}/>
                    </div>
                    <div className="column">
                        <ViewSamplesComponent/>
                    </div>
                </div>

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
            </div>
        </div>
    );
}