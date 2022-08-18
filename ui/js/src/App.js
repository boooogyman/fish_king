import {CreateUserFormComponent} from './forms/createUser';
import './App.css';
import React, {Suspense, useEffect, useState} from 'react';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {LoginFormComponent} from "./forms/login";
import {MyHomeComponent} from "./pages/home";
import {MyResearchesComponent} from "./pages/my/myResearches";
import {MyPlacesComponent} from "./pages/my/myPlaces";
import {CreateResearchComponent} from "./pages/research/createResearch";
import {AnaliseComponent} from "./pages/research/analise";
import {ImportExportComponent} from "./pages/research/importExport";
import {GlobalContext} from "./context";
import {getHomePageInitData} from "./services/homePage";
import {EditResearchComponent} from "./pages/research/editResearch";
import {getIndicatorTypes} from "./utils/confing";


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [config, setConfig] = useState({});
  const globalState = {
    currentUser,
    setCurrentUser,
    config,
    setConfig
  };

  const [loading, setLoading] = useState(false)

  useEffect( () => {
      async function fetchData() {
          if (loading){return}

          setLoading(true)

          const data = await getHomePageInitData()
          if (data) {
              setCurrentUser(data.user)
              setConfig({
                  indicatorRealms: data.config.indicatorRealms,
                  indicatorTypes: getIndicatorTypes(data.config.indicatorRealms)
              })
          }
      }

      fetchData();
  }, [loading, setLoading]);


  return (
      <GlobalContext.Provider value={globalState}>
        <Router >
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>

            <Route path="/home" element={<MyHomeComponent />} />
            <Route path="/home/my-researches" element={<MyResearchesComponent /> } />
            <Route path="/home/create-research" element={<CreateResearchComponent realmId="REAL"/> } />
            <Route path="/home/edit-research/:researchId" element={<EditResearchComponent /> } />
            <Route path="/home/create-library-research" element={<CreateResearchComponent realmId="BIBLIO"/> } />
            <Route path="/home/analise" element={<AnaliseComponent /> } />
            <Route path="/home/import-export" element={<ImportExportComponent /> } />
            <Route path="/home/my-places" element={<MyPlacesComponent/>} />
            <Route path="/create-user" element={<CreateUserFormComponent />} />
            <Route path="/login" element={<LoginFormComponent />} />

            </Routes>
          </Suspense>
        </Router>
      </GlobalContext.Provider>
  );
}

export default App;
