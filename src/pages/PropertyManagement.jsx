import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Wrench, 
  Users, 
  ClipboardCheck, 
  FileText, 
  Key, 
  AlertCircle,
  Copy,
  Check,
  MessageSquare
} from 'lucide-react';
import { SERVICES, COMPANY_INFO } from '../data/companyData';
import { generateTicket, saveEnquiry, copyToClipboard, openWhatsApp } from '../utils/helpers';
import BreadcrumbBanner from '../components/BreadcrumbBanner';
import FAQAccordion from '../components/FAQAccordion';

export default function PropertyManagement() {
  const service = SERVICES.find(s => s.id === 'property-management');

  // Dedicated Property Management Form State
  const [pmForm, setPmForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    propertyType: "Residential (Apartment Block / Estate)",
    units: "1 to 5 Units",
    servicesRequired: "Full Facility Supervision & Technical Maintenance",
    details: ""
  });

  const [formStatus, setFormStatus] = useState({ type: null, message: "", ticket: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPmForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePmSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "", ticket: "" });

    if (!pmForm.name.trim() || !pmForm.phone.trim() || !pmForm.location.trim()) {
      setFormStatus({
        type: "error",
        message: "Please fill in all required contact details and property location."
      });
      setIsSubmitting(false);
      return;
    }

    const ticketId = generateTicket('PM');
    saveEnquiry('flownergy_pm_inquiries', { id: ticketId, ...pmForm });

    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus({
        type: "success",
        ticket: ticketId,
        message: `Your property management enquiry has been logged with Reference #${ticketId}. Our facility management director will contact you to schedule an initial property walk-through and consultation.`
      });
    }, 700);
  };

  const copyPmSummary = () => {
    const text = `FLOWNERGY PROPERTY MANAGEMENT REQUEST (Ref: ${formStatus.ticket})\n` +
      `Owner/Representative: ${pmForm.name}\n` +
      `Phone: ${pmForm.phone}\n` +
      `Email: ${pmForm.email || 'N/A'}\n` +
      `Location: ${pmForm.location}\n` +
      `Property Type: ${pmForm.propertyType}\n` +
      `Units: ${pmForm.units}\n` +
      `Scope: ${pmForm.servicesRequired}\n` +
      `Details: ${pmForm.details || 'N/A'}`;

    copyToClipboard(text, setCopied);
  };

  const sendToWhatsApp = () => {
    const text = `*FLOWNERGY PROPERTY MANAGEMENT ENQUIRY (Ref: ${formStatus.ticket || 'NEW'})*\n\n` +
      `*Client:* ${pmForm.name}\n` +
      `*Phone:* ${pmForm.phone}\n` +
      `*Location:* ${pmForm.location}\n` +
      `*Property Category:* ${pmForm.propertyType}\n` +
      `*Units/Size:* ${pmForm.units}\n` +
      `*Required Scope:* ${pmForm.servicesRequired}\n\n` +
      `*Property Notes:*\n${pmForm.details || 'None'}`;

    openWhatsApp(text);
  };

  return (
    <div>
      <BreadcrumbBanner 
        title={service.title}
        subtitle="Dedicated residential and commercial facility oversight, structured technical maintenance, tenant liaison, and routine condition reporting."
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
              <span className="badge-tag">Facility Stewardship</span>
              <h2 style={{ fontSize: '2.4rem', marginBottom: '1.25rem' }}>{service.heroHeadline}</h2>
              <p className="text-lead" style={{ marginBottom: '1.25rem' }}>
                Owning property in Nigeria comes with significant operational responsibility: managing 
                generators, maintaining water supply pumps, resolving electrical faults, supervising artisans, 
                and addressing tenant repair requests.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                FLOWNERGY TECH provides property owners and landlords with an organized, 
                accountable management service. Backed by our in-house electrical and technical expertise, 
                routine preventive maintenance is conducted proactively, reducing sudden breakdowns 
                and protecting your real estate asset value.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#pm-form-section" className="btn btn-primary">
                  Request Property Management
                  <ArrowRight size={16} />
                </a>
                <a href="#offerings" className="btn btn-outline">
                  View Management Scope
                </a>
              </div>
            </div>

            <div>
              <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 32px rgba(50,71,99,0.12)' }}>
                <img src={service.image} alt="Property and Facility Management" style={{ width: '100%', height: 'auto' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scope Section */}
      <section className="section section-light" id="offerings">
        <div className="container">
          <div className="section-header">
            <span className="badge-tag">Management Services</span>
            <h2>Our Property Management Scope</h2>
            <p>Structured facility supervision, proactive repair schedules, and clear reporting.</p>
          </div>

          <div className="features-grid">
            {service.offerings.map((offering, idx) => (
              <div key={idx} className="feature-box">
                <div className="feature-box-icon">
                  <Building size={24} color="#E87A00" />
                </div>
                <h3>{offering.title}</h3>
                <p>{offering.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Segments */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge-tag">Who We Support</span>
            <h2>Solutions Tailored for Property Stakeholders</h2>
            <p>Designed to ease administrative burden while maintaining exceptional property standards.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{ padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(50,71,99,0.05)' }}>
              <div style={{ color: '#324763', marginBottom: '1rem' }}><Key size={32} /></div>
              <h3 style={{ marginBottom: '0.6rem' }}>Individual Landlords & Homeowners</h3>
              <p style={{ fontSize: '0.94rem' }}>For property owners seeking reliable maintenance coordination without the stress of managing daily artisan complaints and urgent midnight repairs.</p>
            </div>

            <div style={{ padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(50,71,99,0.05)' }}>
              <div style={{ color: '#324763', marginBottom: '1rem' }}><Building size={32} /></div>
              <h3 style={{ marginBottom: '0.6rem' }}>Commercial Property Owners</h3>
              <p style={{ fontSize: '0.94rem' }}>For corporate plazas and business centers needing reliable common-area power, security gate management, water treatment upkeep, and clean presentation.</p>
            </div>

            <div style={{ padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(50,71,99,0.05)' }}>
              <div style={{ color: '#324763', marginBottom: '1rem' }}><Users size={32} /></div>
              <h3 style={{ marginBottom: '0.6rem' }}>Residential Estate Associations</h3>
              <p style={{ fontSize: '0.94rem' }}>Managing communal infrastructure: street lighting, central transformer maintenance, access control gates, water pumping stations, and security supervision.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <span className="badge-tag">Common Inquiries</span>
            <h2>Property Management FAQs</h2>
            <p>Answers to common questions regarding facility maintenance, inspections, and owner reports.</p>
          </div>

          <FAQAccordion items={service.faqs} />
        </div>
      </section>

      {/* Dedicated Property Management Form */}
      <section className="section section-navy" id="pm-form-section">
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <div className="form-card">
              <div style={{ marginBottom: '1.75rem' }}>
                <span className="badge-tag badge-tag-navy">Facility Consultation</span>
                <h3 style={{ fontSize: '1.6rem', color: '#324763', marginBottom: '0.4rem' }}>
                  Request Property Management Services
                </h3>
                <p style={{ fontSize: '0.95rem' }}>
                  Provide your property details and unit information to schedule an on-site property evaluation.
                </p>
              </div>

              {formStatus.type === 'error' && (
                <div className="alert-error" role="alert">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <AlertCircle size={20} />
                    <span>{formStatus.message}</span>
                  </div>
                </div>
              )}

              {formStatus.type === 'success' ? (
                <div className="alert-success" role="status">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <CheckCircle2 size={24} style={{ color: '#166534', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ display: 'block', fontSize: '1.05rem', marginBottom: '0.25rem' }}>Property Consultation Request Received!</strong>
                      <p style={{ margin: 0, color: '#166534', fontSize: '0.95rem' }}>{formStatus.message}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button type="button" onClick={sendToWhatsApp} className="btn btn-sm btn-primary">
                      <MessageSquare size={16} />
                      Forward to Property Team on WhatsApp
                    </button>
                    <button type="button" onClick={copyPmSummary} className="btn btn-sm btn-navy">
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      {copied ? "Copied" : "Copy Request Summary"}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setFormStatus({ type: null, message: "", ticket: "" })} 
                      className="btn btn-sm btn-outline"
                    >
                      Submit Another Property Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handlePmSubmit} noValidate>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="pm-name">
                        Owner / Representative Name <span className="req">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="pm-name" 
                        name="name" 
                        value={pmForm.name} 
                        onChange={handleInputChange} 
                        placeholder="e.g. Chief O. Williams" 
                        required 
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="pm-phone">
                        Phone Number <span className="req">*</span>
                      </label>
                      <input 
                        type="tel" 
                        id="pm-phone" 
                        name="phone" 
                        value={pmForm.phone} 
                        onChange={handleInputChange} 
                        placeholder="e.g. +234 803 789 0123" 
                        required 
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="pm-email">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        id="pm-email" 
                        name="email" 
                        value={pmForm.email} 
                        onChange={handleInputChange} 
                        placeholder="client@example.com" 
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="pm-location">
                        Property Location <span className="req">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="pm-location" 
                        name="location" 
                        value={pmForm.location} 
                        onChange={handleInputChange} 
                        placeholder="e.g. Victoria Island, Lagos or Maitama, Abuja" 
                        required 
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="pm-type">
                        Property Category
                      </label>
                      <select 
                        id="pm-type" 
                        name="propertyType" 
                        value={pmForm.propertyType} 
                        onChange={handleInputChange} 
                        className="form-control"
                      >
                        <option value="Residential (Single Family Home / Duplex)">Residential (Single Family Home / Duplex)</option>
                        <option value="Residential (Multi-Flat Apartment Block)">Residential (Multi-Flat Apartment Block)</option>
                        <option value="Gated Residential Estate">Gated Residential Estate</option>
                        <option value="Commercial Plaza / Office Building">Commercial Plaza / Office Building</option>
                        <option value="Mixed-Use Commercial & Residential">Mixed-Use Commercial & Residential</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="pm-units">
                        Number of Units / Flats
                      </label>
                      <select 
                        id="pm-units" 
                        name="units" 
                        value={pmForm.units} 
                        onChange={handleInputChange} 
                        className="form-control"
                      >
                        <option value="1 Unit (Private Residence)">1 Unit (Private Residence)</option>
                        <option value="2 to 4 Units">2 to 4 Units</option>
                        <option value="5 to 10 Units">5 to 10 Units</option>
                        <option value="11 to 25 Units">11 to 25 Units</option>
                        <option value="26+ Units / Multi-Building Complex">26+ Units / Multi-Building Complex</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="pm-services">
                      Required Services Scope
                    </label>
                    <select 
                      id="pm-services" 
                      name="servicesRequired" 
                      value={pmForm.servicesRequired} 
                      onChange={handleInputChange} 
                      className="form-control"
                    >
                      <option value="Full Facility Supervision & Technical Maintenance">Full Facility Supervision & Technical Maintenance</option>
                      <option value="Preventive Electrical, Solar & Plumbing Maintenance Only">Preventive Electrical, Solar & Plumbing Maintenance Only</option>
                      <option value="Tenant Support & Routine Condition Inspection">Tenant Support & Routine Condition Inspection</option>
                      <option value="Communal Infrastructure & Power Oversight">Communal Infrastructure & Power Oversight</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="pm-details">
                      Additional Property Notes & Objectives
                    </label>
                    <textarea 
                      id="pm-details" 
                      name="details" 
                      rows={3}
                      value={pmForm.details} 
                      onChange={handleInputChange} 
                      placeholder="Specify key details, current maintenance issues, generator/transformer presence, or goals for property oversight..." 
                      className="form-control"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg" 
                    style={{ width: '100%' }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting Facility Request..." : "Request Property Management Services"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
