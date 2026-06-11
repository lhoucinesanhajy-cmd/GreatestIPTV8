const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// The common top part: everything before <!-- ===== HERO ===== --> 
// Wait, index.html might have been modified by the first script.
// Let's rely on reading one of the generated files to get topPart and bottomPart, or read index.html and split at <!-- ===== HERO ===== -->
const topPart = html.substring(0, html.indexOf('<!-- ===== HERO ===== -->'));
const bottomPart = html.substring(html.indexOf('<!-- ===== FOOTER ===== -->'));

function generatePage(title, breadcrumbName, content) {
    const modifiedTop = topPart.replace(/<title>.*<\/title>/, `<title>${title} | FreeGoTV</title>`);
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

const blogContent = `
<section class="blog-section">
  <div class="container">
    <div class="grid-3">
      <article class="article-card">
        <img src="https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=600&auto=format&fit=crop" alt="TV watching" class="article-img">
        <div class="article-content">
          <div class="article-meta">News • June 10, 2026</div>
          <h3 class="article-title">The Future of IPTV Streaming in 2026</h3>
          <p class="article-excerpt">Discover how new streaming technologies are changing the way we consume live sports and movies directly from our living rooms.</p>
          <a href="#" class="read-more">Read Full Article →</a>
        </div>
      </article>
      <article class="article-card">
        <img src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=600&auto=format&fit=crop" alt="Camera lens" class="article-img">
        <div class="article-content">
          <div class="article-meta">Guide • June 5, 2026</div>
          <h3 class="article-title">Top 5 Devices for Cord Cutters</h3>
          <p class="article-excerpt">A comprehensive comparison of the best streaming boxes, sticks, and smart TVs to get the most out of your subscription.</p>
          <a href="#" class="read-more">Read Full Article →</a>
        </div>
      </article>
      <article class="article-card">
        <img src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=600&auto=format&fit=crop" alt="Movie theater" class="article-img">
        <div class="article-content">
          <div class="article-meta">Tips • May 28, 2026</div>
          <h3 class="article-title">How to Fix Buffering Issues</h3>
          <p class="article-excerpt">Experiencing lag? Follow these simple troubleshooting steps to optimize your network and enjoy uninterrupted 4K streaming.</p>
          <a href="#" class="read-more">Read Full Article →</a>
        </div>
      </article>
    </div>
  </div>
</section>
`;

const guidesContent = `
<section class="guides-section">
  <div class="container">
    <div class="grid-3">
      <article class="article-card">
        <div class="article-content" style="padding-top: 40px;">
          <div class="article-meta">Setup Guide</div>
          <h3 class="article-title">Amazon Fire TV Stick</h3>
          <p class="article-excerpt">Step-by-step instructions on how to install and configure our app on your Amazon Fire TV or Fire Stick.</p>
          <a href="#" class="read-more">View Guide →</a>
        </div>
      </article>
      <article class="article-card">
        <div class="article-content" style="padding-top: 40px;">
          <div class="article-meta">Setup Guide</div>
          <h3 class="article-title">Apple TV & iOS</h3>
          <p class="article-excerpt">Learn how to download and set up the best compatible streaming apps on your Apple TV, iPhone, or iPad.</p>
          <a href="#" class="read-more">View Guide →</a>
        </div>
      </article>
      <article class="article-card">
        <div class="article-content" style="padding-top: 40px;">
          <div class="article-meta">Setup Guide</div>
          <h3 class="article-title">Android TV / Smart TV</h3>
          <p class="article-excerpt">Easily install our service on any Android-based TV, Samsung Smart TV, or LG webOS with this guide.</p>
          <a href="#" class="read-more">View Guide →</a>
        </div>
      </article>
    </div>
  </div>
</section>
`;

fs.writeFileSync('blog.html', generatePage('Blog & News', 'Blog', blogContent));
fs.writeFileSync('guides.html', generatePage('IPTV Setup Guides', 'IPTV Guides', guidesContent));

console.log('Blog and Guides generated!');
