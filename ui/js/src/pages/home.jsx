import React, {useCallback, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { getHomePageInitData } from "../services/homePage";


export const MyHomeComponent = () => {
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
        <div id="home-table">
            <div>My home</div>
            <div>{initData.first_name}</div>
            <div>{initData.last_name}</div>
            <table >
                <tbody>
                    <tr>
                        <td><p onClick={() => navigate("/home/create-research")}>Create Research</p></td>
                        <td><p onClick={() => navigate("/home/create-library-research")}>Create Library Research</p></td>
                        <td><p onClick={() => navigate("/home/my-researches")}>My researches</p></td>
                    </tr>
                    <tr>
                        <td><p onClick={() => navigate("/home/create-research")}>Create Research</p></td>
                        <td><p onClick={() => navigate("/home/create-library-research")}>Create Library Research</p></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><p onClick={() => navigate("/home/analise")}>Analise</p></td>
                        <td><p onClick={() => navigate("/home/analise")}>Import/Export</p></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

        </div>
    );
}
