import React, {useCallback, useState} from "react";
import {requestSaveReference} from "../../../../api_client/sample";
import Modal from "react-modal";
import {customSmallModalStyles} from "../../../../constants";


export const AddTaxonModalFormComponent = ({
    setSampleData,
    setIsAddTaxonModalOpen,
    isAddTaxonModalOpen,
}) => {
    const [bibliography, setBibliography] = useState("")
    const [doi, setDoi] = useState("")
    const [url, setUrl] = useState("")

    const updateSampleData = useCallback(async () => {
        const newReference = {
            bibliography,
            doi,
            url
        }
        const reference = await requestSaveReference(newReference)
        setSampleData({reference})
        setIsAddTaxonModalOpen(false)
    }, [bibliography, doi, url])

    return <Modal
        ariaHideApp={false}
        isOpen={isAddTaxonModalOpen}
        onRequestClose={() => setIsAddTaxonModalOpen(false)}
        style={customSmallModalStyles}
        shouldCloseOnOverlayClick={true}
        contentLabel="Reference"
    >
        <p>Add Taxon</p>
        <p onClick={() => setIsAddTaxonModalOpen(false)}>close</p>
        <table>
            <tbody>
            <tr>
                <td><input name='bibliography' defaultValue={bibliography}
                           onChange={(e) => setBibliography(e.target.value)}/></td>
                <td><label htmlFor='bibliography'>bibliography</label></td>
            </tr>
            <tr>
                <td><input name='doi' defaultValue={doi}
                           onChange={(e) => setDoi(e.target.value)}/></td>
                <td><label htmlFor='doi'>doi</label></td>
            </tr>
            <tr>
                <td><input name='url' defaultValue={url}
                           onChange={(e) => setUrl(e.target.value)}/></td>
                <td><label htmlFor='url'>url</label></td>
            </tr>
            <tr>
                <td>
                    <button type="button" onClick={updateSampleData}>Add</button>
                </td>
            </tr>
            </tbody>
        </table>
    </Modal>
}