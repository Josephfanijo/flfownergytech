import React from 'react';
import { 
  Zap, 
  Sun, 
  Camera, 
  Building, 
  Home as HomeIcon, 
  Building2, 
  Briefcase, 
  Store, 
  Factory, 
  Users 
} from 'lucide-react';

/**
 * Return consistent Lucide icon for each core service ID
 * @param {string} id - service id e.g. 'electrical-installation'
 * @param {number} size - icon size
 */
export function getServiceIcon(id, size = 26) {
  switch (id) {
    case 'electrical-installation':
      return <Zap size={size} />;
    case 'solar-energy':
      return <Sun size={size} />;
    case 'cctv-security':
      return <Camera size={size} />;
    case 'property-management':
      return <Building size={size} />;
    default:
      return <Zap size={size} />;
  }
}

/**
 * Return consistent Lucide icon for industry sectors
 * @param {number} index - sector index 0-5
 * @param {number} size - icon size
 */
export function getSectorIcon(index, size = 22) {
  switch (index) {
    case 0: return <HomeIcon size={size} />;
    case 1: return <Building2 size={size} />;
    case 2: return <Briefcase size={size} />;
    case 3: return <Store size={size} />;
    case 4: return <Factory size={size} />;
    case 5: return <Users size={size} />;
    default: return <Building size={size} />;
  }
}
