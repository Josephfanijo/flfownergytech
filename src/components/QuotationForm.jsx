import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Copy, Check, MessageSquare } from 'lucide-react';
import { SERVICES } from '../data/companyData';
import { generateTicket, saveEnquiry, copyToClipboard, openWhatsApp } from '../utils/helpers';
import { submitToWeb3Forms, isValidEmail, getFormattedSubmissionTime } from '../services/web3forms';

export default function QuotationForm({ preselectedService = "", title = "Request a Quotation", subtitle = "Complete the form below to receive a detailed technical assessment and quote." }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    service: preselectedService || "Electrical Installation",
    location: "",
    projectType: "Residential",
    description: "",
    preferredContact: "Phone Call",
    botcheck: ""
  });

  const [prevServiceProp, setPrevServiceProp] = useState(preselectedService);
  if (preselectedService && preselectedService !== prevServiceProp) {
    setPrevServiceProp(preselectedService);
    setFormData(prev => ({ ...prev, service: preselectedService }));
  }

  const [status, setStatus] = useState({ type: null, message: "", ticket: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "", ticket: "" });

    // Client-side validation for required fields
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.location.trim() || !formData.description.trim()) {
      setStatus({
        type: "error",
        message: "Please fill in all required fields (Full Name, Phone Number, Location, and Project Description)."
      });
      setIsSubmitting(false);
      return;
    }

    // Email format validation (if provided)
    if (formData.email && !isValidEmail(formData.email)) {
      setStatus({
        type: "error",
        message: "Please provide a valid email address (e.g. client@example.com)."
      });
      setIsSubmitting(false);
      return;
    }

    // Generate unique inquiry ticket
    const ticketId = generateTicket('FLW');
    const submissionTime = getFormattedSubmissionTime();

    // Transmit to Web3Forms API
    const result = await submitToWeb3Forms({
      subject: `[FLOWNERGY Quote Request] ${formData.service} - ${formData.fullName} (Ref: ${ticketId})`,
      ticket_reference: ticketId,
      submission_time: submissionTime,
      enquiry_type: "Technical Quotation Request",
      name: formData.fullName,
      phone: formData.phone,
      email: formData.email || "Not Provided",
      replyto: formData.email ? formData.email.trim() : undefined,
      service_required: formData.service,
      property_type: formData.projectType,
      project_location: formData.location,
      preferred_contact_method: formData.preferredContact,
      project_scope_description: formData.description,
      botcheck: formData.botcheck
    });

    setIsSubmitting(false);

    if (result.success) {
      // Persist to local backup storage only after confirmed transmission
      saveEnquiry('flownergy_inquiries', { id: ticketId, ...formData });

      setStatus({
        type: "success",
        ticket: ticketId,
        message: `Thank you, ${formData.fullName}. Your quotation request has been successfully transmitted to our engineering desk with Reference #${ticketId}. Our technical team will review your specifications and contact you via ${formData.preferredContact}.`
      });
    } else {
      setStatus({
        type: "error",
        message: result.message || "Failed to transmit enquiry. Please check your network connection or contact us directly on WhatsApp."
      });
    }
  };

  const copyDetails = () => {
    const text = `FLOWNERGY QUOTATION REQUEST (Ref: ${status.ticket})\n` +
      `Name: ${formData.fullName}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email || 'N/A'}\n` +
      `Service: ${formData.service}\n` +
      `Property Type: ${formData.projectType}\n` +
      `Location: ${formData.location}\n` +
      `Preferred Contact: ${formData.preferredContact}\n` +
      `Details: ${formData.description}`;

    copyToClipboard(text, setCopied);
  };

  const sendToWhatsApp = () => {
    const text = `*FLOWNERGY QUOTATION ENQUIRY (Ref: ${status.ticket || 'NEW'})*\n\n` +
      `*Name:* ${formData.fullName}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Service Required:* ${formData.service}\n` +
      `*Property Type:* ${formData.projectType}\n` +
      `*Location:* ${formData.location}\n` +
      `*Preferred Contact:* ${formData.preferredContact}\n\n` +
      `*Project Overview:*\n${formData.description}`;

    openWhatsApp(text);
  };

  return (
    <div className="form-card" id="quote-form-container">
      <div style={{ marginBottom: '1.75rem' }}>
        <h3 style={{ fontSize: '1.45rem', color: '#324763', marginBottom: '0.4rem' }}>{title}</h3>
        <p style={{ fontSize: '0.94rem' }}>{subtitle}</p>
      </div>

      {status.type === 'error' && (
        <div className="alert-error" role="alert">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <AlertCircle size={20} />
            <span>{status.message}</span>
          </div>
        </div>
      )}

      {status.type === 'success' ? (
        <div className="alert-success" role="status">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <CheckCircle2 size={24} style={{ color: '#166534', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ display: 'block', fontSize: '1.05rem', marginBottom: '0.25rem' }}>Quotation Request Submitted Successfully!</strong>
              <p style={{ margin: 0, color: '#166534', fontSize: '0.95rem' }}>{status.message}</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button 
              type="button" 
              onClick={sendToWhatsApp} 
              className="btn btn-sm btn-primary"
            >
              <MessageSquare size={16} />
              Forward to WhatsApp Dispatch
            </button>
            <button 
              type="button" 
              onClick={copyDetails} 
              className="btn btn-sm btn-navy"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied to Clipboard" : "Copy Request Summary"}
            </button>
            <button 
              type="button" 
              onClick={() => {
                setStatus({ type: null, message: "", ticket: "" });
                setFormData({
                  fullName: "",
                  phone: "",
                  email: "",
                  service: preselectedService || "Electrical Installation",
                  location: "",
                  projectType: "Residential",
                  description: "",
                  preferredContact: "Phone Call",
                  botcheck: ""
                });
              }}
              className="btn btn-sm btn-outline"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {/* Web3Forms Honeypot Spam Protection */}
          <input 
            type="checkbox" 
            name="botcheck" 
            style={{ display: 'none' }} 
            tabIndex={-1} 
            autoComplete="off"
            checked={Boolean(formData.botcheck)}
            onChange={(e) => setFormData(prev => ({ ...prev, botcheck: e.target.checked ? "bot" : "" }))}
          />

          {/* Row 1: Full Name & Phone */}
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="fullName">
                Full Name <span className="req">*</span>
              </label>
              <input 
                type="text" 
                id="fullName" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange}
                placeholder="e.g. Engr. Babatunde Adeyemi" 
                required 
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="phone">
                Phone Number <span className="req">*</span>
              </label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange}
                placeholder="e.g. +234 803 123 4567" 
                required 
                className="form-control"
              />
            </div>
          </div>

          {/* Row 2: Email & Service Required */}
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email Address
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                placeholder="client@example.com" 
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="service">
                Service Required <span className="req">*</span>
              </label>
              <select 
                id="service" 
                name="service" 
                value={formData.service} 
                onChange={handleChange}
                className="form-control"
              >
                {SERVICES.map(s => (
                  <option key={s.id} value={s.shortTitle}>{s.shortTitle}</option>
                ))}
                <option value="Integrated Multi-Service Solution">Integrated Multi-Service Solution</option>
                <option value="General Technical Consultation">General Technical Consultation</option>
              </select>
            </div>
          </div>

          {/* Row 3: Property Type & Location */}
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="projectType">
                Property / Project Type <span className="req">*</span>
              </label>
              <select 
                id="projectType" 
                name="projectType" 
                value={formData.projectType} 
                onChange={handleChange}
                className="form-control"
              >
                <option value="Residential">Residential (Home / Apartment)</option>
                <option value="Commercial">Commercial (Office / Plaza / Store)</option>
                <option value="Industrial">Industrial (Factory / Warehouse)</option>
                <option value="Institutional">Institutional / Public Facility</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="location">
                Project or Property Location <span className="req">*</span>
              </label>
              <input 
                type="text" 
                id="location" 
                name="location" 
                value={formData.location} 
                onChange={handleChange}
                placeholder="e.g. Ikeja, Lagos or Abuja FCT" 
                required 
                className="form-control"
              />
            </div>
          </div>

          {/* Row 4: Project Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Project Description / Technical Scope <span className="req">*</span>
            </label>
            <textarea 
              id="description" 
              name="description" 
              rows={4}
              value={formData.description} 
              onChange={handleChange}
              placeholder="Describe your property requirements, e.g. 5kVA solar inverter with lithium storage, 8-channel IP CCTV installation, full building electrical rewiring, or facility management oversight..." 
              required 
              className="form-control"
            />
          </div>

          {/* Row 5: Preferred Contact Method */}
          <div className="form-group">
            <label className="form-label">Preferred Contact Method</label>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
              {["Phone Call", "WhatsApp", "Email"].map((method) => (
                <label key={method} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.92rem', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="preferredContact" 
                    value={method} 
                    checked={formData.preferredContact === method}
                    onChange={handleChange}
                    style={{ accentColor: '#E87A00' }}
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>

          {/* Privacy Note */}
          <div style={{ fontSize: '0.82rem', color: '#718296', marginBottom: '1.5rem' }}>
            🔒 <strong>Privacy Assurance:</strong> FLOWNERGY TECH treats all client and property details confidentially. Your information will only be used to generate your technical quotation.
          </div>

          {/* Submit CTA */}
          <button 
            type="submit" 
            className="btn btn-primary btn-lg" 
            style={{ width: '100%' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Processing Technical Assessment...</span>
            ) : (
              <>
                <Send size={18} />
                Submit Quotation Request
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
