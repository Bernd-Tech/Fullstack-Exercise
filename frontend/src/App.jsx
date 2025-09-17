import React from "react";
import {Routes, Route} from 'react-router-dom';
import { LandingPage } from "./pages/LandingPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { SignUpPage } from "./pages/SignUpPage";
import { NavBar } from '../src/components/navBar';

const App = () => {

  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/about" element={<AboutPage />}/>
      <Route path="/contact" element={<ContactPage />}/>
      <Route path="/sign-up" element={<SignUpPage />}/>
      <Route path="/login" />
    </Routes>
    </>
  )
}

export default App
