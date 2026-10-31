import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  X,
  Camera,
  Building
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/companyData';
import { SOLAR_GALLERY_IMAGES } from '../data/solarGalleryData';
import { ELECTRICAL_GALLERY_MEDIA } from '../data/electricalGalleryData';
import { CCTV_GALLERY_MEDIA } from '../data/cctvGalleryData';
import { PROPERTY_GALLERY_IMAGES } from '../data/propertyGalleryData';
import BreadcrumbBanner from '../components/BreadcrumbBanner';

export default function Projects() {
  const location = useLocation();

  // Helper to determine initial filter from URL search param or hash
  const getInitialFilter = () => {
    if (typeof window === 'undefined') return 'all';
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    const hash = window.location.hash.replace('#', '');
    const validFilters = ['electrical-installation', 'solar-energy', 'cctv-security', 'property-management'];
    if (cat && validFilters.includes(cat)) return cat;
    if (hash && validFilters.includes(hash)) return hash;
    return 'all';
  };

  const [activeFilter, setActiveFilter] = useState(getInitialFilter);
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleCount, setVisibleCount] = useState(16);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [cctvInlinePlaying, setCctvInlinePlaying] = useState(false);

  // Read ?category= query param or hash and activate the matching filter tab & scroll to section
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    const hash = location.hash ? location.hash.replace('#', '') : '';
    const validFilters = ['electrical-installation', 'solar-energy', 'cctv-security', 'property-management'];
    
    let targetFilter = null;
    if (cat && validFilters.includes(cat)) {
      targetFilter = cat;
    } else if (hash && validFilters.includes(hash)) {
      targetFilter = hash;
    }

    if (targetFilter) {
      setActiveFilter(targetFilter);
      setVisibleCount(16);
      setCctvInlinePlaying(false);
    }

    const targetId = hash || targetFilter;
    if (targetId) {
      const scrollTimer = setTimeout(() => {
        const el = document.getElementById(targetId) || document.getElementById('projects-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
      return () => clearTimeout(scrollTimer);
    }
  }, [location.search, location.hash]);

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "electrical-installation", label: "Electrical Installation" },
    { id: "solar-energy", label: "Solar Energy" },
    { id: "cctv-security", label: "CCTV & Security" },
    { id: "property-management", label: "Property Management" }
  ];

  const cctvVideoProject = {
    id: "proj-cctv-4cam",
    title: "Four-Camera HD IP CCTV Surveillance Deployment",
    service: "CCTV & Security Systems",
    category: "cctv-security",
    location: "Residential Estate, Nigeria",
    description: "Live on-site engineering footage of FLOWNERGY technical personnel carrying out a 4-camera IP surveillance deployment, including conduit piping, tamper-resistant mounting, precision alignment, and mobile live-view setup.",
    image: "/images/projects/cctv-security/cctv-video-thumbnail.jpg",
    video: "/images/projects/cctv-security/cctv-field-installation-video.mp4",
    duration: "01:23",
    specs: [
      "4x High-Definition IP Cameras",
      "Conduit Piping & Weatherproof Enclosures",
      "Multi-Channel NVR Storage",
      "Mobile Smartphone Live View"
    ]
  };

  // Remove only the second project card currently displayed in CCTV (index 1)
  const cctvProjectsList = [
    cctvVideoProject,
    ...PROJECTS_DATA.filter(p => p.category === 'cctv-security')
  ].filter((_, idx) => idx !== 1);

  const allProjectsList = [
    cctvVideoProject,
    ...PROJECTS_DATA.filter(p => p.category !== "solar-energy" && p.id !== "proj-3")
  ];

  const filteredProjects = activeFilter === "all" 
    ? allProjectsList
    : PROJECTS_DATA.filter(p => p.category === activeFilter && p.category !== "solar-energy");

  const currentGallery = activeFilter === 'electrical-installation' 
    ? ELECTRICAL_GALLERY_MEDIA 
    : activeFilter === 'cctv-security'
      ? CCTV_GALLERY_MEDIA
      : activeFilter === 'property-management'
        ? PROPERTY_GALLERY_IMAGES
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

  const renderProjectsGrid = (projects) => (
    <div className="projects-grid">
      {projects.map((project) => (
        <article key={project.id} className="project-card">
          <div 
            className="project-media"
            style={{ position: 'relative', cursor: project.video ? 'pointer' : 'default', overflow: 'hidden' }}
            onClick={() => {
              if (project.video) {
                setLightboxIndex(0);
              }
            }}
          >
            <img 
              src={project.image} 
              alt={project.title} 
              loading="lazy" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <span className="project-category-badge">{project.service}</span>

            {project.video && (
              <>
                <span 
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(232, 122, 0, 0.95)',
                    color: '#FFFFFF',
                    padding: '0.3rem 0.65rem',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                    zIndex: 2
                  }}
                >
                  <Play size={10} fill="#FFFFFF" color="#FFFFFF" />
                  FIELD VIDEO
                </span>
                <div 
                  className="project-video-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(50, 71, 99, 0.35)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 250ms ease'
                  }}
                >
                  <div 
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: '#E87A00',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 6px 20px rgba(232, 122, 0, 0.5)'
                    }}
                  >
                    <Play size={24} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: '3px' }} />
                  </div>
                  <span 
                    style={{
                      backgroundColor: 'rgba(15, 23, 42, 0.85)',
                      backdropFilter: 'blur(4px)',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px'
                    }}
                  >
                    Watch Footage ({project.duration || '01:23'})
                  </span>
                </div>
              </>
            )}
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

            <div style={{ marginTop: 'auto', paddingTop: '1.2rem', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                {project.video && (
                  <button 
                    type="button" 
                    onClick={() => setLightboxIndex(0)}
                    className="btn btn-sm btn-primary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.45rem 0.85rem' }}
                  >
                    <Play size={12} fill="#FFFFFF" color="#FFFFFF" />
                    <span>Watch Video</span>
                  </button>
                )}
                <button 
                  type="button" 
                  onClick={() => setSelectedProject(project)}
                  className="service-card-link"
                  style={{ fontSize: '0.9rem' }}
                >
                  <span>View Scope</span>
                  <ArrowRight size={14} />
                </button>
              </div>
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
  );

  return (
    <div>
      <BreadcrumbBanner 
        title="Our Projects Portfolio"
        subtitle="Explore verified project implementations and engineering solutions executed across our four core service divisions."
        crumbs={[{ label: "Projects" }]}
      />

      <section className="section" id="projects-section">
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
                id={`tab-${f.id}`}
                type="button"
                className={`filter-btn ${activeFilter === f.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveFilter(f.id);
                  setVisibleCount(16);
                  setLightboxIndex(null);
                  setCctvInlinePlaying(false);
                }}
                role="tab"
                aria-selected={activeFilter === f.id}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* All Projects Section */}
          {activeFilter === 'all' && (
            <div 
              id="all-projects" 
              className="project-category-section" 
              style={{ scrollMarginTop: '100px', marginTop: '2rem' }}
            >
              {filteredProjects.length > 0 && renderProjectsGrid(filteredProjects)}
            </div>
          )}

          {/* CCTV & Security Systems Section */}
          {activeFilter === 'cctv-security' && (
            <div 
              id="cctv-security" 
              className="project-category-section" 
              style={{ scrollMarginTop: '100px', marginTop: '2rem' }}
            >
              {cctvProjectsList.length > 0 && renderProjectsGrid(cctvProjectsList)}

              {/* Dedicated CCTV Field Video Showcase */}
              <div 
                className="cctv-field-showcase"
                style={{ 
                  marginTop: '3.5rem',
                  paddingTop: '2.5rem',
                  borderTop: '1px solid #E2E8F0'
                }}
              >
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                  <span className="badge-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
                    <Camera size={15} color="#E87A00" />
                    Verified On-Site Video Footage
                  </span>
                  <h3 style={{ fontSize: '1.9rem', color: '#324763', marginBottom: '0.75rem' }}>
                    CCTV Installation & Multi-Angle Surveillance Deployment
                  </h3>
                  <p style={{ color: '#4A5B70', maxWidth: '680px', margin: '0 auto', fontSize: '1rem', lineHeight: '1.7' }}>
                    Watch FLOWNERGY technical personnel carrying out a 4-camera IP surveillance system installation, 
                    showcasing proper conduit cabling, rigid weather-proof mounting, and live multi-camera monitoring.
                  </p>
                </div>

                <style>{`
                  .cctv-showcase-card {
                    display: grid;
                    grid-template-columns: minmax(300px, 380px) 1fr;
                    gap: 2.75rem;
                    align-items: center;
                    background-color: #FFFFFF;
                    border: 1px solid #E2E8F0;
                    border-radius: 16px;
                    padding: 2.5rem;
                    box-shadow: 0 8px 30px rgba(50, 71, 99, 0.08);
                  }
                  .cctv-player-container {
                    position: relative;
                    width: 100%;
                    max-width: 380px;
                    margin: 0 auto;
                    border-radius: 14px;
                    overflow: hidden;
                    background-color: #0F172A;
                    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.25);
                    aspect-ratio: 9 / 16;
                    max-height: 540px;
                  }
                  .cctv-player-video {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    display: block;
                    background-color: #000000;
                  }
                  .cctv-play-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(180deg, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.7) 100%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: background 250ms ease;
                    z-index: 5;
                  }
                  .cctv-play-overlay:hover {
                    background: linear-gradient(180deg, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.6) 100%);
                  }
                  .cctv-play-btn {
                    width: 72px;
                    height: 72px;
                    border-radius: 50%;
                    background-color: #E87A00;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 8px 24px rgba(232, 122, 0, 0.5);
                    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
                  }
                  .cctv-play-overlay:hover .cctv-play-btn {
                    transform: scale(1.1);
                  }
                  @media (max-width: 900px) {
                    .cctv-showcase-card {
                      grid-template-columns: 1fr;
                      padding: 1.75rem;
                      gap: 2rem;
                    }
                    .cctv-player-container {
                      max-width: 320px;
                      max-height: 480px;
                    }
                  }
                  @media (max-width: 480px) {
                    .cctv-showcase-card {
                      padding: 1.25rem;
                    }
                    .cctv-player-container {
                      max-width: 100%;
                      max-height: 440px;
                    }
                  }
                `}</style>

                <div className="cctv-showcase-card">
                  {/* Video Player Column */}
                  <div className="cctv-player-container">
                    {cctvInlinePlaying ? (
                      <video 
                        src="/images/projects/cctv-security/cctv-field-installation-video.mp4"
                        poster="/images/projects/cctv-security/cctv-video-thumbnail.jpg"
                        controls
                        autoPlay
                        playsInline
                        preload="metadata"
                        className="cctv-player-video"
                      >
                        Your browser does not support HTML5 video playback.
                      </video>
                    ) : (
                      <div 
                        className="cctv-play-overlay"
                        onClick={() => setCctvInlinePlaying(true)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setCctvInlinePlaying(true);
                          }
                        }}
                        aria-label="Play CCTV Installation Video"
                      >
                        <img 
                          src="/images/projects/cctv-security/cctv-video-thumbnail.jpg" 
                          alt="FLOWNERGY CCTV Installation Project Video Preview" 
                          style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                        <div 
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.25) 0%, rgba(15, 23, 42, 0.65) 100%)'
                          }}
                        />

                        {/* Top Badges */}
                        <div 
                          style={{
                            position: 'absolute',
                            top: '1rem',
                            left: '1rem',
                            right: '1rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            zIndex: 6
                          }}
                        >
                          <span 
                            style={{
                              backgroundColor: 'rgba(50, 71, 99, 0.9)',
                              backdropFilter: 'blur(4px)',
                              color: '#FFFFFF',
                              padding: '0.3rem 0.65rem',
                              borderRadius: '4px',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}
                          >
                            <Play size={10} fill="#E87A00" color="#E87A00" />
                            FIELD VIDEO
                          </span>
                          <span 
                            style={{
                              backgroundColor: 'rgba(15, 23, 42, 0.85)',
                              backdropFilter: 'blur(4px)',
                              color: '#FFFFFF',
                              padding: '0.3rem 0.6rem',
                              borderRadius: '4px',
                              fontSize: '0.72rem',
                              fontWeight: 600
                            }}
                          >
                            01:23
                          </span>
                        </div>

                        {/* Centered Play Button */}
                        <div className="cctv-play-btn" style={{ zIndex: 6 }}>
                          <Play size={32} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: '4px' }} />
                        </div>

                        {/* Bottom Label */}
                        <div 
                          style={{
                            position: 'absolute',
                            bottom: '1.25rem',
                            left: '1rem',
                            right: '1rem',
                            textAlign: 'center',
                            zIndex: 6
                          }}
                        >
                          <span 
                            style={{
                              color: '#FFFFFF',
                              fontSize: '0.85rem',
                              fontWeight: 600,
                              textShadow: '0 2px 6px rgba(0,0,0,0.8)'
                            }}
                          >
                            Click to Play Full Video
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Technical Scope Column */}
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span className="badge-tag" style={{ margin: 0 }}>Verified Field Installation</span>
                      <span style={{ fontSize: '0.85rem', color: '#718296', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <MapPin size={13} color="#E87A00" />
                        Residential Estate, Nigeria
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.5rem', color: '#324763', marginBottom: '0.85rem', lineHeight: '1.3' }}>
                      Four-Camera HD IP CCTV Surveillance Deployment
                    </h4>

                    <p style={{ color: '#4A5B70', fontSize: '0.96rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                      Demonstrating authentic on-site engineering by FLOWNERGY TECH. Our technicians eliminate blind spots with calculated camera angles, safeguard all cabling within weather-tight industrial conduit, and connect the system to secure mobile live view.
                    </p>

                    {/* Technical Features List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#FFF5EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                          <CheckCircle2 size={16} color="#E87A00" />
                        </div>
                        <div>
                          <strong style={{ fontSize: '0.92rem', color: '#324763', display: 'block' }}>Complete Perimeter & Entrance Coverage</strong>
                          <span style={{ fontSize: '0.86rem', color: '#718296' }}>Four high-definition cameras strategically positioned to cover gates, walkways, and perimeter walls.</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#FFF5EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                          <CheckCircle2 size={16} color="#E87A00" />
                        </div>
                        <div>
                          <strong style={{ fontSize: '0.92rem', color: '#324763', display: 'block' }}>Weatherproof Conduit Trunking</strong>
                          <span style={{ fontSize: '0.86rem', color: '#718296' }}>Tamper-resistant surface piping preventing moisture ingress and physical wire tampering.</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#FFF5EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                          <CheckCircle2 size={16} color="#E87A00" />
                        </div>
                        <div>
                          <strong style={{ fontSize: '0.92rem', color: '#324763', display: 'block' }}>Mobile Remote Surveillance Setup</strong>
                          <span style={{ fontSize: '0.86rem', color: '#718296' }}>Real-time streaming and push alerts configured directly on the client's smartphone.</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Links */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                      <button
                        type="button"
                        onClick={() => setLightboxIndex(0)}
                        className="btn btn-outline"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.65rem 1.4rem' }}
                      >
                        <Maximize2 size={16} color="#324763" />
                        <span>Theater / Fullscreen View</span>
                      </button>
                      <Link 
                        to="/contact?service=CCTV%20%26%20Security%20Systems#quote"
                        className="btn btn-primary"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.65rem 1.6rem' }}
                      >
                        <span>Request Security Quote</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Property Management Section */}
          {activeFilter === 'property-management' && (
            <div 
              id="property-management" 
              className="project-category-section" 
              style={{ scrollMarginTop: '100px', marginTop: '2rem' }}
            >
              {filteredProjects.length > 0 && renderProjectsGrid(filteredProjects)}

              {/* Dedicated Property Management Field Gallery */}
              <div 
                className="property-field-gallery"
                style={{ 
                  marginTop: filteredProjects.length > 0 ? '3.5rem' : '1.5rem',
                  paddingTop: filteredProjects.length > 0 ? '2.5rem' : '0',
                  borderTop: filteredProjects.length > 0 ? '1px solid #E2E8F0' : 'none'
                }}
              >
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                  <span className="badge-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
                    <Building size={15} color="#E87A00" />
                    Field Inspection Gallery
                  </span>
                  <h3 style={{ fontSize: '1.9rem', color: '#324763', marginBottom: '0.75rem' }}>
                    Facility Management & Technical Site Supervision
                  </h3>
                  <p style={{ color: '#4A5B70', maxWidth: '680px', margin: '0 auto', fontSize: '1rem', lineHeight: '1.7' }}>
                    Browse authentic field photography documenting our comprehensive facility supervision, 
                    preventative technical maintenance, structural inspections, and certified engineering audits.
                  </p>
                </div>

                <style>{`
                  .property-gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
                    gap: 1.25rem;
                  }
                  .property-thumb-card {
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
                  .property-thumb-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px rgba(50, 71, 99, 0.16);
                    border-color: #E87A00;
                  }
                  .property-thumb-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 350ms cubic-bezier(0.4, 0, 0.2, 1);
                  }
                  .property-thumb-card:hover .property-thumb-img {
                    transform: scale(1.05);
                  }
                  .property-thumb-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(180deg, rgba(50, 71, 99, 0.2) 0%, rgba(50, 71, 99, 0.6) 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 250ms ease;
                  }
                  .property-thumb-card:hover .property-thumb-overlay {
                    opacity: 1;
                  }
                  .property-thumb-icon {
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
                  .property-thumb-card:hover .property-thumb-icon {
                    transform: scale(1);
                  }
                  @media (max-width: 640px) {
                    .property-gallery-grid {
                      grid-template-columns: repeat(2, 1fr);
                      gap: 0.75rem;
                    }
                  }
                `}</style>

                {/* Gallery Grid */}
                <div className="property-gallery-grid">
                  {PROPERTY_GALLERY_IMAGES.slice(0, visibleCount).map((image, index) => (
                    <div 
                      key={image.id}
                      onClick={() => setLightboxIndex(index)}
                      className="property-thumb-card"
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
                        className="property-thumb-img"
                      />
                      <div className="property-thumb-overlay">
                        <div className="property-thumb-icon">
                          <Maximize2 size={20} color="#E87A00" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gallery Pagination / Load More Footer */}
                <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                  <p style={{ color: '#718296', fontSize: '0.92rem', marginBottom: '1.25rem' }}>
                    Showing {Math.min(visibleCount, PROPERTY_GALLERY_IMAGES.length)} of {PROPERTY_GALLERY_IMAGES.length} Property Management Photos
                  </p>
                  {visibleCount < PROPERTY_GALLERY_IMAGES.length && (
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
                      Load More Property Photos ({PROPERTY_GALLERY_IMAGES.length - visibleCount} remaining)
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Dedicated Electrical Installation Field Projects & Video Gallery */}
          {activeFilter === 'electrical-installation' && (
            <div 
              id="electrical-installation"
              className="project-category-section"
              style={{ scrollMarginTop: '100px' }}
            >
              {filteredProjects.length > 0 && renderProjectsGrid(filteredProjects)}

              <div 
                className="electrical-field-gallery"
                style={{ 
                  marginTop: filteredProjects.length > 0 ? '3.5rem' : '1.5rem',
                  paddingTop: filteredProjects.length > 0 ? '2.5rem' : '0',
                  borderTop: filteredProjects.length > 0 ? '1px solid #E2E8F0' : 'none'
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

              <style>{`
                .electrical-gallery-grid {
                  display: grid;
                  grid-template-columns: repeat(4, 1fr);
                  gap: 1.25rem;
                }
                .electrical-thumb-card {
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
                .electrical-thumb-card:hover {
                  transform: translateY(-4px);
                  box-shadow: 0 12px 24px rgba(50, 71, 99, 0.16);
                  border-color: #E87A00;
                }
                .electrical-thumb-img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  display: block;
                  transition: transform 350ms cubic-bezier(0.4, 0, 0.2, 1);
                }
                .electrical-thumb-card:hover .electrical-thumb-img {
                  transform: scale(1.05);
                }
                .electrical-thumb-overlay {
                  position: absolute;
                  inset: 0;
                  background: linear-gradient(180deg, rgba(50, 71, 99, 0.2) 0%, rgba(50, 71, 99, 0.6) 100%);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  opacity: 0;
                  transition: opacity 250ms ease;
                  z-index: 3;
                }
                .electrical-thumb-card:hover .electrical-thumb-overlay {
                  opacity: 1;
                }
                .electrical-thumb-icon {
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
                .electrical-thumb-card:hover .electrical-thumb-icon {
                  transform: scale(1);
                }
                @media (max-width: 992px) {
                  .electrical-gallery-grid {
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                  }
                }
                @media (max-width: 576px) {
                  .electrical-gallery-grid {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                  }
                }
              `}</style>

              {/* Gallery Grid (4 Columns Desktop, 2 Tablet, 1 Mobile) */}
              <div className="electrical-gallery-grid">
                {ELECTRICAL_GALLERY_MEDIA.slice(0, visibleCount).map((item, index) => (
                  <div 
                    key={item.id}
                    onClick={() => setLightboxIndex(index)}
                    className="electrical-thumb-card"
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
                      <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#0F172A', overflow: 'hidden' }}>
                        <video 
                          src={item.src}
                          muted
                          preload="metadata"
                          className="electrical-thumb-img"
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
                        className="electrical-thumb-img"
                      />
                    )}

                    <div className="electrical-thumb-overlay">
                      <div className="electrical-thumb-icon">
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
          </div>
        )}

        {/* Dedicated Solar Energy Field Projects Gallery */}
        {activeFilter === 'solar-energy' && (
          <div 
            id="solar-energy"
            className="solar-field-gallery project-category-section"
            style={{ 
              marginTop: '2.5rem',
              scrollMarginTop: '100px'
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
                {activeFilter === 'electrical-installation' 
                  ? 'Electrical Installation' 
                  : activeFilter === 'cctv-security'
                    ? 'CCTV & Security Systems'
                    : activeFilter === 'property-management'
                      ? 'Property Management'
                      : 'Solar Energy'}
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
          {currentGallery.length > 1 && (
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
          )}

          {/* Next Image Button */}
          {currentGallery.length > 1 && (
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
          )}

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
            {currentGallery.length > 1 ? (
              <>Use <kbd style={{ padding: '0.15rem 0.45rem', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }}>←</kbd> and <kbd style={{ padding: '0.15rem 0.45rem', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }}>→</kbd> keys to navigate, <kbd style={{ padding: '0.15rem 0.45rem', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }}>Esc</kbd> to close</>
            ) : (
              <>Press <kbd style={{ padding: '0.15rem 0.45rem', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }}>Esc</kbd> to close</>
            )}
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
