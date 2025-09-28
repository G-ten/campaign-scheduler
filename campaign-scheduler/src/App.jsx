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
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="create-campaign" element={<CreateCampaign />} />
            <Route path="campaign/:id" element={<CampaignDetail />} />
          </Route>
        </Route>
        <Route path="/login" element={<RequireLogout><Login /></RequireLogout>} />
        <Route path="/signup" element={<RequireLogout><Signup /></RequireLogout>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
