import { useState } from 'react';
import { BrowserRouter, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "./components/LoadingSpinner";
import CustomToast from "./components/CustomToast";
import AppRoutes from "./routes/AppRoutes";
import { useAuthContext } from "./auth/AuthContext";
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';

export default function App() {
  const { user, loading, logout } = useAuthContext();
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  // Loading state
  if (loading) {
    return <LoadingSpinner text="Carregando aplicação..." />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          gutter={8}
          containerStyle={{
            bottom: 40,
            right: 40,
          }}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#fff",
              color: "#1e293b",
              boxShadow:
                "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
              borderRadius: "0.75rem",
              padding: "1rem",
              minWidth: "300px",
            },
            success: {
              iconTheme: { primary: "#16a34a", secondary: "#fff" },
              style: {
                background: "#f0fdf4",
                color: "#15803d",
                border: "1px solid #dcfce7",
              },
            },
            error: {
              iconTheme: { primary: "#dc2626", secondary: "#fff" },
              style: {
                background: "#fef2f2",
                color: "#b91c1c",
                border: "1px solid #fee2e2",
              },
            },
            custom: { duration: 4000 },
          }}
        >
          {(t) => (
            <CustomToast
              toast={t}
              message={t.message as string}
              type={t.type as "success" | "error"}
            />
          )}
        </Toaster>
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link
                to="/"
                className="text-xl font-semibold text-gray-900 hover:text-primary-600 transition-colors"
              >
                Encurtador de URL
              </Link>
              <div className="flex items-center gap-4">
                {user ? (
                  <button
                    onClick={() => logout()}
                    className="btn-secondary"
                  >
                    Sair
                  </button>
                ) : (
                  <button
                    onClick={() => setLoginOpen(true)}
                    className="btn-primary"
                  >
                    Entrar
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
        <main className="py-8">
          <AppRoutes />
        </main>
        <LoginModal
          open={loginOpen}
          onClose={() => setLoginOpen(false)}
          onOpenSignup={() => { setLoginOpen(false); setSignupOpen(true); }}
        />
        <SignupModal
          open={signupOpen}
          onClose={() => setSignupOpen(false)}
          onOpenLogin={() => { setSignupOpen(false); setLoginOpen(true); }}
        />
      </div>
    </BrowserRouter>
  );
}
