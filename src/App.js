import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import { SharedLayout, Landing, UserRoutes, NotFound, CallbackView, TestAPIRoute, TestAPIprotected, TestAPIAdmin } from './views';
import { useAuth0 } from '@auth0/auth0-react';
import { Auth0LoginRequired, PageLoader } from './components';


export const ConstContext = React.createContext();
export const UserContext = React.createContext();

function App() {
  const BACK_URI = process.env.REACT_APP_SERVER_URL;
  const LOGOUT_URL = process.env.REACT_APP_AUTH0_LOGOUT_URL;
  const AUDIENCE = process.env.REACT_APP_AUTH0_AUDIENCE;
  
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
      <ConstContext.Provider value={ {BACK_URI, LOGOUT_URL, AUDIENCE} }>
        <UserContext.Provider value={ {currUser, setCurrUser} }>
          <Routes>
            <Route path='/' element={<SharedLayout />} >
              <Route index element={<Landing />} />
              <Route path='users/*' element={<UserRoutes />} />
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
