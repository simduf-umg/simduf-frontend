import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import ResetPassword from "./pages/AuthPages/ResetPassword";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Calendar from "./pages/Calendar";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoadingScreen from "./components/common/LoadingScreen";
import Empleados from "./pages/Empleados";
import RoleBasedGuard from "./components/auth/RoleBasedGuard";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Rutas protegidas */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            {/* Rutas accesibles para todos los usuarios autenticados */}
            <Route index path="/" element={<Home />} />
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendario" element={<Calendar />} />
            
            {/* Rutas protegidas solo para ADMIN */}
            <Route
              path="/empleados"
              element={
                <RoleBasedGuard allowedRoles={["ADMIN"]} redirectTo="/">
                  <Empleados />
                </RoleBasedGuard>
              }
            />
            <Route
              path="/usuarios"
              element={
                <RoleBasedGuard allowedRoles={["ADMIN"]} redirectTo="/">
                  <UserProfiles />
                </RoleBasedGuard>
              }
            />
            <Route
              path="/roles"
              element={
                <RoleBasedGuard allowedRoles={["ADMIN"]} redirectTo="/">
                  <UserProfiles />
                </RoleBasedGuard>
              }
            />
            <Route
              path="/boveda"
              element={
                <RoleBasedGuard allowedRoles={["ADMIN"]} redirectTo="/">
                  <UserProfiles />
                </RoleBasedGuard>
              }
            />
          </Route>

          {/* Ruta de fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
