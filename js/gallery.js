// ── Add your files here ──
// type: 'photo' or 'video'
var media = [
  { type: 'photo', src: 'photos/S__36061195_0.jpg' },
  { type: 'photo', src: 'photos/S__36061196_0.jpg' },
  { type: 'photo', src: 'photos/S__36061197_0.jpg' },
  { type: 'photo', src: 'photos/S__36061200.jpg' },
  { type: 'photo', src: 'photos/S__36061203_0.jpg' },
  { type: 'photo', src: 'photos/S__36061204_0.jpg' },
  { type: 'photo', src: 'photos/S__36061205_0.jpg' },
  { type: 'photo', src: 'photos/S__36061206.jpg' },
  { type: 'video', src: 'photos/วิดิโอ.mp4' },
];

// ── Lightbox ──
function openLightbox(item) {
  var lb  = document.getElementById('lightbox');
  var img = document.getElementById('lightbox-img');
  var vid = document.getElementById('lightbox-vid');
  img.style.display = 'none';
  vid.style.display = 'none';
  if (item.type === 'video') {
    vid.src = item.src; vid.style.display = 'block'; vid.play();
  } else {
    img.src = item.src; img.style.display = 'block';
  }
  lb.classList.add('open');
}

function closeLightbox() {
  var lb  = document.getElementById('lightbox');
  var vid = document.getElementById('lightbox-vid');
  lb.classList.remove('open');
  vid.pause(); vid.src = '';
}

function injectLightbox() {
  var lb = document.createElement('div');
  lb.id  = 'lightbox';
  lb.innerHTML =
    '<span id="lightbox-close" onclick="closeLightbox()">&times;</span>' +
    '<img id="lightbox-img" src="" alt="" style="display:none"/>' +
    '<video id="lightbox-vid" src="" controls style="display:none;max-width:90vw;max-height:85vh;border-radius:16px"></video>';
  lb.addEventListener('click', function(e) { if (e.target === lb) closeLightbox(); });
  document.body.appendChild(lb);
}

// ── Gallery grid ──
function renderGallery() {
  var grid = document.getElementById('gallery-grid');
  if (!grid) return;

  if (media.length === 0) {
    grid.innerHTML = '<p style="text-align:center;opacity:0.5;grid-column:1/-1">เพิ่มรูปภาพหรือวิดีโอใน js/gallery.js</p>';
    return;
  }

  grid.innerHTML = media.map(function(item, i) {
    if (item.type === 'video') {
      return '<div class="gallery-video-wrap" onclick="openLightbox(media[' + i + '])">' +
        '<video src="' + item.src + '" muted playsinline preload="metadata" class="gallery-thumb-vid"></video>' +
        '<span class="play-icon">&#9654;</span></div>';
    }
    return '<img src="' + item.src + '" alt="wedding photo" loading="lazy" onclick="openLightbox(media[' + i + '])">';
  }).join('');
}

document.addEventListener('DOMContentLoaded', function() {
  injectLightbox();
  renderGallery();
  var photoSrcs = media.filter(function(m) { return m.type === 'photo'; }).map(function(m) { return m.src; });
  if (typeof initHeroSlider === 'function') initHeroSlider(photoSrcs);
});
