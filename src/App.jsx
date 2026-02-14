/**
 * Smart FHIR Dashboard Application
 * SMART on FHIR enabled patient dashboard with OAuth2 integration
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LaunchPage from './pages/LaunchPage'
import RedirectPage from './pages/RedirectPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/launch" element={<LaunchPage />} />
        <Route path="/" element={<RedirectPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
