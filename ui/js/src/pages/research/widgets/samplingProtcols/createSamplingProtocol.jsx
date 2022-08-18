import React, {useCallback, useState} from 'react';
import {createSamplingProtocol} from "../../../../api_client/samplingProtocols";
import {useContext} from "react";
import {GlobalContext} from "../../../../context";

export const CreateSamplingProtocolComponent = ({addSamplingProtocol}) => {
    const [name, setName] = useState("")
    const [deviceName, setDeviceName] = useState("")
    const [deviceDescription, setDeviceDescription] = useState("")
    const [sampleSizeValue, setSampleSizeValue] = useState("")
    const [sampleSizeUnit, setSampleSizeUnit] = useState("")
    const {currentUser} = useContext(GlobalContext);

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault()
        const newProtocol = {
            name,
            deviceName,
            deviceDescription,
            sampleSizeValue,
            sampleSizeUnit,
            creatorId: currentUser.id,
        }
        const {id} = await createSamplingProtocol(newProtocol)
        newProtocol.id = id
        addSamplingProtocol(newProtocol)
    }, [name, deviceName, deviceDescription, sampleSizeValue, sampleSizeUnit])

    const creator = `${currentUser.firstName} ${currentUser.lastName}`
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                    <tr>
                        <td><input  name='name' onChange={(e) => setName(e.target.value)}/></td>
                        <td><label htmlFor='name'>Name</label></td>
                    </tr>
                    <tr>
                        <td><input name='deviceName' onChange={(e) => setDeviceName(e.target.value)}/></td>
                        <td><label htmlFor='deviceName'>deviceName</label></td>
                    </tr>
                    <tr>
                        <td><input name='deviceDescription' onChange={(e) => setDeviceDescription(e.target.value)}/></td>
                        <td><label htmlFor='deviceDescription'>deviceDescription</label></td>
                    </tr>
                    <tr>
                        <td><input name='sampleSizeValue' onChange={(e) => setSampleSizeValue(e.target.value)}/></td>
                        <td><label htmlFor='sampleSizeValue'>sampleSizeValue</label></td>
                    </tr>
                    <tr>
                        <td><input name='sampleSizeUnit' onChange={(e) => setSampleSizeUnit(e.target.value)}/></td>
                        <td><label htmlFor='sampleSizeUnit'>sampleSizeUnit</label></td>
                    </tr>
                    <tr>
                        <td><p>{creator}</p></td>
                        <td><label>Creator</label></td>
                    </tr>
                    <tr>
                        <td><input type='submit'/></td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}
