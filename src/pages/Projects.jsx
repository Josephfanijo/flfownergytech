import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/companyData';
import BreadcrumbBanner from '../components/BreadcrumbBanner';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "electrical-installation", label: "Electrical Installation" },
    { id: "solar-energy", label: "Solar Energy" },
    { id: "cctv-security", label: "CCTV & Security" },
    { id: "property-management", label: "Property Management" }
  ];

  const filteredProjects = activeFilter === "all" 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === activeFilter);

  return (
    <div>
      <BreadcrumbBanner 
        title="Our Projects Portfolio"
        subtitle="Explore verified project implementations and engineering solutions executed across our four core service divisions."
        crumbs={[{ label: "Projects" }]}
      />

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge-tag">Technical Portfolio</span>
            <h2>Proven Field Implementations</h2>
            <p>
              Filter our projects across electrical installations, solar systems, 
              security infrastructure, and property management contracts.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs" role="tablist" aria-label="Project Category Filter">
            {filters.map(f => (
              <button
                key={f.id}
                type="button"
                className={`filter-btn ${activeFilter === f.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(f.id)}
                role="tab"
                aria-selected={activeFilter === f.id}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <article key={project.id} className="project-card">
                <div className="project-media">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <span className="project-category-badge">{project.service}</span>
                </div>
                <div className="project-body">
                  <span className="project-location">
                    <MapPin size={14} color="#E87A00" />
                    {project.location}
                  </span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  {/* Technical Specs Tags */}
                  {project.specs && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                      {project.specs.map((spec, sIdx) => (
                        <span 
                          key={sIdx}
                          style={{
                            fontSize: '0.76rem',
                            backgroundColor: '#F5F7F9',
                            color: '#324763',
                            padding: '0.25rem 0.6rem',
                            borderRadius: '4px',
                            border: '1px solid #E2E8F0',
                            fontWeight: 500
                          }}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}

                  <div style={{ marginTop: 'auto', paddingTop: '1.2rem', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button 
                      type="button" 
                      onClick={() => setSelectedProject(project)}
                      className="service-card-link"
                      style={{ fontSize: '0.9rem' }}
                    >
                      <span>View Scope</span>
                      <ArrowRight size={14} />
                    </button>
                    <Link 
                      to={`/contact?service=${encodeURIComponent(project.service)}#quote`}
                      className="btn btn-sm btn-outline"
                    >
                      Request Similar Quote
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Project Scope Modal */}
      {selectedProject && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(34, 50, 71, 0.7)',
            backdropFilter: 'blur(3px)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '600px',
              width: '100%',
              padding: '2.5rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <span className="badge-tag" style={{ margin: 0 }}>{selectedProject.service}</span>
              <button 
                type="button" 
                onClick={() => setSelectedProject(null)}
                style={{ fontSize: '1.4rem', color: '#718296', lineHeight: 1 }}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <h3 style={{ color: '#324763', fontSize: '1.45rem', marginBottom: '0.6rem' }}>
              {selectedProject.title}
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#718296', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              <MapPin size={15} color="#E87A00" />
              <span>{selectedProject.location}</span>
            </div>

            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#4A5B70', marginBottom: '1.5rem' }}>
              {selectedProject.description}
            </p>

            <h4 style={{ color: '#324763', fontSize: '1.05rem', marginBottom: '0.75rem' }}>Technical Deliverables:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
              {selectedProject.specs?.map((spec, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.94rem', color: '#324763' }}>
                  <CheckCircle2 size={16} color="#E87A00" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link 
                to={`/contact?service=${encodeURIComponent(selectedProject.service)}#quote`}
                className="btn btn-primary"
                onClick={() => setSelectedProject(null)}
              >
                Request Quotation for Similar Project
              </Link>
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio CTA */}
      <section className="section section-navy">
        <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
          <h2 style={{ color: '#FFFFFF', marginBottom: '1.25rem' }}>Have a Specific Project in Mind?</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem', marginBottom: '2rem' }}>
            We engineer customized solutions for projects of every scale. Contact our engineering team 
            to review your architectural drawings or schedule a site visit.
          </p>
          <Link to="/contact#quote" className="btn btn-primary btn-lg">
            Request a Project Consultation
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
