import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MainLayout } from './layouts/MainLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProblemsPage } from './pages/ProblemsPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { AiMentorPage } from './pages/AiMentorPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { CompanyPrepPage } from './pages/CompanyPrepPage';
import { MockInterviewPage } from './pages/MockInterviewPage';
import { MissionsPage } from './pages/MissionsPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Authenticated / Application Shell Routes */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/problems" element={<ProblemsPage />} />
            <Route path="/workspace" element={<WorkspacePage />} />
            <Route path="/workspace/:id" element={<WorkspacePage />} />
            <Route path="/ai-mentor" element={<AiMentorPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/company-prep" element={<CompanyPrepPage />} />
            <Route path="/mock-interview" element={<MockInterviewPage />} />
            <Route path="/missions" element={<MissionsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
