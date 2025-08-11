import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import FaqsPage from './pages/FaqsPage';
import Layout from './components/Layout';
import './index.css';

// Komponen pembungkus untuk menangani logika routing utama
const AppRoutes = () => {
  const { token } = useAuth(); // Dapatkan token dan email dari AuthContext

  return (
    <Routes>
      {/* Route Publik: Halaman yang bisa diakses tanpa login */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Protected Routes: Hanya bisa diakses saat pengguna sudah login */}
      {token ? (
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="faqs" element={<FaqsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} /> {/* Redirect ke dashboard jika rute tidak ditemukan */}
        </Route>
      ) : (
        // Redirect ke halaman login jika pengguna belum login
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}
