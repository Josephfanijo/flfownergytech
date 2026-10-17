import React, { useState } from 'react';
import { 
  Sun, 
  CheckCircle2, 
  ArrowRight, 
  Check, 
  AlertCircle,
  MessageSquare,
  Copy
} from 'lucide-react';
import { SERVICES } from '../data/companyData';
import { generateTicket, saveEnquiry, copyToClipboard, openWhatsApp } from '../utils/helpers';
import BreadcrumbBanner from '../components/BreadcrumbBanner';
import FAQAccordion from '../components/FAQAccordion';

export default function SolarEnergy() {
  const service = SERVICES.find(s => s.id === 'solar-energy');

  // Dedicated Solar Enquiry Form State
  const [solarForm, setSolarForm] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "Residential (Home / Flat)",
    location: "",
    appliances: "",
    existingSystem: "No existing system (New installation)",
    backupHours: "12 hours (Night backup)",
    additionalDetails: ""
  });

  const [formStatus, setFormStatus] = useState({ type: null, message: "", ticket: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSolarForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSolarSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "", ticket: "" });

    if (!solarForm.name.trim() || !solarForm.phone.trim() || !solarForm.location.trim() || !solarForm.appliances.trim()) {
      setFormStatus({
        type: "error",
        message: "Please complete all required fields (Name, Phone Number, Location, and Major Appliances to Power)."
      });
      setIsSubmitting(false);
      return;
    }

    const ticketId = generateTicket('SLR');
    saveEnquiry('flownergy_solar_inquiries', { id: ticketId, ...solarForm });

    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus({
        type: "success",
        ticket: ticketId,
        message: `Your solar power calculation request has been received with Reference #${ticketId}. Our renewable energy engineers will calculate the required solar array and lithium storage capacity and contact you shortly.`
      });
    }, 700);
  };

  const copySolarSummary = () => {
    const text = `FLOWNERGY SOLAR ENQUIRY (Ref: ${formStatus.ticket})\n` +
      `Name: ${solarForm.name}\n` +
      `Phone: ${solarForm.phone}\n` +
      `Location: ${solarForm.location}\n` +
      `Property Type: ${solarForm.propertyType}\n` +
      `Appliances to Run: ${solarForm.appliances}\n` +
      `Existing Inverter/Solar: ${solarForm.existingSystem}\n` +
      `Desired Backup Duration: ${solarForm.backupHours}\n` +
      `Notes: ${solarForm.additionalDetails || 'N/A'}`;

    copyToClipboard(text, setCopied);
  };

  const sendToWhatsApp = () => {
    const text = `*FLOWNERGY SOLAR SIZING REQUEST (Ref: ${formStatus.ticket || 'NEW'})*\n\n` +
      `*Name:* ${solarForm.name}\n` +
      `*Phone:* ${solarForm.phone}\n` +
      `*Location:* ${solarForm.location}\n` +
      `*Property Type:* ${solarForm.propertyType}\n` +
      `*Major Appliances:* ${solarForm.appliances}\n` +
      `*Desired Backup:* ${solarForm.backupHours}\n` +
      `*Existing Setup:* ${solarForm.existingSystem}\n\n` +
      `*Additional Details:*\n${solarForm.additionalDetails || 'None'}`;

    openWhatsApp(text);
  };

  return (
    <div>
      <BreadcrumbBanner 
        title={service.title}
        subtitle="Intelligent solar photovoltaic systems, hybrid inverters, and long-life lithium battery storage designed for uninterrupted Nigerian power reliability."
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
              <span className="badge-tag">Renewable Energy Solutions</span>
              <h2 style={{ fontSize: '2.4rem', marginBottom: '1.25rem' }}>{service.heroHeadline}</h2>
              <p className="text-lead" style={{ marginBottom: '1.25rem' }}>
                With volatile grid power and escalating diesel generator operating expenses, solar energy 
                and lithium storage offer a dependable, cost-predictable energy solution.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                At FLOWNERGY TECH, we avoid one-size-fits-all kits. A solar installation must be 
                engineered precisely around your appliance wattage, daytime vs. nighttime consumption, 
                roof orientation, and essential vs. non-essential load partitioning.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#solar-calculator" className="btn btn-primary">
                  Request Solar System Sizing
                  <ArrowRight size={16} />
                </a>
                <a href="#offerings" className="btn btn-outline">
                  View Solar Components
                </a>
              </div>
            </div>

            <div>
              <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 32px rgba(50,71,99,0.12)' }}>
                <img src={service.image} alt="Commercial Solar Installation" style={{ width: '100%', height: 'auto' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solar Scope */}
      <section className="section section-light" id="offerings">
        <div className="container">
          <div className="section-header">
            <span className="badge-tag">System Components</span>
            <h2>Our Solar Energy Capabilities</h2>
            <p>High-efficiency components engineered for Nigerian climatic conditions.</p>
          </div>

          <div className="features-grid">
            {service.offerings.map((offering, idx) => (
              <div key={idx} className="feature-box">
                <div className="feature-box-icon">
                  <Sun size={24} color="#E87A00" />
                </div>
                <h3>{offering.title}</h3>
                <p>{offering.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Solar System Sizing Works */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span className="badge-tag">Engineering Approach</span>
              <h2>How We Size Your Solar System</h2>
              <p style={{ marginBottom: '1.25rem' }}>
                A reliable solar setup is built on mathematical load analysis. We assess five critical variables:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle2 size={20} color="#E87A00" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#324763' }}>Appliance Surge vs. Running Wattage:</strong>
                    <p style={{ fontSize: '0.92rem', margin: 0 }}>Compressors and pumps draw 3x to 5x their rated power during startup; we ensure your inverter handles these surges smoothly.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle2 size={20} color="#E87A00" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#324763' }}>Lithium Battery Depth of Discharge (DoD):</strong>
                    <p style={{ fontSize: '0.92rem', margin: 0 }}>We deploy lithium LiFePO4 cells configured for safe daily cycling without damaging battery health.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle2 size={20} color="#E87A00" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#324763' }}>Solar Panel Irradiance & Roof Geometry:</strong>
                    <p style={{ fontSize: '0.92rem', margin: 0 }}>Panels are oriented and tilted to maximize peak sun hours while withstanding high tropical wind loads.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle2 size={20} color="#E87A00" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#324763' }}>Electrical Protection & DC Breakers:</strong>
                    <p style={{ fontSize: '0.92rem', margin: 0 }}>Proper DC isolators, lightning arrestors, and battery fuses protect your system from catastrophic electrical faults.</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#F5F7F9', padding: '2.5rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ color: '#324763', marginBottom: '1.25rem' }}>Our Solar Installation Process</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {service.process.map((step, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#E87A00', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', fontWeight: 'bold', flexShrink: 0 }}>
                      {idx + 1}
                    </div>
                    <span style={{ fontSize: '0.94rem', color: '#4A5B70' }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solar FAQs */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <span className="badge-tag">Frequently Asked Questions</span>
            <h2>Solar Energy FAQs</h2>
            <p>Realistic answers about inverter performance, battery storage, and energy audits.</p>
          </div>

          <FAQAccordion items={service.faqs} />
        </div>
      </section>

      {/* Dedicated Solar System Sizing Enquiry Form */}
      <section className="section section-navy" id="solar-calculator">
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <div className="form-card">
              <div style={{ marginBottom: '1.75rem' }}>
                <span className="badge-tag badge-tag-navy">Custom Sizing Form</span>
                <h3 style={{ fontSize: '1.6rem', color: '#324763', marginBottom: '0.4rem' }}>
                  Request a Tailored Solar Sizing & Quote
                </h3>
                <p style={{ fontSize: '0.95rem' }}>
                  Tell us about your appliances and desired backup hours. Our solar engineers will determine the optimal inverter, battery kWh, and solar array.
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
                      <strong style={{ display: 'block', fontSize: '1.05rem', marginBottom: '0.25rem' }}>Solar Sizing Request Submitted!</strong>
                      <p style={{ margin: 0, color: '#166534', fontSize: '0.95rem' }}>{formStatus.message}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button type="button" onClick={sendToWhatsApp} className="btn btn-sm btn-primary">
                      <MessageSquare size={16} />
                      Forward to Solar Team on WhatsApp
                    </button>
                    <button type="button" onClick={copySolarSummary} className="btn btn-sm btn-navy">
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      {copied ? "Copied" : "Copy Solar Summary"}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setFormStatus({ type: null, message: "", ticket: "" })} 
                      className="btn btn-sm btn-outline"
                    >
                      Submit Another Sizing
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSolarSubmit} noValidate>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="solar-name">
                        Customer Name <span className="req">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="solar-name" 
                        name="name" 
                        value={solarForm.name} 
                        onChange={handleInputChange} 
                        placeholder="e.g. Dr. Ngozi Okonjo" 
                        required 
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="solar-phone">
                        Phone Number <span className="req">*</span>
                      </label>
                      <input 
                        type="tel" 
                        id="solar-phone" 
                        name="phone" 
                        value={solarForm.phone} 
                        onChange={handleInputChange} 
                        placeholder="e.g. +234 802 345 6789" 
                        required 
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="solar-email">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        id="solar-email" 
                        name="email" 
                        value={solarForm.email} 
                        onChange={handleInputChange} 
                        placeholder="client@example.com" 
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="solar-location">
                        Installation Location <span className="req">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="solar-location" 
                        name="location" 
                        value={solarForm.location} 
                        onChange={handleInputChange} 
                        placeholder="e.g. Lekki Phase 1, Lagos or Garki, Abuja" 
                        required 
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="solar-property">
                        Property Type <span className="req">*</span>
                      </label>
                      <select 
                        id="solar-property" 
                        name="propertyType" 
                        value={solarForm.propertyType} 
                        onChange={handleInputChange} 
                        className="form-control"
                      >
                        <option value="Residential (Duplex / Bungalow)">Residential (Duplex / Bungalow)</option>
                        <option value="Residential (Apartment / Flat)">Residential (Apartment / Flat)</option>
                        <option value="Commercial (Office / Store / Plaza)">Commercial (Office / Store / Plaza)</option>
                        <option value="Hospitality (Hotel / Clinic / School)">Hospitality (Hotel / Clinic / School)</option>
                        <option value="Industrial / Warehouse">Industrial / Warehouse</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="solar-existing">
                        Existing System Information
                      </label>
                      <select 
                        id="solar-existing" 
                        name="existingSystem" 
                        value={solarForm.existingSystem} 
                        onChange={handleInputChange} 
                        className="form-control"
                      >
                        <option value="No existing system (New installation)">No existing system (New installation)</option>
                        <option value="Have Inverter only, want to add Solar & Lithium">Have Inverter only, want to add Solar & Lithium</option>
                        <option value="Have existing Solar, want battery upgrade/expansion">Have existing Solar, want battery upgrade/expansion</option>
                        <option value="Existing system has fault/needs servicing">Existing system has fault/needs servicing</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="solar-appliances">
                      Appliances or Energy Requirements <span className="req">*</span>
                    </label>
                    <textarea 
                      id="solar-appliances" 
                      name="appliances" 
                      rows={3}
                      value={solarForm.appliances} 
                      onChange={handleInputChange} 
                      placeholder="List your key appliances: e.g. 2 Inverter ACs (1.5HP), 1 Refrigerator, 1 Deep Freezer, Water Pumping Machine, TV, Laptops, 20 LED Bulbs..." 
                      required 
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="solar-backup">
                      Desired Daily Backup Duration
                    </label>
                    <select 
                      id="solar-backup" 
                      name="backupHours" 
                      value={solarForm.backupHours} 
                      onChange={handleInputChange} 
                      className="form-control"
                    >
                      <option value="6 to 8 hours (Basic evening backup)">6 to 8 hours (Basic evening backup)</option>
                      <option value="12 to 16 hours (Overnight and cloudy days)">12 to 16 hours (Overnight and cloudy days)</option>
                      <option value="24/7 Uninterrupted (Full Off-Grid / Near Zero Grid dependence)">24/7 Uninterrupted (Full Off-Grid / Near Zero Grid dependence)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="solar-details">
                      Additional Project Notes (Optional)
                    </label>
                    <input 
                      type="text" 
                      id="solar-details" 
                      name="additionalDetails" 
                      value={solarForm.additionalDetails} 
                      onChange={handleInputChange} 
                      placeholder="e.g. Metal roof, high daytime power usage, generator available" 
                      className="form-control"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg" 
                    style={{ width: '100%' }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Calculating Energy System Parameters..." : "Submit Solar Sizing Request"}
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
