import AppHeader from 'components/common/AppHeader/Header';
import Dashboard from 'features/Dashboard';
import Grammars from 'features/Grammars';
import Vocabularies from 'features/Vocabularies';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* App Header */}
      <div className="header">
        <AppHeader></AppHeader>
      </div>

      <div className="content">
        <Routes>
          <Route path="/" element={<Dashboard></Dashboard>}></Route>
          <Route
            path="/vocabularies"
            element={<Vocabularies></Vocabularies>}
          ></Route>
          <Route
            path="/grammars"
            element={<Grammars></Grammars>}
          ></Route>
          {/* <Route path="/login" element={<LoginPage></LoginPage>}></Route> */}
          {/* <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        ></Route> */}
          {/* <Route path="*" element={<NotFound></NotFound>}></Route> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
