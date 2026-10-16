import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function BreadcrumbBanner({ title, subtitle, crumbs = [] }) {
  return (
    <div className="breadcrumb-banner">
      <div className="container">
        <nav className="breadcrumb-nav" aria-label="Breadcrumb">
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <Home size={14} />
            <span>Home</span>
          </Link>
          {crumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight size={13} style={{ opacity: 0.6 }} />
              {crumb.path ? (
                <Link to={crumb.path}>{crumb.label}</Link>
              ) : (
                <span style={{ color: '#E87A00', fontWeight: 600 }}>{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
        <h1>{title}</h1>
        {subtitle && (
          <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.15rem', marginTop: '0.6rem', maxWidth: '720px' }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
