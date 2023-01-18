import React, {useCallback, useState} from "react";
import Modal from "react-modal";
import {customSmallModalStyles} from "../../../../constants";
import {requestSaveTaxon} from "../../../../api_client/taxon";


export const AddTaxonModalFormComponent = ({
    setSampleData,
    setIsAddTaxonModalOpen,
    isAddTaxonModalOpen,
}) => {
    const fields = [
        "name",
        "kingdom",
        "phylum",
        "className",
        "family",
        "scientificNameUkraine",
        "parentId",
        "rank",
        "researcherId",
        "colId",
    ]

    const [obj, setObj] = useState({})

    const setTaxonField = useCallback(async (field, value) => {
        const update = {}
        update[field] = value
        const taxon = {...obj, ...update}
        setObj(taxon)
    }, [obj, setObj])


    const onAddTaxon = useCallback(async () => {
        const taxon = await requestSaveTaxon(obj)
        setSampleData({taxon})
        setIsAddTaxonModalOpen(false)
    }, [obj])

    return <Modal
        ariaHideApp={false}
        isOpen={isAddTaxonModalOpen}
        onRequestClose={() => setIsAddTaxonModalOpen(false)}
        style={customSmallModalStyles}
        shouldCloseOnOverlayClick={true}
        contentLabel="Add Taxon"
    >
        <p>Add Taxon</p>
        <p onClick={() => setIsAddTaxonModalOpen(false)}>close</p>
        <table>
            <tbody>
            {
                fields.map((field, i) => {
                    return <tr key={i}>
                        <td><input name={field} defaultValue={obj[field]}
                                   onChange={(e) => setTaxonField(field, e.target.value)}/></td>
                        <td><label htmlFor={field}>{field}</label></td>
                    </tr>
                })
            }
            <tr>
                <td>
                    <button type="button" onClick={onAddTaxon}>Add</button>
                </td>
            </tr>
            </tbody>
        </table>
    </Modal>
}