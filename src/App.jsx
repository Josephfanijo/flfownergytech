import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import ServicesOverview from './pages/ServicesOverview';
import ElectricalInstallation from './pages/ElectricalInstallation';
import SolarEnergy from './pages/SolarEnergy';
import CctvSecurity from './pages/CctvSecurity';
import PropertyManagement from './pages/PropertyManagement';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

// Scroll to top helper on route change (unless hash link is present)
function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (!hash && !search.includes('category=')) {
      window.scrollTo(0, 0);
    }
  }, [pathname, search, hash]);

  return null;
}

// 404 Not Found Page Component
function NotFound() {
  return (
    <div className="section" style={{ textAlign: 'center', padding: '8rem 1.5rem' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <h1 style={{ fontSize: '4rem', color: '#324763', marginBottom: '1rem' }}>404</h1>
        <h2 style={{ marginBottom: '1rem' }}>Page Not Found</h2>
        <p style={{ marginBottom: '2rem' }}>
          The page you are looking for does not exist or has been moved. 
          Please return to our homepage or explore our core services.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <a href="/" className="btn btn-primary">Return to Homepage</a>
          <a href="/services" className="btn btn-navy">Browse Services</a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesOverview />} />
            <Route path="/services/electrical-installation" element={<ElectricalInstallation />} />
            <Route path="/services/solar-energy" element={<SolarEnergy />} />
            <Route path="/services/cctv-security" element={<CctvSecurity />} />
            <Route path="/services/property-management" element={<PropertyManagement />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
