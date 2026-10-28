import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Home as HomeIcon, 
  Factory 
} from 'lucide-react';
import { SERVICES } from '../data/companyData';
import BreadcrumbBanner from '../components/BreadcrumbBanner';
import FAQAccordion from '../components/FAQAccordion';
import QuotationForm from '../components/QuotationForm';

export default function CctvSecurity() {
  const service = SERVICES.find(s => s.id === 'cctv-security');

  return (
    <div>
      <BreadcrumbBanner 
        title={service.title}
        subtitle="High-definition IP surveillance cameras, secure remote smartphone monitoring, blind-spot elimination, and routine system maintenance."
        crumbs={[
          { label: "Services", path: "/services" },
          { label: service.title }
        ]}
      />

      {/* Hero Section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span className="badge-tag">Electronic Surveillance</span>
              <h2 style={{ fontSize: '2.4rem', marginBottom: '1.25rem' }}>{service.heroHeadline}</h2>
              <p className="text-lead" style={{ marginBottom: '1.25rem' }}>
                Effective electronic security begins with intelligent camera selection, correct focal length, 
                and deliberate positioning that removes blind spots at perimeter walls, entrance gates, 
                and sensitive storage areas.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                FLOWNERGY TECH designs and installs high-definition IP camera networks 
                engineered for round-the-clock reliability. With night-vision capabilities, tamper-resistant 
                conduits, surveillance-grade NVR storage, and secure remote viewing on your phone or computer, 
                you maintain complete situational awareness over your premises.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#quote-section" className="btn btn-primary">
                  Request a Security Quote
                  <ArrowRight size={16} />
                </a>
                <Link to="/projects?category=cctv-security#cctv-security" className="btn btn-outline">
                  VIEW PROJECT
                </Link>
              </div>
            </div>

            <div>
              <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 32px rgba(50,71,99,0.12)' }}>
                <img src={service.image} alt="CCTV Security Camera Installation" style={{ width: '100%', height: 'auto' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section className="section section-light" id="offerings">
        <div className="container">
          <div className="section-header">
            <span className="badge-tag">Surveillance Architecture</span>
            <h2>Our CCTV & Security Capabilities</h2>
            <p>From private residential surveillance to multi-camera corporate IP networks.</p>
          </div>

          <div className="features-grid">
            {service.offerings.map((offering, idx) => (
              <div key={idx} className="feature-box">
                <div className="feature-box-icon">
                  <Camera size={24} color="#E87A00" />
                </div>
                <h3>{offering.title}</h3>
                <p>{offering.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Residential, Commercial, and Industrial Requirements */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge-tag">Application Sectors</span>
            <h2>Security Requirements by Sector</h2>
            <p>Tailored surveillance positioning for different security risk profiles.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{ padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(50,71,99,0.05)' }}>
              <div style={{ color: '#324763', marginBottom: '1rem' }}><HomeIcon size={32} /></div>
              <h3 style={{ marginBottom: '0.6rem' }}>Residential Properties</h3>
              <p style={{ fontSize: '0.94rem' }}>Discreet dome cameras for doorways, weather-proof bullet cameras for perimeter fencing, gate monitoring, and mobile phone feeds for homeowners while away.</p>
            </div>

            <div style={{ padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(50,71,99,0.05)' }}>
              <div style={{ color: '#324763', marginBottom: '1rem' }}><Building2 size={32} /></div>
              <h3 style={{ marginBottom: '0.6rem' }}>Commercial & Retail</h3>
              <p style={{ fontSize: '0.94rem' }}>Cashier POS overview, aisle coverage, reception desk logging, employee time tracking corridors, and long-term storage hard drives for dispute resolution.</p>
            </div>

            <div style={{ padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(50,71,99,0.05)' }}>
              <div style={{ color: '#324763', marginBottom: '1rem' }}><Factory size={32} /></div>
              <h3 style={{ marginBottom: '0.6rem' }}>Industrial & Warehouses</h3>
              <p style={{ fontSize: '0.94rem' }}>Long-range PTZ cameras, loading dock monitoring, heavy vehicle gate cameras, perimeter intrusion detection, and central control room monitor walls.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The 6-Step Installation Process */}
      <section className="section section-light">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span className="badge-tag">Methodology</span>
              <h2>How We Deliver Security Projects</h2>
              <p style={{ marginBottom: '1.25rem' }}>
                We avoid rushed jobs. Structured installation ensures neat aesthetics, no exposed dangling wires, 
                and reliable network stability:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {service.process.map((step, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#324763', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', fontWeight: 'bold', flexShrink: 0 }}>
                      {idx + 1}
                    </div>
                    <span style={{ fontSize: '0.95rem', color: '#4A5B70' }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(50,71,99,0.06)' }}>
              <span className="badge-tag" style={{ marginBottom: '1rem' }}>Remote Connectivity</span>
              <h3 style={{ color: '#324763', marginBottom: '1rem' }}>Live Smartphone Surveillance</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                Whether you are across town or travelling abroad, our IP surveillance installations 
                enable real-time camera views, video playback, and alert notifications through encrypted 
                iOS and Android applications.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#324763' }}>
                  <CheckCircle2 size={16} color="#E87A00" /> Secure peer-to-peer mobile streaming
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#324763' }}>
                  <CheckCircle2 size={16} color="#E87A00" /> Multi-user permission level control
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#324763' }}>
                  <CheckCircle2 size={16} color="#E87A00" /> High-retention surveillance hard drives
                </div>
              </div>
              <a href="#quote-section" className="btn btn-navy" style={{ width: '100%' }}>
                Request Surveillance Site Survey
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CCTV FAQs */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge-tag">Common Inquiries</span>
            <h2>CCTV & Security FAQs</h2>
            <p>Practical information about camera types, recording storage, and network setup.</p>
          </div>

          <FAQAccordion items={service.faqs} />
        </div>
      </section>

      {/* Quote Section */}
      <section className="section section-navy" id="quote-section">
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <QuotationForm 
              preselectedService="CCTV & Security Systems"
              title="Request a Security Systems Quotation"
              subtitle="Describe your property layout and number of coverage areas for an itemized surveillance plan."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
