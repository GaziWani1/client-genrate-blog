import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const ClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <GoogleOAuthProvider clientId={ClientId}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </>
  );
};

export default App;
