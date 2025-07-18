import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import { SharedLayout, Landing, OpsSharedLayout, OpsLanding, UserRoutes, NotFound, CallbackView, TestAPIRoute, TestAPIprotected, TestAPIAdmin, ItemRoutes, LookupRoutes, FacilityRoutes, DestinationRoutes } from './views';
import { useAuth0 } from '@auth0/auth0-react';
import { Auth0LoginRequired, PageLoader } from './components';
import { PATH_STRINGS } from './constants';


export const ConstContext = React.createContext();
export const UserContext = React.createContext();
export const DataContext = React.createContext();

function App() {
  const BACK_URI = import.meta.env.VITE_SERVER_URL;
  const LOGOUT_URL = import.meta.env.VITE_AUTH0_LOGOUT_URL;
  const AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE;
  
  const [currUser, setCurrUser] = useState({});

  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <BrowserRouter>   
      <ConstContext.Provider value={ {BACK_URI, LOGOUT_URL, AUDIENCE, PATH_STRINGS} }>
        <UserContext.Provider value={ {currUser, setCurrUser} }>
          <Routes>
            <Route path='/' element={<SharedLayout />} >
              <Route index element={<Landing />} />
            </Route>
            <Route path='operations/' element={<OpsSharedLayout />} >
              <Route index element={<OpsLanding />} />
              <Route path='users/*' element={<UserRoutes />} />
              <Route path='items/*' element={<ItemRoutes />} />
              <Route path='lookups/*' element={<LookupRoutes />} />
              <Route path='facilities/*' element={<FacilityRoutes />} />
              <Route path='destinations/*' element={<DestinationRoutes />} />
              <Route path='callback' element={<CallbackView />} />
              <Route path='test/public' element={<TestAPIRoute />} />
              <Route path='test/protected' element={<Auth0LoginRequired component={TestAPIprotected} />} />
              <Route path='test/admin' element={<TestAPIAdmin />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </UserContext.Provider>
      </ConstContext.Provider>
    </BrowserRouter>
  );
}

export default App;
