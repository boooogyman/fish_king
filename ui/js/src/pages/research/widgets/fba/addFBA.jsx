import React, {useCallback, useState} from 'react';
import Modal from "react-modal";
import 'react-tabs/style/react-tabs.css';
import {requestCreateFBA, requestSaveReference, requestUpdateSample} from "../../../../api_client/sample";
import {customModalStyles} from "../../../../constants";


const AddReferenceFormComponent = ({
   setSampleData
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
    }, [bibliography, doi, url])
    return <>
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
                <td><button type="button" onClick={updateSampleData}>Add</button></td>
            </tr>
            </tbody>
        </table>
    </>
}


const FBAFormComponent = ({
    setData,
    fba
}) => {
    const [lCapital, setLCapital] = useState("")
    const [lLowerCase, setLLowerCase] = useState("")
    const [mCapital, setMCapital] = useState("")
    const [mLowerCase, setMLowerCase] = useState("")
    const [gender, setGender] = useState("")
    const [zCapital, setZCapital] = useState("")
    const [age, setAge] = useState("")
    const [eggsCount, setEggsCount] = useState("")
    const [food, setFood] = useState("")

    const updateSampleData = useCallback(() => {
        setData({
            lCapital,
            lLowerCase,
            mCapital,
            mLowerCase,
            gender,
            zCapital,
            age,
            eggsCount,
            food
        })
    }, [
        lCapital, lLowerCase, mCapital,
        mLowerCase, gender, zCapital,
        age, eggsCount, food
    ])
    return <>
        <table>
            <tbody>
            <tr>
                <td><input name='lCapital' defaultValue={lCapital} onBlur={updateSampleData}
                           onChange={(e) => setLCapital(e.target.value)}/></td>
                <td><label htmlFor='lCapital'>L</label></td>
            </tr>
            <tr>
                <td><input name='lLowerCase' defaultValue={lLowerCase} onBlur={updateSampleData}
                           onChange={(e) => setLLowerCase(e.target.value)}/></td>
                <td><label htmlFor='lLowerCase'>l</label></td>
            </tr>
            <tr>
                <td><input name='mCapital' defaultValue={mCapital} onBlur={updateSampleData}
                           onChange={(e) => setMCapital(e.target.value)}/></td>
                <td><label htmlFor='mCapital'>M</label></td>
            </tr>
            <tr>
                <td><input name='mLowerCase' defaultValue={mLowerCase} onBlur={updateSampleData}
                           onChange={(e) => setMLowerCase(e.target.value)}/></td>
                <td><label htmlFor='mLowerCase'>m</label></td>
            </tr>
            <tr>
                <td><input name='gender' defaultValue={gender} onBlur={updateSampleData}
                           onChange={(e) => setGender(e.target.value)}/></td>
                <td><label htmlFor='gender'>gender</label></td>
            </tr>
            <tr>
                <td><input name='zCapital' defaultValue={zCapital} onBlur={updateSampleData}
                           onChange={(e) => setZCapital(e.target.value)}/></td>
                <td><label htmlFor='zCapital'>Z</label></td>
            </tr>
            <tr>
                <td><input name='age' defaultValue={age} onBlur={updateSampleData}
                           onChange={(e) => setAge(e.target.value)}/></td>
                <td><label htmlFor='age'>age</label></td>
            </tr>
            <tr>
                <td><input name='eggsCount' defaultValue={eggsCount} onBlur={updateSampleData}
                           onChange={(e) => setEggsCount(e.target.value)}/></td>
                <td><label htmlFor='eggsCount'>eggsCount</label></td>
            </tr>
            <tr>
                <td><input name='food' defaultValue={food} onBlur={updateSampleData}
                           onChange={(e) => setFood(e.target.value)}/></td>
                <td><label htmlFor='food'>food</label></td>
            </tr>
            </tbody>
        </table>
    </>
}


export const EditFBAModalComponent = (
    {
        isAddFBAModalOpen,
        setIsAddFBAModalOpen,
        sample,
        currentFBA,
        editFBA
    }) => {

    const setData = useCallback(async (data) => {
        const updatedObject = {...currentFBA, ...data};
        editFBA(updatedObject)
        await requestUpdateSample(currentFBA.id, updatedObject)
    }, [currentFBA])


    return (
        <Modal
            ariaHideApp={false}
            isOpen={isAddFBAModalOpen}
            onRequestClose={() => setIsAddFBAModalOpen(false)}
            style={customModalStyles}
            shouldCloseOnOverlayClick={true}
            contentLabel="Choose FBA"
        >
            <p onClick={() => setIsAddFBAModalOpen(false)}>close</p>
            <FBAFormComponent setData={setData}/>
        </Modal>
    );
}


export const EditFBAComponent = (
    {
        sample,
        setSample,
    }) => {
    const [isAddTaxonModalOpen, setIsAddTaxonModalOpen] = useState(false)
    const [currentFBAId, setCurrentFBAId] = useState({})

    const currentFBA = sample.fbas.find((el)=> el.id === currentFBAId)

    const setData = useCallback(async (data) => {
        const updatedObject = {...currentFBA, ...data};
        editFBA(updatedObject)
        await requestUpdateSample(currentFBA.id, updatedObject)
    }, [currentFBA])

    const editFBA = useCallback((fba) => {
        setCurrentFBAId(fba.id)
        setIsAddTaxonModalOpen(true)
    }, [setCurrentFBAId, setIsAddTaxonModalOpen])

    const addNewFBA = useCallback(async () => {
        const newFBA = await requestCreateFBA(sample.id)
        setSample({...sample, fbas: [...sample.fbas, newFBA]})
        editFBA(newFBA)
    }, [currentFBA])


    return (<>
        <table style={{width: "100%"}}>
            <tbody>
            {
                sample.fbas.map((fba) => {
                    return <tr>
                        <td>{fba.age}</td>
                        <td><p onClick={() => editFBA(fba)}>edit</p></td>
                    </tr>
                })
            }
            <tr key={-1}>
                <td><p onClick={addNewFBA}>ADD FBA</p></td>
            </tr>
            </tbody>
        </table>
        <EditFBAModalComponent
            setData={setData}
            isAddFBAModalOpen={isAddTaxonModalOpen}
            setIsAddFBAModalOpen={setIsAddTaxonModalOpen}
        />
        </>
    );
}


