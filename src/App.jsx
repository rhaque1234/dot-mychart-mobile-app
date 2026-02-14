/**
 * Smart FHIR Dashboard Application
 * SMART on FHIR enabled patient dashboard with OAuth2 integration
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LaunchPage from './pages/LaunchPage'
import RedirectPage from './pages/RedirectPage'
import DemoPage from './pages/DemoPage'
import PatientApp from './pages/PatientApp'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/launch" element={<LaunchPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/patient-app" element={<PatientApp />} />
        <Route path="/" element={<RedirectPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
