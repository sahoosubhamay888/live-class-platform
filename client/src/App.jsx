import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from "./context/AuthContext"
import { SessionProvider } from "./context/SessionContext"
import { ROUTES } from './utils/constants';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/routing/ScrollToTop';
import ProtectedRoute from './components/routing/ProtectedRoute';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import HostSession from './pages/HostSession';
import JoinSession from './pages/JoinSession';
import HelpCenter from './pages/HelpCenter';
import Documentation from './pages/Documentation';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function App() {
  return (
    <AuthProvider>
      <SessionProvider>
        <Router>
          <ScrollToTop />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#0F172A',
                color: '#F8FAFC',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '1rem',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                padding: '12px 20px',
                fontSize: '0.95rem',
              },
            }}
          />
          <div className='min-h-screen flex flex-col bg-[#0B1120]'>
            <Routes>
              {/* Public routes */}
              <Route
                path={ROUTES.HOME}
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />

              <Route
                path={ROUTES.HELP}
                element={
                  <Layout>
                    <HelpCenter />
                  </Layout>
                }
              />

              <Route
                path={ROUTES.DOCS}
                element={
                  <Layout>
                    <Documentation />
                  </Layout>
                }
              />

              <Route
                path={ROUTES.PRIVACY}
                element={
                  <Layout>
                    <PrivacyPolicy />
                  </Layout>
                }
              />

              <Route
                path={ROUTES.TERMS}
                element={
                  <Layout>
                    <TermsOfService />
                  </Layout>
                }
              />

              <Route
                path={ROUTES.LOGIN}
                element={
                  <Layout showHeader={false} showFooter={false}>
                    <Auth />
                  </Layout>
                }
              />

              <Route
                path={ROUTES.REGISTER}
                element={
                  <Layout showHeader={false} showFooter={false}>
                    <Auth />
                  </Layout>
                }
              />

              {/* Protected routes */}
              <Route
                path={ROUTES.DASHBOARD}
                element={
                  <ProtectedRoute>
                    <Layout >
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path={ROUTES.HOST}
                element={
                  <ProtectedRoute>
                    <Layout showHeader={false} showFooter={false}>
                      <HostSession />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path={ROUTES.JOIN}
                element={
                  <ProtectedRoute>
                    <Layout showHeader={false} showFooter={false}>
                      <JoinSession />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path='*'
                element={
                  <Layout showHeader={false} showFooter={false}>
                    <div className='min-h-screen flex items-center justify-center px-4'>
                      <div className='text-center'>
                        <h1 className='text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-4'>
                          404
                        </h1>
                        <p className='text-slate-300 text-lg mb-6'>Page not found</p>
                        <Link
                          to='/'
                          className='inline-flex items-center px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:scale-105 transition-all shadow-lg shadow-indigo-500/30'
                        >
                          Back to Home
                        </Link>
                      </div>
                    </div>
                  </Layout>
                }
              />
            </Routes>
          </div>
        </Router>
      </SessionProvider>
    </AuthProvider>

  )
}

export default App