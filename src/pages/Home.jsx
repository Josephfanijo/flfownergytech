import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Sun, 
  Camera, 
  Building, 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  Award, 
  Users, 
  Clock, 
  PhoneCall 
} from 'lucide-react';
import { SERVICES, PROJECTS_DATA, SECTORS, WORK_PROCESS } from '../data/companyData';
import { getServiceIcon, getSectorIcon } from '../utils/icons';
import { openWhatsApp } from '../utils/helpers';
import QuotationForm from '../components/QuotationForm';

export default function Home() {
  return (
    <div>
      {/* =========================================================================
          SECTION 1: HERO
          ========================================================================= */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <ShieldCheck size={16} />
                <span>FLOWNERGY TECH — Corporate Solutions</span>
              </div>

              <h1 id="hero-heading">
                Powering, Protecting & Managing Your <span>Property</span>.
              </h1>

              <p>
                Reliable electrical installation, intelligent solar energy solutions, 
                advanced security systems, and professional property management for 
                residential, commercial, and industrial clients.
              </p>

              <div className="hero-actions">
                <Link to="/contact#quote" className="btn btn-primary btn-lg" id="hero-quote-cta">
                  Request a Quote
                  <ArrowRight size={18} />
                </Link>
                <Link to="/services" className="btn btn-outline-white btn-lg" id="hero-services-cta">
                  Explore Our Services
                </Link>
              </div>
            </div>

            <div className="hero-image-wrapper">
              <div className="hero-image-card">
                <img 
                  src="/images/flownergy-engineer.jpg" 
                  alt="FLOWNERGY Certified Field Engineering Team" 
                  className="hero-engineer-img"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          {/* Quick Pillars Overview */}
          <div className="hero-features">
            <div className="hero-feature-item">
              <div className="hero-feature-icon">
                <Zap size={20} />
              </div>
              <div className="hero-feature-text">
                <strong>Electrical Engineering</strong>
                <span>Safety & code-compliant wiring</span>
              </div>
            </div>

            <div className="hero-feature-item">
              <div className="hero-feature-icon">
                <Sun size={20} />
              </div>
              <div className="hero-feature-text">
                <strong>Solar & Storage</strong>
                <span>Reliable renewable power</span>
              </div>
            </div>

            <div className="hero-feature-item">
              <div className="hero-feature-icon">
                <Camera size={20} />
              </div>
              <div className="hero-feature-text">
                <strong>CCTV & IP Surveillance</strong>
                <span>Modern property protection</span>
              </div>
            </div>

            <div className="hero-feature-item">
              <div className="hero-feature-icon">
                <Building size={20} />
              </div>
              <div className="hero-feature-text">
                <strong>Property Management</strong>
                <span>Facility supervision & care</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: COMPANY INTRODUCTION
          ========================================================================= */}
      <section className="section section-light" id="company-intro">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span className="badge-tag">Company Profile</span>
              <h2 style={{ marginBottom: '1.25rem' }}>Integrated Solutions. Dependable Service.</h2>
              <p className="text-lead" style={{ marginBottom: '1.25rem' }}>
                FLOWNERGY TECH delivers specialized electrical installation, 
                intelligent solar energy solutions, high-definition CCTV security systems, 
                and comprehensive property management across Nigeria.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                Managing modern infrastructure requires dependable engineering and attentive supervision. 
                Rather than dealing with uncoordinated contractors, our clients benefit from a single, 
                accountable partner dedicated to technical excellence, verified safety protocols, 
                and long-term property preservation.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/about" className="btn btn-navy">
                  Learn More About Us
                  <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn btn-outline">
                  Contact Our Team
                </Link>
              </div>
            </div>

            {/* Visual Highlights Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(50,71,99,0.06)' }}>
                <div style={{ color: '#E87A00', marginBottom: '0.75rem' }}><Zap size={28} /></div>
                <h4 style={{ color: '#324763', marginBottom: '0.4rem', fontSize: '1.05rem' }}>Quality Workmanship</h4>
                <p style={{ fontSize: '0.88rem', margin: 0 }}>Rigorous installation standards with clean conduit trunking and tested components.</p>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(50,71,99,0.06)' }}>
                <div style={{ color: '#324763', marginBottom: '0.75rem' }}><Sun size={28} /></div>
                <h4 style={{ color: '#324763', marginBottom: '0.4rem', fontSize: '1.05rem' }}>Continuous Power</h4>
                <p style={{ fontSize: '0.88rem', margin: 0 }}>Custom hybrid solar designs eliminating downtime for homes and corporate facilities.</p>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(50,71,99,0.06)' }}>
                <div style={{ color: '#5F7894', marginBottom: '0.75rem' }}><Camera size={28} /></div>
                <h4 style={{ color: '#324763', marginBottom: '0.4rem', fontSize: '1.05rem' }}>Smart Surveillance</h4>
                <p style={{ fontSize: '0.88rem', margin: 0 }}>High-resolution IP surveillance with remote viewing access and night vision clarity.</p>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(50,71,99,0.06)' }}>
                <div style={{ color: '#E87A00', marginBottom: '0.75rem' }}><Building size={28} /></div>
                <h4 style={{ color: '#324763', marginBottom: '0.4rem', fontSize: '1.05rem' }}>Facility Oversight</h4>
                <p style={{ fontSize: '0.88rem', margin: 0 }}>Preventive property upkeep, regular condition reporting, and structured tenant support.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: FOUR CORE SERVICES (Entire Box is Clickable Button)
          ========================================================================= */}
      <section className="section" id="core-services">
        <div className="container">
          <div className="section-header">
            <span className="badge-tag">Our Core Divisions</span>
            <h2>Our Services</h2>
            <p>
              Tailored technical installations, energy generation, and property care delivered 
              with uncompromising engineering precision. Click any service to explore full specifications.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES.map((service) => (
              <Link 
                key={service.id} 
                to={service.path}
                className="service-card service-card-clickable"
                aria-label={`Explore ${service.title} services`}
              >
                <div className="service-card-media">
                  <img src={service.image} alt={service.title} loading="lazy" />
                  <span className="service-card-badge">{service.badge}</span>
                </div>
                <div className="service-card-body">
                  <div className="service-card-icon">
                    {getServiceIcon(service.id)}
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  
                  {/* Unified Card CTA Affordance — No repetitive duplicate buttons */}
                  <div className="service-card-cta-bar">
                    <span>View Service Details & Scope</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: WHY CHOOSE FLOWNERGY TECH
          ========================================================================= */}
      <section className="section section-light" id="why-choose-us">
        <div className="container">
          <div className="section-header">
            <span className="badge-tag">The FLOWNERGY Standard</span>
            <h2>Why Choose FLOWNERGY?</h2>
            <p>
              Built on technical discipline, verified workmanship, and accountable project delivery.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-box">
              <div className="feature-box-icon"><CheckCircle size={26} color="#E87A00" /></div>
              <h3>Professional Approach</h3>
              <p>
                From initial assessment to final commissioning, our engineering team operates 
                with structured project schedules, clear scope documentation, and tidy worksites.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-box-icon"><Award size={26} color="#324763" /></div>
              <h3>Quality Workmanship</h3>
              <p>
                We do not compromise on installation integrity. Cables are properly conduit-routed, 
                terminations are torque-checked, and equipment is securely anchored.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-box-icon"><ShieldCheck size={26} color="#5F7894" /></div>
              <h3>Safety-Conscious Service</h3>
              <p>
                Electrical safety is non-negotiable. We integrate proper earthing, surge arrestors, 
                and correctly sized circuit breakers to protect life and property.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-box-icon"><Zap size={26} color="#E87A00" /></div>
              <h3>Practical Technical Solutions</h3>
              <p>
                We design systems sized realistically to your energy demand and site layout, 
                avoiding both underperforming setups and wasteful overspecification.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-box-icon"><Users size={26} color="#324763" /></div>
              <h3>Customer-Focused Support</h3>
              <p>
                We build long-term relationships. Our team provides responsive communication, 
                post-installation walk-throughs, and rapid troubleshooting support.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-box-icon"><Clock size={26} color="#5F7894" /></div>
              <h3>Reliable Project Communication</h3>
              <p>
                Transparent project timelines, proactive status updates, and clear 
                itemized quotations ensure complete predictability without hidden surprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: FEATURED PROJECTS
          ========================================================================= */}
      <section className="section" id="featured-projects">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <span className="badge-tag">Portfolio Highlights</span>
              <h2>Our Projects</h2>
              <p style={{ maxWidth: '600px', margin: 0 }}>
                Selected project implementations demonstrating our electrical, solar, 
                security surveillance, and property management capability.
              </p>
            </div>
            <Link to="/projects" className="btn btn-navy">
              View All Projects
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="projects-grid">
            {PROJECTS_DATA.slice(0, 3).map((project) => (
              <article key={project.id} className="project-card">
                <div className="project-media">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <span className="project-category-badge">{project.service}</span>
                </div>
                <div className="project-body">
                  <span className="project-location">{project.location}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to="/projects" className="service-card-link" style={{ fontSize: '0.9rem' }}>
                      View Project Details <ArrowRight size={14} />
                    </Link>
                    <Link to={`/contact?service=${encodeURIComponent(project.service)}#quote`} className="btn btn-sm btn-outline">
                      Request Similar Quote
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: INDUSTRIES WE SERVE
          ========================================================================= */}
      <section className="section section-light" id="industries">
        <div className="container">
          <div className="section-header">
            <span className="badge-tag">Market Coverage</span>
            <h2>Solutions Across Different Sectors</h2>
            <p>
              We engineer dependable technical and facility solutions tailored to diverse 
              residential, commercial, and industrial property environments.
            </p>
          </div>

          <div className="sectors-grid">
            {SECTORS.map((sector, index) => (
              <div key={index} className="sector-card">
                <div className="sector-icon">
                  {getSectorIcon(index)}
                </div>
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
          SECTION 7: HOW WE WORK
          ========================================================================= */}
      <section className="section" id="how-we-work">
        <div className="container">
          <div className="section-header">
            <span className="badge-tag">Methodology</span>
            <h2>A Clear Process From Enquiry to Delivery</h2>
            <p>
              Every installation and management contract follows a disciplined 5-stage roadmap, 
              guaranteeing quality, safety, and accountability at every milestone.
            </p>
          </div>

          <div className="process-grid">
            {WORK_PROCESS.map((p) => (
              <div key={p.step} className="process-step">
                <div className="process-number">{p.step}</div>
                <h3 style={{ color: '#324763' }}>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: CLIENT COMMITMENT & TESTIMONIALS (Integrity-Preserving)
          ========================================================================= */}
      <section className="section section-light" id="client-commitment">
        <div className="container">
          <div className="section-header">
            <span className="badge-tag">Service Integrity</span>
            <h2>What Our Clients Say</h2>
            <p>
              Our reputation is built on transparent relationships, meticulous craftsmanship, 
              and verified results.
            </p>
          </div>

          <div style={{ maxWidth: '820px', margin: '0 auto', backgroundColor: '#FFFFFF', padding: '3rem', borderRadius: '16px', border: '1px solid #E2E8F0', textAlign: 'center', boxShadow: '0 4px 16px rgba(50,71,99,0.06)' }}>
            <div style={{ display: 'inline-flex', padding: '0.8rem', backgroundColor: '#fff4e8', borderRadius: '50%', color: '#E87A00', marginBottom: '1.25rem' }}>
              <ShieldCheck size={36} />
            </div>
            <h3 style={{ color: '#324763', marginBottom: '1rem', fontSize: '1.4rem' }}>
              Commitment to Authentic Client Feedback
            </h3>
            <p style={{ fontSize: '1.05rem', color: '#4A5B70', lineHeight: '1.7', marginBottom: '1.75rem' }}>
              FLOWNERGY TECH operates strictly on truth and accountability. 
              We do not publish fabricated quotes or invented client reviews. 
              Client references and site evaluation reports are shared during technical proposals 
              upon client consent.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: '#5F7894', fontWeight: 600, fontSize: '0.92rem' }}>
              <span>Verified Workmanship • Certified Safety • Transparent Quotations</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: REQUEST A QUOTE (Embedded interactive section)
          ========================================================================= */}
      <section className="section section-navy" id="quote">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span className="badge-tag badge-tag-white">Direct Engagement</span>
              <h2 style={{ color: '#FFFFFF', marginBottom: '1.25rem', fontSize: '2.4rem' }}>
                Let's Discuss Your Next Project.
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.15rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                Whether you need electrical installation, solar energy solutions, security systems, 
                or property management, contact FLOWNERGY TECH to discuss your requirements.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#FFFFFF' }}>
                  <CheckCircle size={18} color="#E87A00" />
                  <span>Itemized, transparent technical pricing</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#FFFFFF' }}>
                  <CheckCircle size={18} color="#E87A00" />
                  <span>On-site evaluation & load audit available</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#FFFFFF' }}>
                  <CheckCircle size={18} color="#E87A00" />
                  <span>Rapid response via phone, email, or WhatsApp</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button 
                  type="button"
                  onClick={() => openWhatsApp("Hello FLOWNERGY TECH, I would like to request a quotation for my project.")}
                  className="btn btn-primary"
                >
                  <PhoneCall size={16} />
                  Chat on WhatsApp
                </button>
                <Link to="/contact" className="btn btn-outline-white">
                  Visit Contact Page
                </Link>
              </div>
            </div>

            {/* Embedded Quotation Form */}
            <div>
              <QuotationForm 
                title="Request a Fast Project Quote" 
                subtitle="Fill in your project details for an immediate engineering assessment."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
