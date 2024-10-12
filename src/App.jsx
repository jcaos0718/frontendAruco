// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ParticleBackground from './components/ParticleBackground';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Game from './pages/Game';
import Background from './pages/Background';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="relative  h-full w-screen" >

          {/* <ParticleBackground/> */}
          <Background/>
                    {/* <Background /> */}
          <Navbar />
          <div className="flex flex-col min-h-screen relative z-10">
            <div className="flex-grow w-screen w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/SignUp" element={<Register />} />
                <Route path="/SignIn" element={<Login />} />
                <Route
                  path="/Profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/Game"
                  element={
                    <PrivateRoute>
                      <Game />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}


export default App;
