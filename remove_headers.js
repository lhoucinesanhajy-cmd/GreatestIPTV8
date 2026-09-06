const fs = require('fs');

const files = [
  'pricing.html',
  'reseller.html',
  'installation.html',
  'sports.html',
  'faq.html',
  'contact.html',
  'blog.html',
  'guides.html'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // The regex matches from the comment to the end of the page-header div
    // We use [\s\S]*? to match across newlines lazily
    const regex = /<!-- ===== PAGE HEADER ===== -->[\s\S]*?<div class="page-header">[\s\S]*?<div class="container">[\s\S]*?<h1 class="page-title">.*?<\/h1>[\s\S]*?<div class="breadcrumbs">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*/;
    
    content = content.replace(regex, '');
    fs.writeFileSync(file, content);
    console.log(`Removed page header from ${file}`);
  }
});
