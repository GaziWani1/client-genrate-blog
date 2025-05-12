import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './Context/AuthContext';
import Dashboard from './components/DashboardRoutes';
import { Toaster } from 'react-hot-toast';
const ClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <GoogleOAuthProvider clientId={ClientId}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
              </Routes>
            </Router>
          </QueryClientProvider>
        </AuthProvider>
        <Toaster />
      </GoogleOAuthProvider>
    </>
  );
};

export default App;
