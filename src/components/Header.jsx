import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Mail, 
  Clock, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { scrollToElement } from '../utils/helpers';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileAboutExpanded, setMobileAboutExpanded] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);

  // Close mobile drawer and dropdowns on route change
  const [prevLocationKey, setPrevLocationKey] = useState(location.key);
  if (location.key !== prevLocationKey) {
    setPrevLocationKey(location.key);
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setServicesDropdownOpen(false);
  }

  // Handle outside clicks to close desktop dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (aboutRef.current && !aboutRef.current.contains(event.target)) {
        setAboutDropdownOpen(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSectionNavigate = (hash) => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    if (location.pathname === '/about') {
      scrollToElement(hash);
    } else {
      navigate(`/about#${hash}`);
    }
  };

  const isAboutActive = location.pathname === '/about';
  const isServicesActive = location.pathname.startsWith('/services');

  return (
    <>
      {/* Top Bar for Corporate Presence */}
      <div className="topbar">
        <div className="container topbar-content">
          <div className="topbar-left">
            <span className="topbar-item">
              <Mail size={14} color="#E87A00" />
              <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
            </span>
            <span className="topbar-item">
              <Clock size={14} color="#E87A00" />
              <span>{COMPANY_INFO.operatingHours}</span>
            </span>
          </div>
          <div className="topbar-right">
            <span className="topbar-item">
              <ShieldCheck size={14} color="#E87A00" />
              <span>Engineering & Property Services Across Nigeria</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="header" role="banner">
        <div className="container header-container">
          {/* Official Company Logo */}
          <Link to="/" className="header-logo" aria-label="FLOWNERGY TECH Home">
            <img src="/images/logo.png" alt="FLOWNERGY TECH Logo" width="60" height="60" />
          </Link>

          {/* Desktop Navigation — Exactly 5 Primary Items */}
          <nav className="nav-menu" aria-label="Main Navigation">
            {/* 1. Home */}
            <li className="nav-item">
              <NavLink 
                to="/" 
                end 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Home
              </NavLink>
            </li>

            {/* 2. About Us (with Dropdown: Company Overview, Mission & Vision, Our Values) */}
            <li 
              className="nav-item" 
              ref={aboutRef}
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button 
                type="button"
                className={`nav-link ${isAboutActive ? 'active' : ''}`}
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                aria-expanded={aboutDropdownOpen}
                aria-haspopup="true"
              >
                About Us
                <ChevronDown size={15} style={{ transform: aboutDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              <ul className={`dropdown-menu ${aboutDropdownOpen ? 'is-open' : ''}`} role="menu">
                <li role="none">
                  <Link 
                    to="/about" 
                    className="dropdown-link"
                    onClick={() => setAboutDropdownOpen(false)}
                    role="menuitem"
                  >
                    <div>
                      <span>About Us Overview</span>
                      <span className="dropdown-desc">Corporate background & philosophy</span>
                    </div>
                  </Link>
                </li>
                <li role="none">
                  <button 
                    type="button" 
                    className="dropdown-link" 
                    style={{ width: '100%', textAlign: 'left' }}
                    onClick={() => handleSectionNavigate('overview')}
                    role="menuitem"
                  >
                    <div>
                      <span>Company Overview</span>
                      <span className="dropdown-desc">Our four core technical divisions</span>
                    </div>
                  </button>
                </li>
                <li role="none">
                  <button 
                    type="button" 
                    className="dropdown-link" 
                    style={{ width: '100%', textAlign: 'left' }}
                    onClick={() => handleSectionNavigate('mission-vision')}
                    role="menuitem"
                  >
                    <div>
                      <span>Mission & Vision</span>
                      <span className="dropdown-desc">Our purpose and strategic vision</span>
                    </div>
                  </button>
                </li>
                <li role="none">
                  <button 
                    type="button" 
                    className="dropdown-link" 
                    style={{ width: '100%', textAlign: 'left' }}
                    onClick={() => handleSectionNavigate('values')}
                    role="menuitem"
                  >
                    <div>
                      <span>Our Values</span>
                      <span className="dropdown-desc">Integrity, Safety & Quality</span>
                    </div>
                  </button>
                </li>
              </ul>
            </li>

            {/* 3. Services (with Dropdown: All Services + 4 Dedicated Service Pages) */}
            <li 
              className="nav-item" 
              ref={servicesRef}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button 
                type="button"
                className={`nav-link ${isServicesActive ? 'active' : ''}`}
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                aria-expanded={servicesDropdownOpen}
                aria-haspopup="true"
              >
                Services
                <ChevronDown size={15} style={{ transform: servicesDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              <ul className={`dropdown-menu ${servicesDropdownOpen ? 'is-open' : ''}`} role="menu" style={{ minWidth: '300px' }}>
                <li role="none">
                  <NavLink 
                    to="/services" 
                    end 
                    className="dropdown-link"
                    onClick={() => setServicesDropdownOpen(false)}
                    role="menuitem"
                  >
                    <div>
                      <strong>All Services</strong>
                      <span className="dropdown-desc">Overview of our 4 specialized divisions</span>
                    </div>
                    <ArrowRight size={14} color="#E87A00" />
                  </NavLink>
                </li>
                <li role="none" style={{ borderTop: '1px solid #E2E8F0', marginTop: '4px', paddingTop: '4px' }}>
                  <NavLink 
                    to="/services/electrical-installation" 
                    className="dropdown-link"
                    onClick={() => setServicesDropdownOpen(false)}
                    role="menuitem"
                  >
                    <div>
                      <span>Electrical Installation</span>
                      <span className="dropdown-desc">Wiring, distribution boards & protection</span>
                    </div>
                  </NavLink>
                </li>
                <li role="none">
                  <NavLink 
                    to="/services/solar-energy" 
                    className="dropdown-link"
                    onClick={() => setServicesDropdownOpen(false)}
                    role="menuitem"
                  >
                    <div>
                      <span>Solar Energy</span>
                      <span className="dropdown-desc">Solar PV, inverters & lithium storage</span>
                    </div>
                  </NavLink>
                </li>
                <li role="none">
                  <NavLink 
                    to="/services/cctv-security" 
                    className="dropdown-link"
                    onClick={() => setServicesDropdownOpen(false)}
                    role="menuitem"
                  >
                    <div>
                      <span>CCTV & Security Systems</span>
                      <span className="dropdown-desc">IP cameras, surveillance & remote view</span>
                    </div>
                  </NavLink>
                </li>
                <li role="none">
                  <NavLink 
                    to="/services/property-management" 
                    className="dropdown-link"
                    onClick={() => setServicesDropdownOpen(false)}
                    role="menuitem"
                  >
                    <div>
                      <span>Property Management</span>
                      <span className="dropdown-desc">Facility maintenance & tenant support</span>
                    </div>
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* 4. Projects (directly visible) */}
            <li className="nav-item">
              <NavLink 
                to="/projects" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Projects
              </NavLink>
            </li>

            {/* 5. Contact Us (directly visible) */}
            <li className="nav-item">
              <NavLink 
                to="/contact" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Contact Us
              </NavLink>
            </li>
          </nav>

          {/* Prominent Request a Quote CTA Button & Mobile Toggle */}
          <div className="header-actions">
            <Link to="/contact#quote" className="btn btn-primary" id="header-quote-cta">
              Request a Quote
              <ArrowRight size={16} />
            </Link>

            <button 
              type="button" 
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer & Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true" 
        />
      )}

      <aside className={`mobile-nav-drawer ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="Mobile Navigation">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #E2E8F0' }}>
          <img src="/images/logo.png" alt="FLOWNERGY Logo" width="56" height="56" />
          <button 
            type="button" 
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            style={{ padding: '0.4rem', color: '#324763' }}
          >
            <X size={24} />
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {/* 1. Home */}
          <NavLink 
            to="/" 
            end 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
            style={{ padding: '0.85rem 0.5rem', fontSize: '1.05rem' }}
          >
            Home
          </NavLink>

          {/* 2. About Us with Accordion */}
          <div>
            <div 
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '0.85rem 0.5rem' }}
              onClick={() => setMobileAboutExpanded(!mobileAboutExpanded)}
            >
              <span style={{ fontWeight: 600, color: '#324763', fontSize: '1.05rem' }}>About Us</span>
              <ChevronDown size={18} style={{ transform: mobileAboutExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </div>

            {mobileAboutExpanded && (
              <div style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderLeft: '2px solid #E87A00', marginLeft: '0.5rem', marginVertical: '0.5rem' }}>
                <Link to="/about" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem 0', color: '#4A5B70', fontSize: '0.95rem' }}>
                  About Us Main
                </Link>
                <button type="button" onClick={() => handleSectionNavigate('overview')} style={{ textAlign: 'left', padding: '0.5rem 0', color: '#4A5B70', fontSize: '0.95rem' }}>
                  Company Overview
                </button>
                <button type="button" onClick={() => handleSectionNavigate('mission-vision')} style={{ textAlign: 'left', padding: '0.5rem 0', color: '#4A5B70', fontSize: '0.95rem' }}>
                  Mission & Vision
                </button>
                <button type="button" onClick={() => handleSectionNavigate('values')} style={{ textAlign: 'left', padding: '0.5rem 0', color: '#4A5B70', fontSize: '0.95rem' }}>
                  Our Values
                </button>
              </div>
            )}
          </div>

          {/* 3. Services with Accordion */}
          <div>
            <div 
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '0.85rem 0.5rem' }}
              onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
            >
              <span style={{ fontWeight: 600, color: '#324763', fontSize: '1.05rem' }}>Services</span>
              <ChevronDown size={18} style={{ transform: mobileServicesExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </div>

            {mobileServicesExpanded && (
              <div style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderLeft: '2px solid #E87A00', marginLeft: '0.5rem', marginVertical: '0.5rem' }}>
                <NavLink to="/services" end onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem 0', color: '#E87A00', fontWeight: 'bold', fontSize: '0.95rem' }}>
                  All Services Overview
                </NavLink>
                <NavLink to="/services/electrical-installation" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem 0', color: '#4A5B70', fontSize: '0.95rem' }}>
                  Electrical Installation
                </NavLink>
                <NavLink to="/services/solar-energy" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem 0', color: '#4A5B70', fontSize: '0.95rem' }}>
                  Solar Energy
                </NavLink>
                <NavLink to="/services/cctv-security" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem 0', color: '#4A5B70', fontSize: '0.95rem' }}>
                  CCTV & Security Systems
                </NavLink>
                <NavLink to="/services/property-management" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem 0', color: '#4A5B70', fontSize: '0.95rem' }}>
                  Property Management
                </NavLink>
              </div>
            )}
          </div>

          {/* 4. Projects */}
          <NavLink 
            to="/projects" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
            style={{ padding: '0.85rem 0.5rem', fontSize: '1.05rem' }}
          >
            Projects
          </NavLink>

          {/* 5. Contact Us */}
          <NavLink 
            to="/contact" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
            style={{ padding: '0.85rem 0.5rem', fontSize: '1.05rem' }}
          >
            Contact Us
          </NavLink>

          {/* Mobile Quote Button */}
          <div style={{ marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px solid #E2E8F0' }}>
            <Link 
              to="/contact#quote" 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Request a Quote
              <ArrowRight size={16} />
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
