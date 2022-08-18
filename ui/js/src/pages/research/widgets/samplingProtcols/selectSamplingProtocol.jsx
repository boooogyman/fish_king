import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Select from 'react-select';
import Modal from "react-modal";
import 'react-tabs/style/react-tabs.css';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {CreateSamplingProtocolComponent} from "./createSamplingProtocol";
import {getAllSamplingProtocols, getMySamplingProtocols} from "../../../../services/samplingProtocols";
import {customModalStyles} from "../../../../constants";


export const SelectSamplingProtocolComponent = (
    {
        isSamplingProtocolModalOpen,
        setIsSamplingProtocolModalOpen,
        research,
        updateResearch
    }) => {
    const [myProtocols, setMyProtocols] = useState([])
    const [allProtocols, setAllProtocols] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const myProtocols = await getMySamplingProtocols()
            const allProtocols = await getAllSamplingProtocols()

            if (myProtocols) {
                setMyProtocols(myProtocols)
            }
            if (allProtocols) {
                setAllProtocols(allProtocols)
            }
        }

        fetchData();
    }, []);

    let myProtocolsMap = {};
    let allProtocolsMap = {};
    myProtocols.map((protocol) => {
        myProtocolsMap[protocol.id] = protocol
    })
    allProtocols.map((protocol) => {
        allProtocolsMap[protocol.id] = protocol
    })
    let myProtocolsOptions = myProtocols.map((protocol) => {
        return {'value': protocol.id, 'label': protocol.name}
    })
    let allProtocolsOptions = allProtocols.map((protocol) => {
        return {'value': protocol.id, 'label': protocol.name}
    })

    const setSamplingProtocol = useCallback(async (protocol) => {
        updateResearch({samplingProtocol: protocol})
    }, [research, updateResearch])

    const addSamplingProtocol = useCallback(async (protocol) => {
        updateResearch({samplingProtocol: protocol})
        setMyProtocols(myProtocols => [protocol, ...myProtocols])
    }, [myProtocols, research, updateResearch])


    return (
        <Modal
            ariaHideApp={false}
            isOpen={isSamplingProtocolModalOpen}
            onRequestClose={() => setIsSamplingProtocolModalOpen(false)}
            style={customModalStyles}
            shouldCloseOnOverlayClick={true}
            contentLabel="Choose SamplingProtocol"
        >
            <p onClick={() => setIsSamplingProtocolModalOpen(false)}>close</p>
            <Tabs>
                <TabList>
                    <Tab>Choose from List</Tab>
                    <Tab>Create New</Tab>
                </TabList>

                <TabPanel>
                    <div className="protocols_select">
                        <p>My Sampling Protocols</p>
                        <Select options={myProtocolsOptions} onChange={(value) => setSamplingProtocol(myProtocolsMap[value.value])}/>
                        <p>All Sampling Protocols</p>
                        <Select options={allProtocolsOptions} onChange={(value) => setSamplingProtocol(allProtocolsMap[value.value])}/>
                    </div>
                </TabPanel>
                <TabPanel>
                    <CreateSamplingProtocolComponent addSamplingProtocol={addSamplingProtocol}/>
                </TabPanel>
            </Tabs>
        </Modal>
    );
}
