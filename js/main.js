// ════════════════════════════════
//  EDIT YOUR WEDDING DETAILS HERE
// ════════════════════════════════

var WEDDING_DATE = new Date('2026-10-10T10:00:00');

var story = [
  { year: '2022', title: 'พบกันครั้งแรก',      text: 'เราพบกันและเริ่มต้นมิตรภาพที่แสนพิเศษ' },
  { year: '2023', title: 'เริ่มต้นความสัมพันธ์', text: 'ก้าวสู่ความรักที่งดงาม' },
  { year: '2025', title: 'ขอแต่งงาน',           text: 'วันที่เราตัดสินใจร่วมชีวิตไปด้วยกัน' },
  { year: '2026', title: 'วันแต่งงาน',           text: '๑๐ ตุลาคม ๒๕๖๙ — วันที่เราจะจดจำตลอดไป' },
];

var schedule = [
  { time: '09:00', title: 'ลงทะเบียนแขก',          note: 'ห้องโถงชั้น 1' },
  { time: '10:00', title: 'พิธีแต่งงาน',            note: 'ห้องจัดงานหลัก' },
  { time: '11:30', title: 'ถ่ายภาพหมู่',            note: 'สวนด้านนอก' },
  { time: '12:00', title: 'งานเลี้ยงอาหารกลางวัน', note: 'ห้องอาหาร' },
  { time: '14:00', title: 'เค้กแต่งงาน',            note: '' },
  { time: '15:00', title: 'เสร็จสิ้นงาน',            note: '' },
];

var dressPalette = [
  { color: '#e8b84b', name: 'เหลือง' },
  { color: '#e8956d', name: 'พีช' },
  { color: '#f5f0e8', name: 'ครีม' },
  { color: '#8baed4', name: 'ฟ้าอ่อน' },
];

var venue = {
  name:      'Rim Thara (ริมธารา)',
  address:   'บางโพงพาง ยานนาวา กรุงเทพมหานคร 10120',
  mapLink:   'https://www.google.com/maps/place/Rim+Thara/@13.6719926,100.5442374,17z',
  iframeSrc: 'https://maps.google.com/maps?q=13.6719926,100.5442374&z=16&output=embed',
};

var hotels = [
  { name: 'โรงแรม A', note: '5 นาทีจากสถานที่จัดงาน',  link: '#' },
  { name: 'โรงแรม B', note: '10 นาทีจากสถานที่จัดงาน', link: '#' },
  { name: 'โรงแรม C', note: '15 นาทีจากสถานที่จัดงาน', link: '#' },
];

var contacts = [
  { role: 'เจ้าสาว', name: 'อิศราภรณ์ ตันติอมรพงษ์', phone: '095-828-6394', line: '' },
  { role: 'เจ้าบ่าว', name: 'วัชรกร โตเจริญ',        phone: '080-942-3285', line: '' },
];

var giftBank = 'ธนาคาร: —<br/>ชื่อบัญชี: —<br/>เลขบัญชี: —';

// ════════════════════════════════
//  RENDER FUNCTIONS
// ════════════════════════════════

function updateCountdown() {
  var diff = WEDDING_DATE - new Date();
  if (diff <= 0) {
    ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(function(id){ document.getElementById(id).textContent='0'; });
    return;
  }
  document.getElementById('cd-days').textContent  = Math.floor(diff / 86400000);
  document.getElementById('cd-hours').textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2,'0');
  document.getElementById('cd-mins').textContent  = String(Math.floor((diff % 3600000)  / 60000)).padStart(2,'0');
  document.getElementById('cd-secs').textContent  = String(Math.floor((diff % 60000)    / 1000)).padStart(2,'0');
}

function renderStory() {
  var el = document.getElementById('story-timeline');
  if (!el) return;
  el.innerHTML = story.map(function(s) {
    return '<div class="story-item">' +
      '<span class="story-year">' + s.year + '</span>' +
      '<span class="story-dot"></span>' +
      '<div class="story-body"><strong>' + s.title + '</strong><p>' + s.text + '</p></div>' +
      '</div>';
  }).join('');
}

function renderSchedule() {
  var ul = document.getElementById('timeline');
  if (!ul) return;
  ul.innerHTML = schedule.map(function(item) {
    return '<li><span class="tl-time">' + item.time + '</span><span class="tl-dot"></span>' +
      '<span class="tl-text"><strong>' + item.title + '</strong>' +
      (item.note ? '<span>' + item.note + '</span>' : '') + '</span></li>';
  }).join('');
}

function renderDress() {
  var el = document.getElementById('dress-palette');
  if (!el) return;
  el.innerHTML = dressPalette.map(function(s) {
    return '<div class="swatch" style="background:' + s.color + '"></div>';
  }).join('');

  // insert label row after palette bar
  var labelRow = document.createElement('div');
  labelRow.className = 'swatch-label';
  labelRow.innerHTML = dressPalette.map(function(s) {
    return '<span>' + s.name + '</span>';
  }).join('');
  el.insertAdjacentElement('afterend', labelRow);
}

function renderVenue() {
  var n = document.getElementById('venue-name');
  var a = document.getElementById('venue-address');
  var l = document.getElementById('venue-map-link');
  var f = document.getElementById('venue-iframe');
  if (n) n.textContent = venue.name;
  if (a) a.textContent = venue.address;
  if (l) l.href = venue.mapLink;
  if (f && venue.iframeSrc) f.src = venue.iframeSrc;
}

function renderHotels() {
  var el = document.getElementById('hotel-grid');
  if (!el) return;
  el.innerHTML = hotels.map(function(h) {
    return '<div class="hotel-card"><h3>' + h.name + '</h3><p>' + h.note + '</p>' +
      '<a href="' + h.link + '" target="_blank">ดูรายละเอียด</a></div>';
  }).join('');
}

function renderContacts() {
  var el = document.getElementById('venue-contacts');
  if (!el) return;
  el.innerHTML = contacts.map(function(c) {
    return '<div class="venue-contact-item">' +
      '<span class="vc-role">' + c.role + '</span>' +
      '<span class="vc-name">' + c.name + '</span>' +
      (c.phone ? '<a href="tel:' + c.phone.replace(/-/g,'') + '">📞 ' + c.phone + '</a>' : '') +
      (c.line  ? ' <a href="#">LINE: ' + c.line + '</a>' : '') +
      '</div>';
  }).join('');
}

function renderGiftBank() {
  var el = document.getElementById('gift-bank');
  if (el) el.innerHTML = giftBank;
}

function initNavToggle() {
  var btn   = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', function() { links.classList.toggle('open'); });
  links.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() { links.classList.remove('open'); });
  });
}

// ── Hero Slideshow ──
function initHeroSlider(photos) {
  var track  = document.getElementById('slide-track');
  var dotsEl = document.getElementById('slide-dots');
  if (!track || photos.length === 0) return;

  var current = 0;
  var slides  = [];
  var dots    = [];
  var timer;

  photos.forEach(function(src, i) {
    var div = document.createElement('div');
    div.className = 'slide' + (i === 0 ? ' active' : '');
    var img = document.createElement('img');
    img.src = src; img.alt = '';
    div.appendChild(img);
    track.appendChild(div);
    slides.push(div);

    var dot = document.createElement('button');
    dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', function() { goTo(i); });
    dotsEl.appendChild(dot);
    dots.push(dot);
  });

  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(function() { goTo(current + 1); }, 5000);
  }

  document.getElementById('slide-prev').addEventListener('click', function() { goTo(current - 1); });
  document.getElementById('slide-next').addEventListener('click', function() { goTo(current + 1); });
  resetTimer();
}

// ── Featured Slideshow ──
function initFeaturedSlider(mediaItems) {
  var track  = document.getElementById('featured-track');
  var dotsEl = document.getElementById('feat-dots');
  if (!track) return;

  var current = 0;
  var dots    = [];
  var timer;

  mediaItems.forEach(function(item, i) {
    var div = document.createElement('div');
    div.className = 'feat-slide';
    if (item.type === 'video') {
      var vid = document.createElement('video');
      vid.src = item.src; vid.muted = true; vid.loop = true; vid.playsinline = true; vid.autoplay = true;
      div.appendChild(vid);
    } else {
      var img = document.createElement('img');
      img.src = item.src; img.alt = '';
      div.appendChild(img);
    }
    track.appendChild(div);

    var dot = document.createElement('button');
    dot.className = 'feat-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', function() { goTo(i); });
    dotsEl.appendChild(dot);
    dots.push(dot);
  });

  function goTo(n) {
    dots[current].classList.remove('active');
    current = (n + mediaItems.length) % mediaItems.length;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dots[current].classList.add('active');
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(function() { goTo(current + 1); }, 4500);
  }

  document.getElementById('feat-prev').addEventListener('click', function() { goTo(current - 1); });
  document.getElementById('feat-next').addEventListener('click', function() { goTo(current + 1); });
  resetTimer();
}

function initMusic() {
  var audio     = document.getElementById('bg-music');
  var btn       = document.getElementById('music-btn');
  if (!audio || !btn) return;

  var HOOK_TIME = 47; // seconds — "Oh, I was cursed with love" chorus
  var playing   = false;

  audio.addEventListener('loadedmetadata', function() {
    audio.currentTime = HOOK_TIME;
  });

  // loop back to hook instead of start
  audio.addEventListener('timeupdate', function() {
    if (audio.duration && audio.currentTime >= audio.duration - 0.3) {
      audio.currentTime = HOOK_TIME;
    }
  });

  function tryPlay() {
    audio.play().then(function() {
      playing = true;
      btn.classList.remove('paused');
      btn.title = 'ปิดเพลง';
    }).catch(function() {
      playing = false;
    });
  }

  // start on first touch/click anywhere
  function onFirstInteraction() {
    tryPlay();
    document.removeEventListener('click',     onFirstInteraction);
    document.removeEventListener('touchstart', onFirstInteraction);
  }
  document.addEventListener('click',     onFirstInteraction);
  document.addEventListener('touchstart', onFirstInteraction);

  // toggle button
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    if (playing) {
      audio.pause();
      playing = false;
      btn.classList.add('paused');
      btn.title = 'เปิดเพลง';
    } else {
      tryPlay();
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  renderStory();
  renderSchedule();
  renderDress();
  renderVenue();
  renderHotels();
  renderContacts();
  renderGiftBank();
  initNavToggle();
  initMusic();
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
