import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home            from './pages/Home';
import Login           from './pages/Login';
import Register        from './pages/Register';
import WorkshopList    from './pages/WorkshopList';
import WorkshopDetail  from './pages/WorkshopDetail';
import ProposeWorkshop from './pages/ProposeWorkshop';
import WorkshopStatus  from './pages/WorkshopStatus';
import Statistics      from './pages/Statistics';
import NotFound        from './pages/NotFound';

function Layout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/login"      element={<Login />} />
            <Route path="/register"   element={<Register />} />
            <Route path="/workshops"  element={<WorkshopList />} />
            <Route path="/workshops/:id" element={<WorkshopDetail />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/propose" element={
              <ProtectedRoute><ProposeWorkshop /></ProtectedRoute>
            } />
            <Route path="/status" element={
              <ProtectedRoute><WorkshopStatus /></ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}