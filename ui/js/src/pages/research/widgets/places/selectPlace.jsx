import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {getAllPlaces, getMyPlaces} from "../../../../services/places";
import Select from 'react-select';
import {MapComponent} from "../maps/map";
import Modal from "react-modal";
import 'react-tabs/style/react-tabs.css';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {CreatePlaceComponent} from "./createPlace";
import {customModalStyles} from "../../../../constants";


export const SelectPlaceComponent = (
    {
        isPlaceModalOpen,
        setIsPlaceModalOpen,
        research,
        updateResearch
    }) => {
    const [myPlaces, setMyPlaces] = useState([])
    const [allPlaces, setAllPlaces] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const myPlaces = await getMyPlaces()
            const allPlaces = await getAllPlaces()

            if (myPlaces) {
                setMyPlaces(myPlaces)
            }
            if (allPlaces) {
                setAllPlaces(allPlaces)
            }
        }

        fetchData();
    }, []);

    let myPlacesMap = {};
    let allPlacesMap = {};
    myPlaces.map((place) => {
        myPlacesMap[place.id] = place
    })
    allPlaces.map((place) => {
        allPlacesMap[place.id] = place
    })
    let myPlacesOptions = myPlaces.map((place) => {
        return {'value': place.id, 'label': place.name}
    })
    let allPlacesOptions = allPlaces.map((place) => {
        return {'value': place.id, 'label': place.name}
    })

    const setPlace = useCallback(async (place) => {
        updateResearch({place: place})
    }, [research, updateResearch])

    const addPlace = useCallback(async (place) => {
        updateResearch({place: place})
        setMyPlaces(myPlaces => [place, ...myPlaces])
    }, [myPlaces, research, updateResearch])


    return (
        <Modal
            ariaHideApp={false}
            isOpen={isPlaceModalOpen}
            onRequestClose={() => setIsPlaceModalOpen(false)}
            style={customModalStyles}
            shouldCloseOnOverlayClick={true}
            contentLabel="Choose Location"
        >
            <p onClick={() => setIsPlaceModalOpen(false)}>close</p>
            <Tabs>
                <TabList>
                    <Tab>Choose from List</Tab>
                    <Tab>Use Map</Tab>
                    <Tab>Create New</Tab>
                </TabList>

                <TabPanel>
                    <div className="places_select">
                        <p>My Places</p>
                        <Select options={myPlacesOptions} onChange={(value) => setPlace(myPlacesMap[value.value])}/>
                        <p>All Places</p>
                        <Select options={allPlacesOptions} onChange={(value) => setPlace(allPlacesMap[value.value])}/>
                    </div>
                </TabPanel>
                <TabPanel>
                    <MapComponent addPlace={addPlace} myPlaces={myPlaces} allPlaces={allPlaces} setPlace={setPlace}/>
                </TabPanel>
                <TabPanel>
                    <CreatePlaceComponent addPlace={addPlace}/>
                </TabPanel>
            </Tabs>
        </Modal>
    );
}
