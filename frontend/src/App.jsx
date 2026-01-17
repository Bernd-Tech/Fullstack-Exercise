import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { LandingPage } from "./components/pages/LandingPage";
import { ContactPage } from "./components/pages/ContactPage";
import { SignUpPage } from "./components/pages/SignUpPage";
import { LogInPage } from "./components/pages/LogInPage";
import { AiGuidePage } from "./components/pages/dashboard-pages/AiGuidePage";
import { CompleteProfilePage } from "./components/pages/CompleteProfilePage";
import { MainLayout } from "./routes/routeLayouts/MainLayout";
import { AuthLayout } from "./routes/routeLayouts/AuthLayout";
import { DashboardLayout } from "./routes/routeLayouts/DashboardLayout";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/complete-profile"
            element={
              <ProtectedRoute>
                <CompleteProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route element={<DashboardLayout/>}>
        <Route
            path="/dashboard/ai-guide"
            element={
              <ProtectedRoute>
                <AiGuidePage />
              </ProtectedRoute>
            }
          />
          </Route>
        
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
