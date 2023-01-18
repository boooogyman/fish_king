import React, {useCallback} from 'react';
import 'react-tabs/style/react-tabs.css';
import {BIBLIO} from "../../../../constants";
import {TextConfirmInput} from "../../../../common/textConfirmInput";
import {requestUpdateFBA} from "../../../../api_client/sample";


const ViewBiblioSampleComponent = ({sample, index}) => {
    if (!sample) {
        return <></>
    }
    return (
        <tr key={index}>
            <td>{sample.taxon && sample.taxon.name}</td>
            <td>{sample.reference && sample.reference.bibliography}</td>
        </tr>
    )
}


const ViewRealSampleComponent = ({sample, index}) => {
    if (!sample) {
        return <></>
    }
    return (
        <tr key={index}>
            <td>{sample.taxon && sample.taxon.name}</td>
            <td>{sample.mass}</td>
            <td>{sample.count}</td>
        </tr>
    )
}


export const FBAComponent = ({FBAs, sample, editSample}) => {
    const updateFBA = useCallback(async (FBAId, data) => {
        const FBA = sample.fbas.find((el) => el.id === FBAId)
        const updatedObject = {...FBA, ...data};
        sample.fbas[sample.fbas.findIndex((el) => el.id === FBAId)] = updatedObject
        editSample({...sample, fbas: sample.fbas})
        await requestUpdateFBA(FBAId, updatedObject)
    }, [editSample, sample])

    return (
        <table width={"100%"} style={{textAlign: "center"}}>
            <tbody>
            <tr style={{border:"2px solid black"}}>
                <td>#</td>
                <td>L</td>
                <td>l</td>
                <td>M</td>
                <td>m</td>
                <td>Z</td>
                <td>age</td>
                <td>food</td>
                <td>gender</td>
                <td>eggs count</td>
            </tr>
            {
                FBAs.map((fba, index) => {
                    return <tr key={index}>
                        <td style={{border:"2px solid black"}}>{index}</td>
                        <td>
                            <TextConfirmInput
                                defaultValue={fba.lCapital}
                                onConfirm={(value) => updateFBA(fba.id, {lCapital: value})}
                            />
                        </td>
                        <td>
                            <TextConfirmInput
                                defaultValue={fba.lLowerCase}
                                onConfirm={(value) => updateFBA(fba.id, {lLowerCase: value})}
                            />
                        </td>
                        <td>
                            <TextConfirmInput
                                defaultValue={fba.mCapital}
                                onConfirm={(value) => updateFBA(fba.id, {mCapital: value})}
                            />
                        </td>
                        <td>
                            <TextConfirmInput
                                defaultValue={fba.mLowerCase}
                                onConfirm={(value) => updateFBA(fba.id, {mLowerCase: value})}
                            />
                        </td>
                        <td>
                            <TextConfirmInput
                                defaultValue={fba.zCapital}
                                onConfirm={(value) => updateFBA(fba.id, {zCapital: value})}
                            />
                        </td>
                        <td>
                            <TextConfirmInput
                                defaultValue={fba.age}
                                onConfirm={(value) => updateFBA(fba.id, {age: value})}
                            />
                        </td>
                        <td>
                            <TextConfirmInput
                                defaultValue={fba.food}
                                onConfirm={(value) => updateFBA(fba.id, {food: value})}
                            />
                        </td>
                        <td>
                            <TextConfirmInput
                                defaultValue={fba.gender}
                                onConfirm={(value) => updateFBA(fba.id, {gender: value})}
                            />
                        </td>
                        <td>
                            <TextConfirmInput
                                defaultValue={fba.eggsCount}
                                onConfirm={(value) => updateFBA(fba.id, {eggsCount: value})}
                            />
                        </td>
                    </tr>
                })
            }
            </tbody>
        </table>

    )
}