import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {NotificationContainer} from 'react-notifications';
import Login from "./pages/Login";
import Parcels from "./pages/Parcels";
import NewParcel from "./pages/NewParcel";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import MobileHeader from "./components/MobileHeader";
import Dashboard from "./pages/Dashboard";
import EditParcel from "./pages/EditParcel";

function App() {
  return (
      <>
          <BrowserRouter>
              <MobileHeader />
              <div className="d-flex flex-column flex-root">
                  <div className="d-flex flex-row flex-column-fluid page">
                      <div className="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">
                          <Header />
                          <Routes>
                              <Route path={'/'} element={<Login/>}/>

                              <Route path={'/parcels'} element={
                                  <PrivateRoute>
                                      <Parcels/>
                                  </PrivateRoute>
                              }/>
                              <Route path={'/dashboard'} element={
                                  <PrivateRoute>
                                      <Dashboard/>
                                  </PrivateRoute>
                              }/>

                              <Route path={'/new-parcel'} element={
                                  <PrivateRoute>
                                      <NewParcel/>
                                  </PrivateRoute>
                              }/>

                              <Route path={'/edit-parcel/:id'} element={
                                  <PrivateRoute>
                                      <EditParcel/>
                                  </PrivateRoute>
                              }/>
                          </Routes>
                      </div>
                  </div>
              </div>
          </BrowserRouter>
          <NotificationContainer/>
      </>
  );
}

export default App;
