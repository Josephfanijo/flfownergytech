import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Target, 
  Compass, 
  Zap, 
  Sun, 
  Camera, 
  Building, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { COMPANY_INFO, SECTORS } from '../data/companyData';
import { scrollToElement } from '../utils/helpers';
import BreadcrumbBanner from '../components/BreadcrumbBanner';

export default function About() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => scrollToElement(location.hash.substring(1)), 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div>
      <BreadcrumbBanner 
        title="About FLOWNERGY TECH"
        subtitle="Delivering integrated electrical engineering, renewable solar power, electronic security, and professional property management across Nigeria."
        crumbs={[{ label: "About Us" }]}
      />

      {/* =========================================================================
          SECTION 1: COMPANY OVERVIEW
          ========================================================================= */}
      <section className="section" id="overview">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span className="badge-tag">Company Overview</span>
              <h2>Integrated Engineering & Property Solutions</h2>
              <p className="text-lead" style={{ marginBottom: '1.25rem' }}>
                FLOWNERGY TECH is a multidisciplinary engineering and property services 
                company established to provide dependable solutions across four vital divisions: 
                <strong> Electrical Installation</strong>, <strong>Solar Energy</strong>, 
                <strong> CCTV & Security Systems</strong>, and <strong>Property Management</strong>.
              </p>
              <p style={{ marginBottom: '1.25rem' }}>
                Modern residential estates, commercial facilities, and industrial complexes demand 
                infrastructure that works without compromise. From electrical load balancing and safe 
                distribution panels, to clean uninterrupted solar power, high-definition surveillance 
                coverage, and meticulous facility upkeep, our integrated model bridges technical expertise 
                with dedicated customer care.
              </p>
              <p style={{ marginBottom: '1.75rem' }}>
                By coordinating technical installations and long-term facility oversight under one accountable 
                banner, we protect client investments, eliminate unnecessary downtime, and maintain high safety standards.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/services" className="btn btn-navy">
                  Explore Our Services
                  <ArrowRight size={16} />
                </Link>
                <Link to="/contact#quote" className="btn btn-primary">
                  Request a Quote
                </Link>
              </div>
            </div>

            {/* Visual Four Divisions Matrix */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div style={{ backgroundColor: '#F5F7F9', padding: '1.8rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div style={{ color: '#E87A00', marginBottom: '0.75rem' }}><Zap size={28} /></div>
                <h4 style={{ color: '#324763', marginBottom: '0.4rem' }}>Electrical</h4>
                <p style={{ fontSize: '0.88rem', margin: 0 }}>Safe wiring, fault finding, surge protection & load balancing.</p>
              </div>

              <div style={{ backgroundColor: '#F5F7F9', padding: '1.8rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div style={{ color: '#324763', marginBottom: '0.75rem' }}><Sun size={28} /></div>
                <h4 style={{ color: '#324763', marginBottom: '0.4rem' }}>Solar Energy</h4>
                <p style={{ fontSize: '0.88rem', margin: 0 }}>Hybrid inverters, Tier-1 panels & lithium LiFePO4 batteries.</p>
              </div>

              <div style={{ backgroundColor: '#F5F7F9', padding: '1.8rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div style={{ color: '#5F7894', marginBottom: '0.75rem' }}><Camera size={28} /></div>
                <h4 style={{ color: '#324763', marginBottom: '0.4rem' }}>CCTV Security</h4>
                <p style={{ fontSize: '0.88rem', margin: 0 }}>HD IP surveillance, mobile monitoring & perimeter defense.</p>
              </div>

              <div style={{ backgroundColor: '#F5F7F9', padding: '1.8rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div style={{ color: '#E87A00', marginBottom: '0.75rem' }}><Building size={28} /></div>
                <h4 style={{ color: '#324763', marginBottom: '0.4rem' }}>Property Mgmt</h4>
                <p style={{ fontSize: '0.88rem', margin: 0 }}>Facility inspections, maintenance & tenant communication.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: MISSION & VISION
          ========================================================================= */}
      <section className="section section-light" id="mission-vision">
        <div className="container">
          <div className="section-header">
            <span className="badge-tag">Corporate Direction</span>
            <h2>Mission & Vision</h2>
            <p>Guided by practical purpose, continuous engineering refinement, and client trust.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {/* Mission Statement */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '3rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(50,71,99,0.06)', position: 'relative' }}>
              <div style={{ display: 'inline-flex', padding: '0.85rem', backgroundColor: '#fff4e8', borderRadius: '12px', color: '#E87A00', marginBottom: '1.5rem' }}>
                <Target size={30} />
              </div>
              <h3 style={{ color: '#324763', fontSize: '1.5rem', marginBottom: '1rem' }}>Our Mission</h3>
              <blockquote style={{ fontSize: '1.18rem', color: '#324763', fontWeight: 600, lineHeight: '1.7', borderLeft: '4px solid #E87A00', paddingLeft: '1.25rem', marginBottom: '1.2rem', fontStyle: 'italic' }}>
                "{COMPANY_INFO.mission}"
              </blockquote>
              <p style={{ fontSize: '0.94rem', color: '#718296', margin: 0 }}>
                Every project we undertake is driven by disciplined workmanship, practical safety considerations, 
                and long-term functional value.
              </p>
            </div>

            {/* Vision Statement */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '3rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(50,71,99,0.06)', position: 'relative' }}>
              <div style={{ display: 'inline-flex', padding: '0.85rem', backgroundColor: '#e8eef5', borderRadius: '12px', color: '#324763', marginBottom: '1.5rem' }}>
                <Compass size={30} />
              </div>
              <h3 style={{ color: '#324763', fontSize: '1.5rem', marginBottom: '1rem' }}>Our Vision</h3>
              <blockquote style={{ fontSize: '1.18rem', color: '#324763', fontWeight: 600, lineHeight: '1.7', borderLeft: '4px solid #324763', paddingLeft: '1.25rem', marginBottom: '1.2rem', fontStyle: 'italic' }}>
                "{COMPANY_INFO.vision}"
              </blockquote>
              <p style={{ fontSize: '0.94rem', color: '#718296', margin: 0 }}>
                Aspiring to set the benchmark for technical accountability, dependable power availability, 
                and holistic asset management in Nigeria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: CORE VALUES
          ========================================================================= */}
      <section className="section" id="values">
        <div className="container">
          <div className="section-header">
            <span className="badge-tag">Guiding Principles</span>
            <h2>Our Core Values</h2>
            <p>The uncompromising standards that shape every technical decision, installation, and client interaction.</p>
          </div>

          <div className="features-grid">
            {COMPANY_INFO.coreValues.map((val, idx) => (
              <div key={idx} className="feature-box">
                <div className="feature-box-icon">
                  <CheckCircle2 size={24} color="#E87A00" />
                </div>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: OUR APPROACH
          ========================================================================= */}
      <section className="section section-light" id="our-approach">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span className="badge-tag">Service Methodology</span>
              <h2>Our Structured Approach</h2>
              <p className="text-lead" style={{ marginBottom: '1.5rem' }}>
                Engineering success requires disciplined listening, thorough on-site diagnosis, 
                transparent planning, and rigorous testing.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#324763', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>1</div>
                  <div>
                    <h4 style={{ color: '#324763', marginBottom: '0.2rem' }}>Understanding Real Needs</h4>
                    <p style={{ fontSize: '0.94rem', margin: 0 }}>We begin by actively listening to your operational requirements, pain points, and power or facility goals.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#324763', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>2</div>
                  <div>
                    <h4 style={{ color: '#324763', marginBottom: '0.2rem' }}>Technical Site & Load Assessment</h4>
                    <p style={{ fontSize: '0.94rem', margin: 0 }}>We audit actual wattages, wire gauges, camera viewing angles, and physical property conditions.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#324763', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>3</div>
                  <div>
                    <h4 style={{ color: '#324763', marginBottom: '0.2rem' }}>Clear Itemized Quotations</h4>
                    <p style={{ fontSize: '0.94rem', margin: 0 }}>No ambiguous lump sums. Every proposal clearly specifies component ratings, brands, and scope.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#324763', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>4</div>
                  <div>
                    <h4 style={{ color: '#324763', marginBottom: '0.2rem' }}>Dedicated Support & Handover</h4>
                    <p style={{ fontSize: '0.94rem', margin: 0 }}>We commission each system with safety tests, provide client demonstrations, and offer ongoing maintenance.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Approach Callout Box */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '3rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(50,71,99,0.06)' }}>
              <span className="badge-tag" style={{ marginBottom: '1rem' }}>Safety & Integrity</span>
              <h3 style={{ color: '#324763', marginBottom: '1rem' }}>Why Professional Engineering Matters</h3>
              <p style={{ fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                In Nigeria, substandard wiring and poorly sized solar batteries cause frequent component 
                burnouts, dangerous electrical fires, and expensive asset losses. 
              </p>
              <p style={{ fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '1.75rem' }}>
                FLOWNERGY TECH prioritizes standard circuit protection, proper grounding, and 
                clean cable trunking so that every installation runs safely and reliably for years to come.
              </p>
              <Link to="/contact#quote" className="btn btn-primary" style={{ width: '100%' }}>
                Request an Engineering Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: INDUSTRIES AND CUSTOMERS
          ========================================================================= */}
      <section className="section" id="industries">
        <div className="container">
          <div className="section-header">
            <span className="badge-tag">Customer Segments</span>
            <h2>Industries & Customers Served</h2>
            <p>From private homes to commercial plazas and industrial facilities, our solutions are engineered for stability.</p>
          </div>

          <div className="sectors-grid">
            {SECTORS.map((sector, index) => (
              <div key={index} className="sector-card">
                <div>
                  <h3 style={{ color: '#324763' }}>{sector.title}</h3>
                  <p style={{ margin: 0 }}>{sector.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: CTA BANNER
          ========================================================================= */}
      <section className="section section-navy">
        <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
          <h2 style={{ color: '#FFFFFF', marginBottom: '1.25rem', fontSize: '2.3rem' }}>
            Ready to Partner With FLOWNERGY TECH?
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.15rem', marginBottom: '2.2rem' }}>
            Contact our engineering and facility team today to discuss your project requirements or request an on-site survey.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
            <Link to="/contact#quote" className="btn btn-primary btn-lg">
              Request a Quote
              <ArrowRight size={18} />
            </Link>
            <Link to="/services" className="btn btn-outline-white btn-lg">
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
