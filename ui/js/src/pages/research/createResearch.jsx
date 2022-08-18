import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {GlobalContext} from "../../context";
import {createResearch} from "../../api_client/research";

export const CreateResearchComponent = ({realmId}) => {
    const navigate = useNavigate();
    const {currentUser} = useContext(GlobalContext);

    useEffect(() => {
        async function fetchData() {
            const researchObj = await createResearch({
                ownerId: currentUser.id,
                realmId: realmId
            })

            navigate(`/home/edit-research/${researchObj.id}`)
        }

        fetchData();
    }, [currentUser]);

    return <></>
}