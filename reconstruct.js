const fs = require('fs');

function extractContent(filename) {
    const html = fs.readFileSync(filename, 'utf8');
    const headerEndIdx = html.indexOf('</div>\n</div>\n', html.indexOf('<!-- ===== PAGE HEADER ===== -->'));
    if (headerEndIdx === -1) return '';
    const startIdx = headerEndIdx + 15; // length of '</div>\n</div>\n'
    const endIdx = html.indexOf('<!-- ===== FOOTER ===== -->');
    if (endIdx === -1) return '';
    return html.substring(startIdx, endIdx);
}

const pricing = extractContent('pricing.html');
const installation = extractContent('installation.html');
const reseller = extractContent('reseller.html');
const sports = extractContent('sports.html');
const faq = extractContent('faq.html');
const contact = extractContent('contact.html');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// The current index.html has:
// Hero, Devices, Features, Checklist, Testimonials
// I need to find where to insert the sections to match the original order:
// Hero -> Devices -> Features -> Checklist -> Pricing -> Installation -> Reseller -> Sports -> Testimonials -> FAQ -> Contact

const checklistIdx = indexHtml.indexOf('<!-- ===== TESTIMONIALS ===== -->');
const topPart = indexHtml.substring(0, checklistIdx);

const testimonialsIdx = indexHtml.indexOf('<!-- ===== TESTIMONIALS ===== -->');
let testimonialsEndIdx = indexHtml.indexOf('<!-- ===== FOOTER ===== -->');
const testimonials = indexHtml.substring(testimonialsIdx, testimonialsEndIdx);

const bottomPart = indexHtml.substring(testimonialsEndIdx);

// Construct new index
const newIndex = topPart +
    pricing +
    installation +
    reseller +
    sports +
    testimonials +
    faq +
    contact +
    bottomPart;

fs.writeFileSync('index.html', newIndex);
console.log('index.html reconstructed successfully!');
