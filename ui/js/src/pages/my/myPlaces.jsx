import React, {useCallback, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { getHomePageInitData } from "../../services/homePage";


export const MyPlacesComponent = () => {
    const [initData, setInitData] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect( () => {
        async function fetchData() {
            if (loading){return}

            setLoading(true)

            const data = await getHomePageInitData()
            if (data) {setInitData(data)}
        }

        fetchData();
    }, [loading, setLoading]);

    return (
        <div>
            <div>My Places</div>
            <div>{initData.first_name}</div>
            <div>{initData.last_name}</div>

        </div>
    );
}
