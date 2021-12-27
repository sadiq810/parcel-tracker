import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {NotificationContainer} from 'react-notifications';
import Login from "./pages/Login";
import PickupParcels from "./pages/Parcels";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import PickedUpParcels from "./pages/MyParcels";

function App() {
  return (
      <>
          <Header />
          <BrowserRouter>
            <Routes>
              <Route path={'/'} element={<Login/>}/>

              <Route path={'/pickup-parcel'} element={
                  <PrivateRoute>
                      <PickupParcels/>
                  </PrivateRoute>
              }/>

              <Route path={'/my-parcels'} element={
                  <PrivateRoute>
                      <PickedUpParcels/>
                  </PrivateRoute>
              }/>

            </Routes>
          </BrowserRouter>
          <NotificationContainer/>
      </>
  );
}

export default App;
