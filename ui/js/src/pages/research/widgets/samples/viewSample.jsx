import React from 'react';
import 'react-tabs/style/react-tabs.css';
import {BIBLIO} from "../../../../constants";


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


export const ViewSamplesComponent = ({research, samples}) => {
    if (!samples){return <></>}
    return (
            <table>
                <tbody>
                {
                    samples.map((sample, index) => (
                        (
                            research.realm.id === BIBLIO &&
                            <ViewBiblioSampleComponent key={index} sample={sample} index={index}/> ||
                            <ViewRealSampleComponent key={index} sample={sample} index={index}/>
                        )
                    ))
                }
                </tbody>
            </table>

    );
}
