import "./App.css";

import { AuthProvider } from "./context/AuthContext";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Modal from "react-modal";

import Nav from "./components/layout/Nav";

import LandingPage from "./pages/landing/LandingPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import AccountPage from './pages/account/AccountPage';
import ProfilesPage from './pages/profiles/ProfilesPage';
import FeedPage from "./pages/feed/FeedPage";

Modal.setAppElement('#root');


function App() {
  const auth = localStorage.getItem("auth");

  return (
    <>
    <AuthProvider>
      <Router>
        {auth && <Nav />}
        <Routes>
          <Route path='/' element={auth ? <DashboardPage /> : <LandingPage />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/feed' element={<FeedPage />} />
          <Route path='/profiles/:name' element={<ProfilesPage />} />
        </Routes>
      </Router>
    </AuthProvider>
    </>
  )
}

export default App;