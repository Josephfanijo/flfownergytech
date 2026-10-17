import React, { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { 
  Mail, 
  Clock, 
  MessageSquare, 
  CheckCircle2, 
  Globe
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { openWhatsApp, scrollToElement } from '../utils/helpers';
import BreadcrumbBanner from '../components/BreadcrumbBanner';
import QuotationForm from '../components/QuotationForm';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || "";
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#quote') {
      setTimeout(() => scrollToElement('quote-form-container'), 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const handleWhatsAppDirect = () => {
    openWhatsApp("Hello FLOWNERGY TECH, I would like to enquire about your services and discuss a project quotation.");
  };

  return (
    <div>
      <BreadcrumbBanner 
        title="Contact Us & Request a Quote"
        subtitle="Speak directly with our technical team or submit your project details for an itemized quotation."
        crumbs={[{ label: "Contact Us" }]}
      />

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'flex-start' }}>
            
            {/* Left Column: Official Contact Channels */}
            <div>
              <span className="badge-tag">Get in Touch</span>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '1.25rem' }}>
                Let's Discuss Your Technical & Property Needs
              </h2>
              <p className="text-lead" style={{ marginBottom: '2rem' }}>
                Whether you need electrical engineering for a new build, a solar inverter calculation, 
                an IP surveillance layout, or proactive property management, we are here to assist.
              </p>

              {/* Verified Contact Details Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.5rem', backgroundColor: '#F5F7F9', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: '#324763', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 style={{ color: '#324763', marginBottom: '0.2rem', fontSize: '1.05rem' }}>Official Email Enquiries</h4>
                    <p style={{ margin: 0, fontSize: '0.94rem' }}>
                      <a href={`mailto:${COMPANY_INFO.email}`} style={{ color: '#E87A00', fontWeight: 600 }}>{COMPANY_INFO.email}</a>
                    </p>
                    <span style={{ fontSize: '0.82rem', color: '#718296' }}>Monitored daily by our engineering desk</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.5rem', backgroundColor: '#F5F7F9', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: '#25D366', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MessageSquare size={22} />
                  </div>
                  <div>
                    <h4 style={{ color: '#324763', marginBottom: '0.2rem', fontSize: '1.05rem' }}>WhatsApp Business Dispatch</h4>
                    <p style={{ margin: 0, fontSize: '0.94rem' }}>
                      <button 
                        type="button" 
                        onClick={handleWhatsAppDirect}
                        style={{ color: '#E87A00', fontWeight: 600, padding: 0, textAlign: 'left' }}
                      >
                        Start Direct WhatsApp Chat
                      </button>
                    </p>
                    <span style={{ fontSize: '0.82rem', color: '#718296' }}>Instant consultation & photo/plan sharing</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.5rem', backgroundColor: '#F5F7F9', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: '#324763', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={22} />
                  </div>
                  <div>
                    <h4 style={{ color: '#324763', marginBottom: '0.2rem', fontSize: '1.05rem' }}>Working Hours</h4>
                    <p style={{ margin: 0, fontSize: '0.94rem', color: '#324763', fontWeight: 600 }}>{COMPANY_INFO.operatingHours}</p>
                    <span style={{ fontSize: '0.82rem', color: '#718296' }}>Emergency maintenance support available for managed facilities</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.5rem', backgroundColor: '#F5F7F9', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: '#5F7894', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Globe size={22} />
                  </div>
                  <div>
                    <h4 style={{ color: '#324763', marginBottom: '0.2rem', fontSize: '1.05rem' }}>Official Web Portal</h4>
                    <p style={{ margin: 0, fontSize: '0.94rem', color: '#324763' }}>
                      <a href={COMPANY_INFO.domain} target="_blank" rel="noopener noreferrer" style={{ color: '#E87A00', fontWeight: 600 }}>
                        flownergytech.com
                      </a>
                    </p>
                    <span style={{ fontSize: '0.82rem', color: '#718296' }}>Official corporate online presence</span>
                  </div>
                </div>
              </div>

              {/* What Happens Next Card */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <h4 style={{ color: '#324763', marginBottom: '0.75rem' }}>What Happens After You Submit:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem', color: '#4A5B70' }}>
                    <CheckCircle2 size={16} color="#E87A00" />
                    <span>Your enquiry receives a unique Reference Tracking ID.</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem', color: '#4A5B70' }}>
                    <CheckCircle2 size={16} color="#E87A00" />
                    <span>Our engineering team reviews your site specs and load requirements.</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem', color: '#4A5B70' }}>
                    <CheckCircle2 size={16} color="#E87A00" />
                    <span>We contact you with a transparent, itemized quotation.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Quotation Form */}
            <div>
              <QuotationForm 
                preselectedService={preselectedService}
                title="Quotation & Project Enquiry"
                subtitle="Complete your requirements below. All submissions are processed directly by FLOWNERGY engineering staff."
              />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
