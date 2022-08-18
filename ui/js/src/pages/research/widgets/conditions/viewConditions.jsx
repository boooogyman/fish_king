import React from 'react';
import 'react-tabs/style/react-tabs.css';


export const ViewConditionsComponent = ({indicators}) => {
    if (!indicators){return <></>}
    return (
            <table>
                <tbody>
                {
                    indicators.map((indicator, index) => (
                        <tr key={index}>
                            <td>{indicator.type.name}</td>
                            <td>{indicator.value}</td>
                            <td>{indicator.type.unit}</td>
                        </tr>
                    ))
                }

                </tbody>
            </table>

    );
}
