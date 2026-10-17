import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Clock, ShieldCheck, MessageSquare } from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../data/companyData';
import { openWhatsApp } from '../utils/helpers';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const currentYear = CURRENT_YEAR;

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-top">
        <div className="footer-grid">
          {/* Column 1: Company Profile */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo-link" aria-label="FLOWNERGY TECH Home">
              <img src="/images/logo.png" alt="FLOWNERGY TECH" width="60" height="60" className="footer-logo-img" />
            </Link>
            <p>
              Dependable electrical installation, intelligent solar energy solutions, 
              advanced CCTV surveillance, and professional property management for residential, 
              commercial, and industrial clients across Nigeria.
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button 
                type="button" 
                onClick={() => openWhatsApp()} 
                className="btn btn-sm btn-primary"
                id="footer-whatsapp-btn"
                aria-label="Enquire via WhatsApp"
              >
                <MessageSquare size={15} />
                WhatsApp Enquiry
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links (5 Primary Pages) */}
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/projects">Projects</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/contact#quote">Request a Quote</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Four Core Services */}
          <div>
            <h4 className="footer-heading">Our Services</h4>
            <ul className="footer-links">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link to={s.path}>{s.shortTitle}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Operations */}
          <div>
            <h4 className="footer-heading">Corporate Enquiries</h4>
            <div className="footer-contact-item">
              <Mail size={18} className="footer-contact-icon" />
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)' }}>Email Address</span>
                <a href={`mailto:${COMPANY_INFO.email}`} style={{ color: '#FFFFFF' }}>{COMPANY_INFO.email}</a>
              </div>
            </div>

            <div className="footer-contact-item">
              <Clock size={18} className="footer-contact-icon" />
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)' }}>Working Hours</span>
                <span>{COMPANY_INFO.operatingHours}</span>
              </div>
            </div>

            <div className="footer-contact-item">
              <MapPin size={18} className="footer-contact-icon" />
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)' }}>Operating Region</span>
                <span>Serving Clients Nationwide, Nigeria</span>
              </div>
            </div>

            <div className="footer-contact-item">
              <ShieldCheck size={18} className="footer-contact-icon" />
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)' }}>Official Domain</span>
                <span style={{ color: '#E87A00', fontWeight: 'bold' }}>flownergytech.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <div>
            © {currentYear} {COMPANY_INFO.name}. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/about" style={{ color: 'rgba(255,255,255,0.7)' }}>About Company</Link>
            <Link to="/contact" style={{ color: 'rgba(255,255,255,0.7)' }}>Privacy & Enquiries</Link>
            <a href="https://flownergytech.com" target="_blank" rel="noopener noreferrer" style={{ color: '#E87A00' }}>flownergytech.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
