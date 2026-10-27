import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  Sun,
  Zap,
  Play,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/companyData';
import { SOLAR_GALLERY_IMAGES } from '../data/solarGalleryData';
import { ELECTRICAL_GALLERY_MEDIA } from '../data/electricalGalleryData';
import BreadcrumbBanner from '../components/BreadcrumbBanner';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleCount, setVisibleCount] = useState(16);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "electrical-installation", label: "Electrical Installation" },
    { id: "solar-energy", label: "Solar Energy" },
    { id: "cctv-security", label: "CCTV & Security" },
    { id: "property-management", label: "Property Management" }
  ];

  const filteredProjects = activeFilter === "all" 
    ? PROJECTS_DATA.filter(p => p.category !== "solar-energy") 
    : PROJECTS_DATA.filter(p => p.category === activeFilter && p.category !== "solar-energy");

  const currentGallery = activeFilter === 'electrical-installation' 
    ? ELECTRICAL_GALLERY_MEDIA 
    : SOLAR_GALLERY_IMAGES;
  const currentMedia = (lightboxIndex !== null && currentGallery[lightboxIndex]) 
    ? currentGallery[lightboxIndex] 
    : null;

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null || !currentGallery.length) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % currentGallery.length);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + currentGallery.length) % currentGallery.length);
      } else if (e.key === 'Escape') {
        setLightboxIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [lightboxIndex, currentGallery]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 16, currentGallery.length));
  };

  const handlePrevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + currentGallery.length) % currentGallery.length);
  };

  const handleNextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % currentGallery.length);
  };

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
                onClick={() => {
                  setActiveFilter(f.id);
                  setVisibleCount(16);
                  setLightboxIndex(null);
                }}
                role="tab"
                aria-selected={activeFilter === f.id}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Projects Grid (Non-solar project categories) */}
          {activeFilter !== 'solar-energy' && filteredProjects.length > 0 && (
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
          )}

          {/* Dedicated Electrical Installation Field Projects & Video Gallery */}
          {activeFilter === 'electrical-installation' && (
            <div 
              className="electrical-field-gallery"
              style={{ 
                marginTop: '3.5rem',
                paddingTop: '2.5rem',
                borderTop: '1px solid #E2E8F0'
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <span className="badge-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
                  <Zap size={15} color="#E87A00" />
                  Field Installation Gallery
                </span>
                <h3 style={{ fontSize: '1.9rem', color: '#324763', marginBottom: '0.75rem' }}>
                  Electrical Engineering & Distribution Deployments
                </h3>
                <p style={{ color: '#4A5B70', maxWidth: '680px', margin: '0 auto', fontSize: '1rem', lineHeight: '1.7' }}>
                  Browse authentic field photography and footage documenting our conduit piping, 
                  distribution board wiring, high-load switchgear, and certified electrical engineering installations.
                </p>
              </div>

              {/* Gallery Grid */}
              <div className="solar-gallery-grid">
                {ELECTRICAL_GALLERY_MEDIA.slice(0, visibleCount).map((item, index) => (
                  <div 
                    key={item.id}
                    onClick={() => setLightboxIndex(index)}
                    className="solar-thumb-card"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setLightboxIndex(index);
                      }
                    }}
                    aria-label={`View ${item.alt}`}
                  >
                    {item.type === 'video' ? (
                      <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#0F172A' }}>
                        <video 
                          src={item.src}
                          muted
                          preload="metadata"
                          className="solar-thumb-img"
                          style={{ filter: 'brightness(0.85)' }}
                        />
                        <span 
                          style={{
                            position: 'absolute',
                            top: '0.75rem',
                            left: '0.75rem',
                            backgroundColor: 'rgba(15, 23, 42, 0.85)',
                            backdropFilter: 'blur(4px)',
                            color: '#FFFFFF',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.55rem',
                            borderRadius: '4px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            zIndex: 2
                          }}
                        >
                          <Play size={10} fill="#E87A00" color="#E87A00" />
                          VIDEO
                        </span>
                      </div>
                    ) : (
                      <img 
                        src={item.src} 
                        alt={item.alt} 
                        loading="lazy"
                        className="solar-thumb-img"
                      />
                    )}

                    <div className="solar-thumb-overlay">
                      <div className="solar-thumb-icon">
                        {item.type === 'video' ? (
                          <Play size={20} color="#E87A00" fill="#E87A00" style={{ marginLeft: '2px' }} />
                        ) : (
                          <Maximize2 size={20} color="#E87A00" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gallery Pagination / Load More Footer */}
              <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                <p style={{ color: '#718296', fontSize: '0.92rem', marginBottom: '1.25rem' }}>
                  Showing {Math.min(visibleCount, ELECTRICAL_GALLERY_MEDIA.length)} of {ELECTRICAL_GALLERY_MEDIA.length} Field Media (16 Photos, 2 Videos)
                </p>
                {visibleCount < ELECTRICAL_GALLERY_MEDIA.length && (
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    className="btn btn-outline"
                    style={{
                      borderColor: '#324763',
                      color: '#324763',
                      fontWeight: 600,
                      padding: '0.75rem 2.2rem',
                      fontSize: '0.95rem'
                    }}
                  >
                    Load More Electrical Media ({ELECTRICAL_GALLERY_MEDIA.length - visibleCount} remaining)
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Dedicated Solar Energy Field Projects Gallery */}
          {activeFilter === 'solar-energy' && (
            <div 
              className="solar-field-gallery"
              style={{ 
                marginTop: '2.5rem' 
              }}
            >
              <style>{`
                .solar-gallery-grid {
                  display: grid;
                  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
                  gap: 1.25rem;
                }
                .solar-thumb-card {
                  position: relative;
                  border-radius: 12px;
                  overflow: hidden;
                  aspect-ratio: 4 / 3;
                  cursor: pointer;
                  background-color: #F5F7F9;
                  box-shadow: 0 4px 12px rgba(50, 71, 99, 0.08);
                  border: 1px solid #E2E8F0;
                  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms ease;
                }
                .solar-thumb-card:hover {
                  transform: translateY(-4px);
                  box-shadow: 0 12px 24px rgba(50, 71, 99, 0.16);
                  border-color: #E87A00;
                }
                .solar-thumb-img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  transition: transform 350ms cubic-bezier(0.4, 0, 0.2, 1);
                }
                .solar-thumb-card:hover .solar-thumb-img {
                  transform: scale(1.05);
                }
                .solar-thumb-overlay {
                  position: absolute;
                  inset: 0;
                  background: linear-gradient(180deg, rgba(50, 71, 99, 0.2) 0%, rgba(50, 71, 99, 0.6) 100%);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  opacity: 0;
                  transition: opacity 250ms ease;
                }
                .solar-thumb-card:hover .solar-thumb-overlay {
                  opacity: 1;
                }
                .solar-thumb-icon {
                  width: 44px;
                  height: 44px;
                  border-radius: 50%;
                  background-color: #FFFFFF;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                  transform: scale(0.85);
                  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
                }
                .solar-thumb-card:hover .solar-thumb-icon {
                  transform: scale(1);
                }
                @media (max-width: 640px) {
                  .solar-gallery-grid {
                    grid-template-columns: repeat(2, 1fr);
                    gap: 0.75rem;
                  }
                }
              `}</style>

              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <span className="badge-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
                  <Sun size={15} color="#E87A00" />
                  Field Installation Gallery
                </span>
                <h3 style={{ fontSize: '1.9rem', color: '#324763', marginBottom: '0.75rem' }}>
                  Solar Project Engineering & Deployments
                </h3>
                <p style={{ color: '#4A5B70', maxWidth: '680px', margin: '0 auto', fontSize: '1rem', lineHeight: '1.7' }}>
                  Browse through authentic field imagery documenting our rooftop solar photovoltaic arrays, 
                  pure sine wave hybrid inverters, LiFePO4 energy storage systems, and certified technical team implementations.
                </p>
              </div>

              {/* Gallery Grid */}
              <div className="solar-gallery-grid">
                {SOLAR_GALLERY_IMAGES.slice(0, visibleCount).map((image, index) => (
                  <div 
                    key={image.id}
                    onClick={() => setLightboxIndex(index)}
                    className="solar-thumb-card"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setLightboxIndex(index);
                      }
                    }}
                    aria-label={`View ${image.alt}`}
                  >
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      loading="lazy"
                      className="solar-thumb-img"
                    />
                    <div className="solar-thumb-overlay">
                      <div className="solar-thumb-icon">
                        <Maximize2 size={20} color="#E87A00" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gallery Pagination / Load More Footer */}
              <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                <p style={{ color: '#718296', fontSize: '0.92rem', marginBottom: '1.25rem' }}>
                  Showing {Math.min(visibleCount, SOLAR_GALLERY_IMAGES.length)} of {SOLAR_GALLERY_IMAGES.length} Project Photos
                </p>
                {visibleCount < SOLAR_GALLERY_IMAGES.length && (
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    className="btn btn-outline"
                    style={{
                      borderColor: '#324763',
                      color: '#324763',
                      fontWeight: 600,
                      padding: '0.75rem 2.2rem',
                      fontSize: '0.95rem'
                    }}
                  >
                    Load More Solar Photos ({SOLAR_GALLERY_IMAGES.length - visibleCount} remaining)
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.94)',
            backdropFilter: 'blur(8px)',
            zIndex: 4000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem'
          }}
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Solar Energy Project Photo Viewer"
        >
          {/* Lightbox Top Bar */}
          <div 
            style={{
              position: 'absolute',
              top: '1.25rem',
              left: '1.25rem',
              right: '1.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#FFFFFF',
              zIndex: 4010,
              maxWidth: '1280px',
              margin: '0 auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <span 
                style={{
                  backgroundColor: '#E87A00',
                  color: '#FFFFFF',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}
              >
                {activeFilter === 'electrical-installation' ? 'Electrical Installation' : 'Solar Energy'}
              </span>
              <span style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}>
                {currentMedia?.type === 'video' ? 'Video' : 'Photo'} {lightboxIndex + 1} of {currentGallery.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '50%',
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                cursor: 'pointer',
                transition: 'background 200ms ease'
              }}
              aria-label="Close photo viewer"
            >
              <X size={22} />
            </button>
          </div>

          {/* Previous Image Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
            style={{
              position: 'absolute',
              left: '1.25rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer',
              zIndex: 4010,
              transition: 'background 200ms ease'
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Next Image Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
            style={{
              position: 'absolute',
              right: '1.25rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer',
              zIndex: 4010,
              transition: 'background 200ms ease'
            }}
            aria-label="Next photo"
          >
            <ChevronRight size={28} />
          </button>

          {/* Main Media Container */}
          <div 
            style={{
              maxWidth: '92vw',
              maxHeight: '80vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {currentMedia?.type === 'video' ? (
              <video 
                key={currentMedia.src}
                src={currentMedia.src}
                controls
                autoPlay
                playsInline
                style={{
                  maxWidth: '100%',
                  maxHeight: '78vh',
                  borderRadius: '8px',
                  backgroundColor: '#000000',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
                }}
              >
                Your browser does not support HTML5 video playback.
              </video>
            ) : (
              <img 
                src={currentMedia?.src}
                alt={currentMedia?.alt}
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
              />
            )}
          </div>

          {/* Bottom Navigation Hint */}
          <div 
            style={{
              position: 'absolute',
              bottom: '1.25rem',
              color: 'rgba(255, 255, 255, 0.75)',
              fontSize: '0.85rem',
              textAlign: 'center',
              zIndex: 4010
            }}
            onClick={(e) => e.stopPropagation()}
          >
            Use <kbd style={{ padding: '0.15rem 0.45rem', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }}>←</kbd> and <kbd style={{ padding: '0.15rem 0.45rem', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }}>→</kbd> keys to navigate, <kbd style={{ padding: '0.15rem 0.45rem', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }}>Esc</kbd> to close
          </div>
        </div>
      )}

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
