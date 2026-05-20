import './App.css'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/routes/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import AboutUsPage from './pages/AboutUsPage'
import ContactUsPage from './pages/ContactUsPage'
import DashboardPage from './pages/DashboardPage'
import QuestsPage from './pages/QuestsPage'
import DashboardLayout from './layouts/DashboardLayout'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage /> } />
        <Route path="/dashboard-page"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
          <Route index element={<DashboardPage />} />
          <Route path="quests-page" element={<QuestsPage />} />
        </Route>
        <Route path="/about-us-page" element={<AboutUsPage></AboutUsPage>} />
        <Route path="/contact-us-page" element={<ContactUsPage></ContactUsPage>} />
      </Routes>

    </>
  )
}

export default App
