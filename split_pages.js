const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// The common top part: everything before <!-- ===== HERO ===== -->
const topPart = html.substring(0, html.indexOf('<!-- ===== HERO ===== -->'));

// The common bottom part: everything from <!-- ===== FOOTER ===== -->
const bottomPart = html.substring(html.indexOf('<!-- ===== FOOTER ===== -->'));

// A helper function to extract a section
function extractSection(startComment, endComment) {
    const startIdx = html.indexOf(startComment);
    if (startIdx === -1) return '';
    let endIdx = -1;
    if (endComment) {
        endIdx = html.indexOf(endComment);
    } else {
        // If no end comment, we assume it's the next section comment
        const nextCommentIdx = html.indexOf('<!-- =====', startIdx + 10);
        endIdx = nextCommentIdx !== -1 ? nextCommentIdx : html.indexOf('<!-- ===== FOOTER');
    }
    if (endIdx === -1) endIdx = html.length;
    return html.substring(startIdx, endIdx);
}

// Extract sections
const hero = extractSection('<!-- ===== HERO ===== -->', '<!-- ===== DEVICE BRANDS ===== -->');
const devices = extractSection('<!-- ===== DEVICE BRANDS ===== -->', '<!-- ===== FEATURES ===== -->');
const features = extractSection('<!-- ===== FEATURES ===== -->', '<!-- ===== CHECKLIST FEATURES ===== -->');
const checklist = extractSection('<!-- ===== CHECKLIST FEATURES ===== -->', '<!-- ===== PRICING ===== -->');
const pricing = extractSection('<!-- ===== PRICING ===== -->', '<!-- ===== HOW IT WORKS ===== -->');
const installation = extractSection('<!-- ===== HOW IT WORKS ===== -->', '<!-- ===== RESELLER ===== -->');
const reseller = extractSection('<!-- ===== RESELLER ===== -->', '<!-- ===== LIVE SPORTS ===== -->');
const sports = extractSection('<!-- ===== LIVE SPORTS ===== -->', '<!-- ===== TESTIMONIALS ===== -->');
const testimonials = extractSection('<!-- ===== TESTIMONIALS ===== -->', '<!-- ===== FAQ ===== -->');
const faq = extractSection('<!-- ===== FAQ ===== -->', '<!-- ===== CONTACT ===== -->');
const contact = extractSection('<!-- ===== CONTACT ===== -->', '<!-- ===== FOOTER ===== -->');

function generatePage(title, breadcrumbName, content) {
    const modifiedTop = topPart.replace('<title>FreeGoTV – Best IPTV Service Provider 2026 | freego-tv.online</title>', `<title>${title} | FreeGoTV</title>`);
    const breadcrumbHtml = `
<!-- ===== PAGE HEADER ===== -->
<div class="page-header">
  <div class="container">
    <h1 class="page-title">${breadcrumbName}</h1>
    <div class="breadcrumbs">
      <a href="index.html">Home</a>
      <span class="sep">/</span>
      <span class="current">${breadcrumbName}</span>
    </div>
  </div>
</div>
`;
    return modifiedTop + breadcrumbHtml + content + bottomPart;
}

// 1. Write index.html (only keep home-related sections)
const indexContent = topPart + hero + devices + features + checklist + testimonials + bottomPart;
fs.writeFileSync('index.html', indexContent);

// 2. Write pricing.html
fs.writeFileSync('pricing.html', generatePage('Pricing Plans', 'Pricing', pricing));

// 3. Write installation.html
fs.writeFileSync('installation.html', generatePage('Installation Guide', 'Installation', installation));

// 4. Write reseller.html
fs.writeFileSync('reseller.html', generatePage('Reseller Program', 'Reseller', reseller));

// 5. Write sports.html
fs.writeFileSync('sports.html', generatePage('Live Sports', 'Sports', sports));

// 6. Write faq.html
fs.writeFileSync('faq.html', generatePage('Frequently Asked Questions', 'FAQ', faq));

// 7. Write contact.html
fs.writeFileSync('contact.html', generatePage('Contact Us', 'Contact Us', contact));

console.log('Core pages generated successfully!');
