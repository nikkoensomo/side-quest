import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AboutUsPage from './pages/AboutUsPage'
import ContactUsPage from './pages/ContactUsPage'
import DashboardPage from './pages/DashboardPage'
import { DashboardLayout } from './layouts/DashboardLayout'

function App() {

  return (
    <>
      <Routes>
        <Route path="/landing-page" element={<LandingPage></LandingPage>} />
        <Route path="/dashboard-page" element={<DashboardLayout></DashboardLayout>} />
          <Route index element={<DashboardPage></DashboardPage>} />
        <Route path="/about-us-page" element={<AboutUsPage></AboutUsPage>} />
        <Route path="/contact-us-page" element={<ContactUsPage></ContactUsPage>} />
      </Routes>

    </>
  )
}

export default App
