import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from "../../context";
import {requestMyResearches} from "../../api_client/research";
import {useNavigate} from "react-router-dom";


export const ResearchComponent = ({research}) => {
    const navigate = useNavigate();

    return (
        <tr>
            <td>{research.id}</td>
            <td>{research.date}</td>
            <td>{research.place.name}</td>
            <td>{research.realm.name}</td>
            <td><p onClick={() => navigate(`/home/edit-research/${research.id}`)}>edit</p></td>

        </tr>
    );
}


export const MyResearchesComponent = () => {
    const [researches, setResearches] = useState(false)
    const {currentUser} = useContext(GlobalContext);

    useEffect( () => {
        async function fetchData() {
            const data = await requestMyResearches(currentUser.id)
            if (data) {setResearches(data)}
        }

        fetchData();
    }, [setResearches]);

    return (
        <div>
            <div>My Researches</div>
                <table>
                    <tbody>
                        {researches && researches.map((research, i) => {
                            return <ResearchComponent key={i} research={research}/>
                        })}
                    </tbody>
                </table>
        </div>
    );
}
