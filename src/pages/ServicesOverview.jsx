import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Sun, 
  Camera, 
  Building, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';
import { SERVICES } from '../data/companyData';
import { getServiceIcon } from '../utils/icons';
import BreadcrumbBanner from '../components/BreadcrumbBanner';

export default function ServicesOverview() {

  return (
    <div>
      <BreadcrumbBanner 
        title="Our Services"
        subtitle="Specialized engineering, clean energy generation, electronic security surveillance, and facility management services for Nigerian properties."
        crumbs={[{ label: "Services" }]}
      />

      {/* Services Introduction */}
      <section className="section" id="services-intro">
        <div className="container">
          <div className="section-header">
            <span className="badge-tag">Comprehensive Solutions</span>
            <h2>Four Specialized Divisions. One Accountable Partner.</h2>
            <p>
              FLOWNERGY TECH provides integrated solutions tailored to the needs 
              of modern residential, commercial, and industrial clients across Nigeria.
            </p>
          </div>

          {/* Service Blocks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem' }}>
            {SERVICES.map((service, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div 
                  key={service.id} 
                  id={service.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '3.5rem',
                    alignItems: 'center',
                    padding: '2.5rem',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 8px 24px rgba(50,71,99,0.06)'
                  }}
                >
                  {/* Left Column or Right Column depending on odd/even */}
                  <div style={{ order: isEven ? 2 : 1 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 0.9rem', backgroundColor: '#fff4e8', borderRadius: '50px', color: '#E87A00', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1rem' }}>
                      {getServiceIcon(service.id, 28)}
                      <span>{service.badge}</span>
                    </div>

                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#324763' }}>
                      {service.title}
                    </h2>

                    <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.5rem', color: '#4A5B70' }}>
                      {service.description}
                    </p>

                    <h4 style={{ color: '#324763', marginBottom: '0.85rem', fontSize: '1.1rem' }}>Key Service Offerings:</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
                      {service.offerings.slice(0, 4).map((offering, oIdx) => (
                        <div key={oIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                          <CheckCircle2 size={18} color="#E87A00" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <span style={{ fontSize: '0.92rem', color: '#324763', fontWeight: 600 }}>{offering.title}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <Link to={service.path} className="btn btn-navy">
                        View Service Details
                        <ArrowRight size={16} />
                      </Link>
                      <Link 
                        to={`/contact?service=${encodeURIComponent(service.shortTitle)}#quote`} 
                        className="btn btn-primary"
                      >
                        Request a Quote
                      </Link>
                    </div>
                  </div>

                  {/* Image Column */}
                  <div style={{ order: isEven ? 1 : 2 }}>
                    <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 28px rgba(50,71,99,0.12)', height: '360px' }}>
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        loading="lazy" 
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global CTA Section */}
      <section className="section section-navy">
        <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
          <h2 style={{ color: '#FFFFFF', marginBottom: '1.25rem', fontSize: '2.3rem' }}>
            Looking for a Tailored Engineering Proposal?
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.15rem', marginBottom: '2.2rem' }}>
            Contact our technical team today. We provide comprehensive load assessments, site surveys, 
            and transparent itemized quotations.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
            <Link to="/contact#quote" className="btn btn-primary btn-lg">
              Request a Quote
              <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn btn-outline-white btn-lg">
              Contact Us Directly
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
