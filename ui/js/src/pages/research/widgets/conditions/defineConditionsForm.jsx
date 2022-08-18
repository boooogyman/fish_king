import React, {useCallback, useContext, useState} from 'react';
import {GlobalContext} from "../../../../context";
import {createIndicator, updateIndicator} from "../../../../api_client/indicators";
import Select from "react-select";

export const IndicatorRowComponent = ({researchId, indicator, addIndicator}) => {
    const {config: {indicatorTypes, indicatorRealms}} = useContext(GlobalContext);
    const indicator_type = indicator.type && indicatorTypes[indicator.type.id] || ""

    const [typeRealm, setTypeRealm] = useState(indicator_type && indicator_type.realm)
    const [type, setType] = useState(indicator_type)
    const [id, setId] = useState(indicator.id)
    const [indicatorValue, setIndicatorValue] = useState(indicator.value)

    let typeRealmsMap = {};
    indicatorRealms.map((type) => {
        typeRealmsMap[type.id] = type
    })
    let typeRealmsOptions = indicatorRealms.map((type) => {
        return {'value': type.id, 'label': type.name}
    })

    let typesMap = {};
    let typesOptions = [];

    if (typeRealm) {
        const types = typeRealmsMap[typeRealm.id].types
        types.map((type) => {
            typesMap[type.id] = type
        })

        typesOptions = types.map((type) => {
            return {'value': type.id, 'label': type.name}
        })
    }
    const saveIndicator = useCallback(async () => {
        const newIndicator = {
            id: id || null,
            typeId: type.id.toString(),
            type: indicatorTypes[type.id.toString()],
            value: indicatorValue && indicatorValue.toString(),
            researchId: researchId.toString(),
        }
        if (indicator.id){
            await updateIndicator(newIndicator)
        } else {
            const {id} = await createIndicator(newIndicator)
            newIndicator.id = id
            setId(id)
            addIndicator(newIndicator)
        }
    }, [indicator, type, indicatorValue])

    return <table>
        <tbody>
        <tr>
            <td><Select options={typeRealmsOptions} value={{value: typeRealm.id, label: typeRealm.name}} onChange={(value) => setTypeRealm(typeRealmsMap[value.value])}/>
            </td>
            <td><label htmlFor='typeId'>indicator type realm</label></td>
        </tr>
        {
            typeRealm && (
                <tr>
                    <td><Select options={typesOptions} value={{value: type.id, label: type.name}} onChange={(value) => setType(typesMap[value.value])}/></td>
                    <td><label htmlFor='typeId'>indicatorTypeId</label></td>
                </tr> || null
            )
        }
        <tr>
            <td><input name='value' defaultValue={indicatorValue} onBlur={saveIndicator} onChange={(e) => setIndicatorValue(e.target.value)}/></td>
            <td><label htmlFor='value'>{type.unit}</label></td>
        </tr>
        </tbody>
    </table>
}


export const DefineConditionsFormComponent = ({research, addIndicator}) => {
    const [indicators, setIndicators] = useState(research.indicators || [])

    const addIndicatorRow = useCallback(() => {
        setIndicators([...indicators, {}])
    }, [indicators, setIndicators])

    // const creator = `${currentUser.firstName} ${currentUser.lastName}`
    return (
        <div>
            <table>
                <tbody>
                {indicators.map((indicator, index) => (
                    <tr key={index}>
                        <td><IndicatorRowComponent researchId={research.id} indicator={indicator} addIndicator={addIndicator}/></td>
                    </tr>
                ))
                }
                <tr>
                    <td>
                        <button onClick={addIndicatorRow}>Add indicator</button>
                    </td>
                </tr>

                </tbody>
            </table>
        </div>
    );
}
