import React from "react";
import {Routes, Route} from 'react-router-dom';
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { LandingPage } from "./components/pages/LandingPage";
import { AboutPage } from "./components/pages/AboutPage";
import { ContactPage } from "./components/pages/ContactPage";
import { SignUpPage } from "./components/pages/SignUpPage";
import { LogInPage } from "./components/pages/LogInPage";
import { CompleteProfilePage } from "./components/pages/CompleteProfilePage";
import { NavBar } from './components/sections/navBar';

const App = () => {

  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/about" element={<AboutPage />}/>
      <Route path="/contact" element={<ContactPage />}/>
      <Route path="/sign-up" element={<SignUpPage />}/>
      <Route path="/login" element={<LogInPage/>}/>

      <Route
        path="/complete-profile"
        element={
          <ProtectedRoute>
            <CompleteProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
    </>
  )
}

export default App
