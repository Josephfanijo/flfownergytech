import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Building2, 
  Home as HomeIcon, 
  Factory 
} from 'lucide-react';
import { SERVICES } from '../data/companyData';
import BreadcrumbBanner from '../components/BreadcrumbBanner';
import FAQAccordion from '../components/FAQAccordion';
import QuotationForm from '../components/QuotationForm';

export default function ElectricalInstallation() {
  const service = SERVICES.find(s => s.id === 'electrical-installation');

  return (
    <div>
      <BreadcrumbBanner 
        title={service.title}
        subtitle="Residential, commercial, and industrial wiring, electrical maintenance, fault diagnosis, and safety protection systems engineered to rigorous standards."
        crumbs={[
          { label: "Services", path: "/services" },
          { label: service.title }
        ]}
      />

      {/* Hero Content Section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span className="badge-tag">Power & Infrastructure</span>
              <h2 style={{ fontSize: '2.4rem', marginBottom: '1.25rem' }}>{service.heroHeadline}</h2>
              <p className="text-lead" style={{ marginBottom: '1.25rem' }}>
                Electrical infrastructure forms the backbone of any property. Poor wiring, unbalanced phases, 
                and inadequate circuit protection lead to costly equipment failure, dangerous electrical fires, 
                and persistent power interruptions.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                At FLOWNERGY TECH, our electrical engineers deliver precision installations 
                for new construction projects and existing buildings. Every wire gauge is calculated to load, 
                every distribution board is neatly arranged and labeled, and earthing protection is rigorously verified.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#quote-section" className="btn btn-primary">
                  Request an Electrical Quote
                  <ArrowRight size={16} />
                </a>
                <a href="#offerings" className="btn btn-outline">
                  View Technical Capabilities
                </a>
              </div>
            </div>

            <div>
              <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 32px rgba(50,71,99,0.12)' }}>
                <img src={service.image} alt="Electrical Installation" style={{ width: '100%', height: 'auto' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scope of Offerings */}
      <section className="section section-light" id="offerings">
        <div className="container">
          <div className="section-header">
            <span className="badge-tag">Technical Scope</span>
            <h2>Comprehensive Electrical Services</h2>
            <p>From complex industrial distribution to precision residential rewiring.</p>
          </div>

          <div className="features-grid">
            {service.offerings.map((offering, idx) => (
              <div key={idx} className="feature-box">
                <div className="feature-box-icon">
                  <Zap size={24} color="#E87A00" />
                </div>
                <h3>{offering.title}</h3>
                <p>{offering.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Supported */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge-tag">Project Applications</span>
            <h2>Environments We Support</h2>
            <p>Engineered to meet specific load and safety demands of different building types.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{ padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(50,71,99,0.05)' }}>
              <div style={{ color: '#324763', marginBottom: '1rem' }}><HomeIcon size={32} /></div>
              <h3 style={{ marginBottom: '0.6rem' }}>Residential Buildings</h3>
              <p style={{ fontSize: '0.94rem' }}>Modern home conduit wiring, load distribution panels, lighting switches, water heater and air conditioner dedicated circuits, and surge protection.</p>
            </div>

            <div style={{ padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(50,71,99,0.05)' }}>
              <div style={{ color: '#324763', marginBottom: '1rem' }}><Building2 size={32} /></div>
              <h3 style={{ marginBottom: '0.6rem' }}>Commercial Plazas & Offices</h3>
              <p style={{ fontSize: '0.94rem' }}>Main distribution boards, sub-distribution panels, busbar trunking, server room power lines, and emergency lighting circuits.</p>
            </div>

            <div style={{ padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(50,71,99,0.05)' }}>
              <div style={{ color: '#324763', marginBottom: '1rem' }}><Factory size={32} /></div>
              <h3 style={{ marginBottom: '0.6rem' }}>Industrial Facilities</h3>
              <p style={{ fontSize: '0.94rem' }}>Three-phase power distribution, motor control centers (MCC), industrial machine hookups, heavy-duty earthing, and lightning protection systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Technical Standards Focus */}
      <section className="section section-light">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span className="badge-tag">Safety First</span>
              <h2>Uncompromising Electrical Safety Standards</h2>
              <p style={{ marginBottom: '1.25rem' }}>
                Electrical works involve inherent hazards when executed carelessly. 
                At FLOWNERGY TECH, we adhere strictly to engineering best practices:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <ShieldCheck size={20} color="#E87A00" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <strong style={{ color: '#324763' }}>Proper Earthing Resistance:</strong>
                    <p style={{ fontSize: '0.92rem', margin: 0 }}>Copper grounding rods and chemical earthing pits tested to ensure low earth resistance.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <ShieldCheck size={20} color="#E87A00" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <strong style={{ color: '#324763' }}>Residual Current & Shock Protection:</strong>
                    <p style={{ fontSize: '0.92rem', margin: 0 }}>RCDs and RCBOs installed on all socket outlets to protect against accidental electrocution.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <ShieldCheck size={20} color="#E87A00" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <strong style={{ color: '#324763' }}>Surge Protection Devices (SPD):</strong>
                    <p style={{ fontSize: '0.92rem', margin: 0 }}>Type 1 and Type 2 surge arrestors safeguarding valuable electronic appliances against grid spikes.</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(50,71,99,0.06)' }}>
              <h3 style={{ color: '#324763', marginBottom: '1rem' }}>Our Work Process</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {service.process.map((step, sIdx) => (
                  <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#324763', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', fontWeight: 'bold', flexShrink: 0 }}>
                      {sIdx + 1}
                    </div>
                    <span style={{ fontSize: '0.94rem', color: '#4A5B70' }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge-tag">Common Inquiries</span>
            <h2>Electrical Installation FAQs</h2>
            <p>Answers to frequently asked questions about our electrical wiring, troubleshooting, and assessments.</p>
          </div>

          <FAQAccordion items={service.faqs} />
        </div>
      </section>

      {/* Service Specific Quotation Section */}
      <section className="section section-navy" id="quote-section">
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <QuotationForm 
              preselectedService="Electrical Installation"
              title="Request an Electrical Installation Quote"
              subtitle="Submit your building wiring, maintenance, or troubleshooting details for an itemized estimate."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
