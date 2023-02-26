import './App.css';
import LandingPage from "./landing_page/landing_page";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import React from "react";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <LandingPage />
    </div>
  );
}

export default App;
