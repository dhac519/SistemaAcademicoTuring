import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './features/auth/pages/LoginPage';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

import StaffPage from './features/staff/pages/StaffPage';
import StudentPage from './features/students/pages/StudentPage';
import ParentPage from './features/parents/pages/ParentPage';
import GroupPage from './features/groups/pages/GroupPage';
import PaymentPlansPage from './features/payment-plans/pages/PaymentPlansPage';
import EnrollmentPage from './features/enrollments/pages/EnrollmentPage';
import PaymentPage from './features/payments/pages/PaymentPage';

import DashboardPage from './features/dashboard/pages/DashboardPage';
import DebtsPage from './features/reports/pages/DebtsPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route element={<ProtectedRoute />}>
             <Route element={<MainLayout />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/staff" element={<StaffPage />} />
                <Route path="/students" element={<StudentPage />} />
                <Route path="/parents" element={<ParentPage />} />
                <Route path="/groups" element={<GroupPage />} />
                <Route path="/payment-plans" element={<PaymentPlansPage />} />
                <Route path="/enrollments" element={<EnrollmentPage />} />
                <Route path="/payments" element={<PaymentPage />} />
                <Route path="/reports/debts" element={<DebtsPage />} />
             </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
