// Bulk Lead Generator Helper
export const generateBulkData = (categoryLabel) => {
  const regions = [
    "Pune, MH", "Mumbai, MH", "CSN, MH", "Ahmednagar, MH", "Kolhapur, MH", 
    "Delhi, NCR", "Bangalore, KA", "Hyderabad, TS", "Chennai, TN", "Kolkata, WB",
    "Ahmedabad, GJ", "Jaipur, RJ", "Gurgaon, HR", "Noida, UP", "Surat, GJ"
  ];
  const prefixes = ["Elite", "Global", "Premier", "National", "Reliable", "Apex", "Modern", "Dynamic", "Future", "Supreme", "Stellar", "Prime", "Universal", "Radiant", "Strategic"];
  const brands = ["Horizon", "Zenith", "Quantum", "Titan", "Orbit", "Vertex", "Solstice", "Matrix", "Prism", "Infinite", "Nova", "Stellar", "Pulsar", "Axis", "Nexus", "Delta", "Sigma", "Alpha"];
  const suffixes = ["Solutions", "Systems", "Infra", "Sourcing", "Group", "Enterprises", "Networks", "Technologies", "Hub", "Dynamics", "Alliance", "Ventures", "Partners"];
  const leads = [];
  
  for (let i = 0; i < 150; i++) {
    const prefix = prefixes[i % prefixes.length];
    const brand = brands[(i + 7) % brands.length];
    const suffix = suffixes[(i * 3) % suffixes.length];
    const region = regions[i % regions.length];
    
    leads.push({
      company: `${brand} ${prefix} ${categoryLabel} ${suffix}`,
      phone: `+91 ${98700 + i} ${10000 + i}`,
      email: `procurement@${brand.toLowerCase()}-${prefix.toLowerCase()}.in`,
      location: `${region}`,
      source: 'Internal Database'
    });
  }
  return leads;
};

// Strategic Leads for Trueview Products
export const FALLBACK_DATA = {
  "cctv": [
    { company: "Reliance Retail Ltd", phone: "1800 889 9999", email: "procurement@reliance.com", location: "Mumbai, MH", source: 'Strategic' },
    { company: "Indigo HQ Security", phone: "0124 435 2500", email: "infra@goindigo.in", location: "Gurgaon, HR", source: 'Strategic' },
    ...generateBulkData("Security Systems")
  ],
  "interactive panel": [
    { company: "Aakash Institute", phone: "1800 102 2727", email: "edu.tech@aakash.ac.in", location: "Delhi, NCR", source: 'Strategic' },
    { company: "BITS Pilani Campus", phone: "01596 242 192", email: "edu.tech@pilani.bits-pilani.ac.in", location: "Pilani/Hyderabad", source: 'Strategic' },
    ...generateBulkData("Educational Tech")
  ],
  "video wall": [
    { company: "PVR Cinemas", phone: "088009 00009", email: "marketing@pvrcinemas.com", location: "Gurgaon, HR", source: 'Strategic' },
    { company: "Delhi Metro DMRC", phone: "011 2341 7910", email: "it.dept@dmrc.org", location: "New Delhi", source: 'Strategic' },
    ...generateBulkData("Digital Signage")
  ],
  "tds meter": [
    { company: "ABC Water Solutions", phone: "9876543210", email: "info@abcwater.com", location: "Pune, MH", source: 'Strategic' },
    { company: "Varroc Waluj MIDC", phone: "0240 665 3103", email: "water.procure@varroc.com", location: "Chh. Sambhaji Nagar", source: 'Strategic' },
    ...generateBulkData("Water Quality")
  ]
};
