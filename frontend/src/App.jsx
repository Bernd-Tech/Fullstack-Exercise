import React from "react";
import {Routes, Route} from 'react-router-dom';
import { LandingPage } from "./pages/LandingPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";

const App = () => {

  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/about" element={<AboutPage />}/>
      <Route path="/contact" element={<ContactPage />}/>
      <Route path="/signup" />
      <Route path="/login" />
    </Routes>
    </>
  )
}

export default App
