import "./App.css";

import { AuthProvider } from "./context/AuthContext";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Modal from "react-modal";

import LandingPage from "./pages/landing/LandingPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import AccountPage from './pages/account/AccountPage';
import ProfilesPage from './pages/profileDetail/ProfilesPage';
import ProfilesListPage from "./pages/profilesList/ProfilesListPage";

Modal.setAppElement('#root');

function App() {
  return (
    <>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' exact element={<LandingPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/profilelist' element={<ProfilesListPage />} />
          <Route path='/profiles/:name' element={<ProfilesPage />} />
        </Routes>
      </Router>
    </AuthProvider>
    </>
  )
}

export default App;