import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Definisikan tipe untuk konteks otentikasi
interface AuthContextType {
  token: string | null;
  userEmail: string | null;
  login: (token: string, userEmail: string) => void;
  logout: () => void;
}

// Buat konteks dengan nilai default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Definisikan props untuk AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  // useEffect untuk memeriksa token dan email di localStorage saat komponen dimuat
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("userEmail");
    if (storedToken && storedEmail) {
      setToken(storedToken);
      setUserEmail(storedEmail);
    }
  }, []);

  // Fungsi untuk login, sekarang menerima token dan userEmail
  const login = useCallback((newToken: string, newEmail: string) => {
    setToken(newToken);
    setUserEmail(newEmail);
    localStorage.setItem("token", newToken);
    localStorage.setItem("userEmail", newEmail);
  }, []);

  // Fungsi untuk logout
  const logout = useCallback(() => {
    setToken(null);
    setUserEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  }, [navigate]);

  // Nilai yang akan disediakan oleh konteks
  const value = {
    token,
    userEmail,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Buat hook kustom untuk memudahkan penggunaan
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
