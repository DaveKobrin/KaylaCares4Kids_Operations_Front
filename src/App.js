import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import { SharedLayout, Landing, UserRoutes, NotFound, CallbackView } from './views';
import { useAuth0 } from '@auth0/auth0-react';
import { PageLoader } from './components';

export const ConstContext = React.createContext();
export const UserContext = React.createContext();

function App() {
  const BACK_URI = process.env.REACT_APP_BACK_END_URI;
  const [user, setUser] = useState(null);

  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <ConstContext.Provider value={ {BACK_URI} }>
        <UserContext.Provider value={ {user, setUser} }>
          <Routes>
            <Route path='/' element={<SharedLayout />} >
              <Route index element={<Landing />} />
              <Route path='users/*' element={<UserRoutes />} />
              <Route path='callback' element={<CallbackView />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </UserContext.Provider>
      </ConstContext.Provider>
    </>
  );
}

export default App;
