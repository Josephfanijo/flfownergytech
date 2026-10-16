import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0); // first item open by default

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="faq-item">
            <button
              type="button"
              className="faq-header"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
            >
              <span>{item.q}</span>
              <ChevronDown 
                size={18} 
                style={{ 
                  transform: isOpen ? 'rotate(180deg)' : 'none', 
                  transition: 'transform 0.25s',
                  color: isOpen ? '#E87A00' : '#324763',
                  flexShrink: 0,
                  marginLeft: '0.75rem'
                }} 
              />
            </button>
            {isOpen && (
              <div className="faq-content">
                <p style={{ margin: 0 }}>{item.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
