import './App.css';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './routes/authRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateCampaign from './pages/CreateCampaign';
import CampaignDetail from './pages/CampaignDetail';
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout';
import RequireLogout from './routes/publicRoute';
import NotFoundPage from './components/NotFound';

const App = () => {
  return (
    <div className="h-100">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover={false}
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/create-campaign" element={<RequireAuth><CreateCampaign /></RequireAuth>} />
          <Route path="/campaign/:id" element={<RequireAuth><CampaignDetail /></RequireAuth>} />
        </Route>
        <Route path="/login" element={<RequireLogout><Login /></RequireLogout>} />
        <Route path="/signup" element={<RequireLogout><Signup /></RequireLogout>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
