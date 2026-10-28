// FLOWNERGY TECH — Official Company Information & Content Data

export const COMPANY_INFO = {
  name: "FLOWNERGY TECH",
  shortName: "FLOWNERGY",
  domain: "https://flownergytech.com",
  tagline: "Powering, Protecting & Managing Your Property",
  description: "Reliable electrical installation, intelligent solar energy solutions, advanced security systems, and professional property management for residential, commercial, and industrial clients.",
  // Verified contact placeholders configured for production deployment
  email: "info@flownergytech.com",
  phone: "+234 800 000 0000",
  whatsappNumber: "2348000000000", // Configure with official verified WhatsApp business number
  address: "Nigeria", // Official physical address to be completed upon verification
  operatingHours: "Monday – Saturday: 8:00 AM – 6:00 PM",
  mission: "To deliver dependable technical and property solutions through professional workmanship, safety-conscious practices, and a commitment to customer satisfaction.",
  vision: "To be a trusted provider of integrated electrical, energy, security, and property management solutions.",
  coreValues: [
    { title: "Integrity", desc: "Honest communication, transparent quotations, and uncompromising accountability in every engagement." },
    { title: "Professionalism", desc: "Adherence to highest technical standards, neat execution, and disciplined project management." },
    { title: "Reliability", desc: "Dependable service delivery, consistent power solutions, and responsive support." },
    { title: "Safety", desc: "Strict compliance with electrical safety regulations and protective measures on all sites." },
    { title: "Quality", desc: "Superior equipment selection, rigorous testing, and durable workmanship that lasts." },
    { title: "Customer Commitment", desc: "Tailored solutions, respectful client relations, and dedicated after-service support." }
  ]
};

export const SERVICES = [
  {
    id: "electrical-installation",
    title: "Electrical Installation",
    shortTitle: "Electrical Installation",
    path: "/services/electrical-installation",
    heroHeadline: "Reliable Electrical Installation for Every Project.",
    badge: "Power & Wiring Engineering",
    description: "Residential, commercial, and industrial electrical installation, building wiring, rewiring, electrical maintenance, troubleshooting, and electrical protection systems.",
    image: "/images/electrical.jpg",
    offerings: [
      { title: "Residential Electrical Installation", desc: "Complete wiring, fixture fittings, load balancing, and circuit breaker distribution for homes and apartments." },
      { title: "Commercial Electrical Systems", desc: "High-capacity power distribution, office cable ducting, trunking, and energy-efficient lighting designs." },
      { title: "Industrial Electrical Solutions", desc: "Heavy machinery connections, 3-phase power setups, control panels, and surge protection installations." },
      { title: "Building Wiring & Rewiring", desc: "Modern, safe rewiring for aging structures, renovations, and new architectural developments." },
      { title: "Fault Diagnosis & Troubleshooting", desc: "Precision electrical testing to isolate short circuits, voltage fluctuations, and ground faults." },
      { title: "Electrical Protection Systems", desc: "Installation of surge arrestors, earthing systems, RCDs, and voltage monitoring stabilizers." }
    ],
    process: [
      "Initial site survey and load assessment",
      "Engineering diagram review & safety plan",
      "Procurement of rated cables & components",
      "Neat installation, conduit laying & trunking",
      "Rigorous continuity, insulation & load testing",
      "System commissioning & client handover"
    ],
    faqs: [
      { q: "How do I request an electrical assessment for my property?", a: "You can submit an enquiry via our Request a Quote form or contact us directly. Our electrical engineers will arrange an on-site or technical evaluation based on your building plans." },
      { q: "Do you handle both new builds and renovation rewiring?", a: "Yes, we handle complete electrical piping and wiring for new constructions as well as safe rewiring and modern upgrades for existing properties." },
      { q: "How do you ensure electrical safety during installation?", a: "All installations comply with standard wiring regulations, incorporating proper earthing, correctly rated circuit breakers (MCBs/MCCBs), residual current devices (RCDs), and surge protection." },
      { q: "Can you assist with troubleshooting recurring power trips or burnt outlets?", a: "Yes. Our technical team conducts thorough fault tracing to isolate ground faults, overloaded phases, or faulty appliances causing breaker trips." }
    ]
  },
  {
    id: "solar-energy",
    title: "Solar Energy",
    shortTitle: "Solar Energy",
    path: "/services/solar-energy",
    heroHeadline: "Smarter Solar Energy Solutions for Your Property.",
    badge: "Renewable & Backup Power",
    description: "Solar system design and installation, solar panels, inverter systems, lithium batteries, energy assessment, and maintenance.",
    image: "/images/solar.jpg",
    offerings: [
      { title: "Custom Solar System Design", desc: "Precision engineering tailored to your daily kilowatt-hour demand, peak loads, and available roof space." },
      { title: "High-Efficiency Solar Panels", desc: "Monocrystalline and Tier-1 photovoltaic panels built for maximum output in high-temperature environments." },
      { title: "Pure Sine Wave Inverter Systems", desc: "Advanced hybrid and off-grid inverters that seamlessly switch between solar, grid, and generator." },
      { title: "Lithium LiFePO4 Battery Storage", desc: "Long-lifespan lithium iron phosphate energy storage with advanced BMS safety protection." },
      { title: "Comprehensive Energy Audits", desc: "Detailed load profiling to optimize consumption, eliminate phantom loads, and downsize necessary battery capacity." },
      { title: "Solar Maintenance & Panel Cleaning", desc: "Routine health checks, string voltage validation, dust removal, and firmware upgrades." }
    ],
    process: [
      "Energy audit & appliance load calculation",
      "System sizing (inverter kVA, battery kWh & PV kW)",
      "Technical proposal & component specification",
      "Mounting structure & solar panel installation",
      "Battery bank & inverter wiring with DC/AC breakers",
      "Load balancing, parameter tuning & handover"
    ],
    faqs: [
      { q: "How do you determine the right solar system size for my home or business?", a: "We analyze your actual appliances (air conditioners, refrigerators, pumps, lights), their wattage, and your desired backup hours. We then calculate the optimal inverter rating, battery capacity, and solar array." },
      { q: "What is the difference between lithium and tubular/gel batteries?", a: "Lithium LiFePO4 batteries offer deeper depth of discharge (up to 90%), significantly faster charging, smaller footprint, and much longer cycle life (3,000+ cycles) compared to lead-acid alternatives." },
      { q: "Can my solar system run heavy appliances like air conditioners and water pumps?", a: "Yes, provided the inverter kVA and battery discharge rates are properly sized with adequate surge margins. We design systems specifically for heavy inductive loads." },
      { q: "Do you provide after-installation maintenance?", a: "Yes, we provide routine preventive maintenance, performance monitoring checks, and technical support for all our solar installations." }
    ]
  },
  {
    id: "cctv-security",
    title: "CCTV & Security Systems",
    shortTitle: "CCTV & Security Systems",
    path: "/services/cctv-security",
    heroHeadline: "Protect What Matters with Smarter Security Systems.",
    badge: "Surveillance & Property Protection",
    description: "CCTV installation, IP surveillance, security cameras, remote monitoring where supported, and system maintenance.",
    image: "/images/cctv.jpg",
    offerings: [
      { title: "High-Definition IP CCTV", desc: "4K and 1080p network cameras delivering crystal clear imaging, night vision, and wide dynamic range." },
      { title: "Strategic Camera Positioning", desc: "Eliminating blind spots at entry gates, perimeter fences, reception lobbies, and inventory rooms." },
      { title: "Remote Mobile & Desktop Monitoring", desc: "Secure viewing from your smartphone, tablet, or laptop from anywhere with internet connectivity." },
      { title: "Network Video Recorders (NVR/DVR)", desc: "High-capacity surveillance-grade storage with smart motion detection and continuous recording." },
      { title: "System Upgrades & Retrofitting", desc: "Converting obsolete analog systems to high-resolution IP surveillance using existing or upgraded cabling." },
      { title: "Routine Maintenance & Servicing", desc: "Camera lens cleaning, power supply validation, cable testing, and recording retention checks." }
    ],
    process: [
      "Property layout review & blind-spot assessment",
      "Camera type selection (dome, bullet, PTZ, night vision)",
      "Clean trunking, structured cabling & conduit installation",
      "NVR configuration, PoE switch setup & storage allocation",
      "Network integration & secure mobile app configuration",
      "Angle fine-tuning, system walk-through & client training"
    ],
    faqs: [
      { q: "Can I view my security cameras on my phone when I am away?", a: "Yes. Once an active internet connection is available at your site, we configure secure remote monitoring on your iOS or Android mobile device and computer." },
      { q: "Do your cameras work in complete darkness?", a: "Yes. We install cameras with smart infrared (IR) and color-at-night capabilities that capture sharp video even in total darkness." },
      { q: "How long does video footage stay stored?", a: "Storage duration depends on the hard drive capacity, number of cameras, resolution, and recording mode (continuous vs. motion detection). We calculate storage according to your retention requirement (e.g. 14, 30, or 60 days)." },
      { q: "Can you repair or upgrade an existing CCTV system?", a: "Yes. We evaluate existing infrastructure, replace non-functional cameras or power supplies, and upgrade legacy setups to modern high-definition systems." }
    ]
  },
  {
    id: "property-management",
    title: "Property Management",
    shortTitle: "Property Management",
    path: "/services/property-management",
    heroHeadline: "Professional Property Management. Greater Peace of Mind.",
    badge: "Facility Oversight & Maintenance",
    description: "Residential and commercial property management, facility supervision, property maintenance, and tenant support.",
    image: "/images/property.jpg",
    offerings: [
      { title: "Residential Property Management", desc: "Careful oversight of apartments, estates, and private residences to preserve property condition and asset value." },
      { title: "Commercial Facility Supervision", desc: "Operational management for commercial plazas, corporate offices, and mixed-use complexes." },
      { title: "Preventive Maintenance Coordination", desc: "Scheduled servicing of electrical systems, water pumps, generators, plumbing, and structural elements." },
      { title: "Tenant Support & Relations", desc: "Prompt response to tenant repair notices, clear communication, and professional conflict resolution." },
      { title: "Property Inspections & Condition Reports", desc: "Thorough move-in, routine, and move-out inspections with transparent condition reporting." },
      { title: "Vendor & Contractor Supervision", desc: "Vetting, supervising, and signing off on third-party artisans and maintenance contractors." }
    ],
    process: [
      "Initial property intake & physical condition audit",
      "Maintenance schedule & facility protocol establishment",
      "Tenant onboarding & communication channel setup",
      "Routine technical inspections & preventive checks",
      "Rapid resolution of repair and maintenance tickets",
      "Transparent periodic reporting to property owner"
    ],
    faqs: [
      { q: "What types of properties do you manage?", a: "We manage residential properties (single-family homes, residential blocks, estates) as well as commercial buildings (office complexes, commercial retail plazas, light industrial facilities)." },
      { q: "How do you handle urgent repairs?", a: "Because we have in-house electrical, solar, and technical capability, maintenance issues are addressed rapidly by qualified personnel rather than unvetted third parties." },
      { q: "How are property owners kept informed?", a: "We provide structured inspection reports, maintenance logs, and financial accounting for all approved facility repairs." },
      { q: "How do I get started with FLOWNERGY property management?", a: "Contact us with details about your property (location, type, unit count). We will schedule a site walk-through to discuss your management objectives." }
    ]
  }
];

export const PROJECTS_DATA = [
  {
    id: "proj-2",
    title: "15kVA Commercial Solar Backup Solution",
    service: "Solar Energy",
    category: "solar-energy",
    location: "Corporate Facility, Nigeria",
    description: "High-capacity hybrid solar installation equipped with Tier-1 solar panels, smart pure sine wave inverter, and high-cycle lithium battery bank for uninterrupted business continuity.",
    image: "/images/solar.jpg",
    specs: ["15kVA Pure Sine Wave Inverter", "Lithium LiFePO4 Storage", "Monocrystalline Solar PV Array", "Automated Generator Switchover"]
  },
  {
    id: "proj-3",
    title: "Perimeter & Entrance IP Surveillance Network",
    service: "CCTV & Security Systems",
    category: "cctv-security",
    location: "Industrial Facility, Nigeria",
    description: "Installation of high-definition outdoor bullet and PTZ cameras with motorized zoom, perimeter motion detection, night vision, and encrypted remote monitoring.",
    image: "/images/cctv.jpg",
    specs: ["4K & 1080p IP Cameras", "PoE Infrastructure", "Remote Mobile Monitoring", "Surveillance-grade NVR Storage"]
  },
  {
    id: "proj-4",
    title: "Mixed-Use Residential & Commercial Facility Management",
    service: "Property Management",
    category: "property-management",
    location: "Urban Estate, Nigeria",
    description: "Comprehensive facility supervision encompassing routine electrical maintenance, water distribution oversight, tenant support coordination, and regular site condition reporting.",
    image: "/images/property.jpg",
    specs: ["Facility supervision", "Preventive technical maintenance", "Tenant liaison", "Quarterly inspection audits"]
  },
  {
    id: "proj-6",
    title: "5kVA Residential Solar & Lithium Inverter System",
    service: "Solar Energy",
    category: "solar-energy",
    location: "Residential Estate, Nigeria",
    description: "Rooftop solar installation powering essential appliances including lighting, refrigeration, home entertainment, and internet equipment with zero downtime.",
    image: "/images/solar.jpg",
    specs: ["5kVA Hybrid Inverter", "48V 100Ah Lithium Battery", "Rooftop Solar Array", "Zero-switchover time"]
  }
];

export const SECTORS = [
  {
    title: "Residential Properties",
    desc: "Private residences, luxury apartments, and gated estates requiring dependable power, security, and facility upkeep."
  },
  {
    title: "Commercial Buildings",
    desc: "Corporate headquarters, retail shopping complexes, and financial institutions requiring continuous power and safety."
  },
  {
    title: "Offices & Corporate Facilities",
    desc: "Modern office workspaces needing neat cable trunking, server room protection, and monitored access security."
  },
  {
    title: "Retail & Hospitality Properties",
    desc: "Hotels, restaurants, supermarkets, and entertainment venues where uninterrupted power and security are vital."
  },
  {
    title: "Industrial Facilities",
    desc: "Warehouses, logistics depots, and light manufacturing plants demanding heavy-duty electrical and surveillance systems."
  },
  {
    title: "Property Owners & Facility Operators",
    desc: "Landlords and institutional asset owners seeking professional, accountable maintenance and tenant management."
  }
];

export const WORK_PROCESS = [
  {
    step: "01",
    title: "Initial Enquiry",
    desc: "You contact us with your project details, location, and service requirements through our quotation system, phone, or WhatsApp."
  },
  {
    step: "02",
    title: "Requirements Assessment",
    desc: "Our technical team reviews architectural plans or conducts an on-site inspection to calculate precise loads, camera angles, or management needs."
  },
  {
    step: "03",
    title: "Quotation & Planning",
    desc: "We provide a transparent, itemized quotation detailing quality components, timelines, and implementation methodology."
  },
  {
    step: "04",
    title: "Service Delivery or Installation",
    desc: "Our skilled technicians execute the work adhering strictly to safety standards, neat cabling practices, and engineering best practices."
  },
  {
    step: "05",
    title: "Testing, Handover & Support",
    desc: "We conduct rigorous load testing, demonstrate system operation, hand over documentation, and provide ongoing after-sales support."
  }
];
