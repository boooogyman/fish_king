import React from 'react';
import Modal from "react-modal";
import 'react-tabs/style/react-tabs.css';
import {DefineConditionsFormComponent} from "./defineConditionsForm";
import {useCallback} from "react";


const customStyles = {
    content: {
        width: '70%',
        height: '70%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export const DefineConditionsComponent = (
    {
        isConditionsModalOpen,
        setIsConditionsModalOpen,
        research,
        setResearch
    }) => {

    const addIndicator = useCallback( (indicator) => {
        setResearch({...research, indicators: [...research.indicators, indicator]})
    }, [research, setResearch])

    return (
        <Modal
            ariaHideApp={false}
            isOpen={isConditionsModalOpen}
            onRequestClose={() => setIsConditionsModalOpen(false)}
            style={customStyles}
            shouldCloseOnOverlayClick={true}
            contentLabel="Define Conditions"
        >
            <p onClick={() => setIsConditionsModalOpen(false)}>close</p>

            <DefineConditionsFormComponent research={research} addIndicator={addIndicator}/>

        </Modal>
    );
}
