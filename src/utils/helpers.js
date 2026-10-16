// Consolidated Shared Utility Functions for FLOWNERGY GLOBAL LIMITED
import { COMPANY_INFO } from '../data/companyData';

/**
 * Open official WhatsApp business chat with a prefilled enquiry message.
 * @param {string} message - Optional customized message
 */
export function openWhatsApp(message = "Hello FLOWNERGY GLOBAL LIMITED, I would like to enquire about your services and request a quotation.") {
  const url = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

/**
 * Copy text to clipboard and trigger state callback with auto-reset timer.
 * @param {string} text - The text to copy
 * @param {Function} setCopied - React setState callback for 'copied' flag
 * @param {number} duration - Milliseconds before resetting flag (default 2500ms)
 */
export function copyToClipboard(text, setCopied, duration = 2500) {
  navigator.clipboard.writeText(text).then(() => {
    if (setCopied) {
      setCopied(true);
      setTimeout(() => setCopied(false), duration);
    }
  }).catch((err) => {
    console.warn("Clipboard copy failed:", err);
  });
}

/**
 * Generate a standard timestamped ticket reference number.
 * @param {string} prefix - e.g. 'FLW', 'SLR', 'PM'
 * @returns {string} e.g. 'FLW-123456'
 */
export function generateTicket(prefix = 'FLW') {
  return `${prefix}-${Date.now().toString().slice(-6)}`;
}

/**
 * Safely persist enquiry data into localStorage archive.
 * @param {string} storageKey - localStorage key
 * @param {Object} data - Payload to store
 */
export function saveEnquiry(storageKey, data) {
  try {
    const list = JSON.parse(localStorage.getItem(storageKey) || '[]');
    list.unshift({
      date: new Date().toISOString(),
      ...data
    });
    localStorage.setItem(storageKey, JSON.stringify(list));
  } catch (err) {
    console.warn('Storage persistence warning:', err);
  }
}

/**
 * Smoothly scroll to an element by its DOM ID.
 * @param {string} elementId - ID of element
 */
export function scrollToElement(elementId) {
  const el = document.getElementById(elementId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
