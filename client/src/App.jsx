import { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { store } from './store/store';
import { initializeAuth, selectIsAuthenticated } from './store/Auth/authSlice';
import theme from './theme';
import ScrollToTop from './components/ui/ScrollToTop';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Events from './pages/Events';
import Volunteer from './pages/Volunteer';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Header from './components/Header';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    setUser({ name: 'John Doe', role: 'student' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <div className="min-h-screen flex flex-col">
       <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs user={user} />} />
            <Route path="/events" element={<Events user={user} />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <ScrollToTop />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;