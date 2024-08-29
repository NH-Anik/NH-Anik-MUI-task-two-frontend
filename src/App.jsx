import './App.css';
import 'aos/dist/aos.css';
import '@fontsource/open-sans';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { useAuth } from './context/auth';
import Registration from './pages/Auth/Registration';
import Login from './pages/Auth/Login';
import Forgot from './pages/Auth/Forgot';
import PrivateRoute from './component/Routes/Private';
import UserDashboard from './pages/User/UserDashboard';
import AdminRoute from './component/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import PageError from './pages/PageError';
import VerifyEmail from './pages/VerifyEmail';
import LogHome from './pages/LogHome';
import Profile from './pages/User/Profile';
import Users from './pages/Admin/Users';
import CreateAdmin from './pages/Admin/CreateAdmin';
import AdminProfile from './pages/Admin/AdminProfile';

function App() {
  // context API use hook
  const [auth, setAuth] = useAuth();
  return (
    <>
      <Routes>
        {/* Home pages Route*/}
        <Route path="/" element={auth?.user?<Navigate to="/log-home"/>:<Home/>}/>
        {/* Authentication login,registration,forget Route*/}
        <Route path="/registration" element={auth?.user?<Navigate to="/log-home"/>:<Registration/>}/>
        <Route path="/login" element={auth?.user?<Navigate to="/log-home"/>:<Login/>}/>
        <Route path="/forgot" element={auth?.user?<Navigate to="/log-home"/>:<Forgot/>}/>
        {/* login pages Route*/}
        <Route path="/log-home" element={auth?.user?<LogHome/>:<Navigate to="/"/>}/>
        {/* user profile Route*/}
        <Route path="/dashboard" element={<PrivateRoute/>}>
           <Route path="user" element={<UserDashboard/>}/>
           <Route path="user/profile" element={<Profile/>}/>
        </Route>
        {/* admin profile Route*/}
        <Route path="/dashboard" element={<AdminRoute/>}>
           <Route path="admin" element={<AdminDashboard/>}/>
           <Route path="admin/users" element={<Users/>}/>
           <Route path="admin/create-admin" element={<CreateAdmin />} />
           <Route path="admin/admin-profile" element={<AdminProfile />} />
        </Route>
        {/* Registration email-verify Route*/}
        <Route path="/verify-email" element={<VerifyEmail/>}/>
        {/* Error handel Route */}
        <Route path="*" element={<PageError/>}/>
      </Routes>
    </>
  );
}

export default App;
