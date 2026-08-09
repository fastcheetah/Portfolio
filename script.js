// ---- typewriter intro ----
(function(){
  const text = "Geraldine Ezeobi";
  const el = document.getElementById('typedName');
  const cursor = document.getElementById('cursor');
  const subtitle = document.getElementById('subtitle');
  const scrollHint = document.getElementById('scrollHint');
  const avatar = document.getElementById('avatar');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let i = 0;

  function typeNext(){
    if(i < text.length){
      el.textContent += text.charAt(i);
      i++;
      setTimeout(typeNext, reduced ? 0 : 75);
    } else {
      setTimeout(function(){
        subtitle.classList.add('show');
        scrollHint.classList.add('show');
      }, 350);
    }
  }

  setTimeout(function(){ avatar.classList.add('show'); }, reduced ? 0 : 150);
  setTimeout(typeNext, reduced ? 0 : 750);
})();

// ---- scrollspy for sidebar nav ----
(function(){
  const links = document.querySelectorAll('nav.toc a');
  const sections = document.querySelectorAll('main section');
  const map = {};
  links.forEach(function(link){
    map[link.getAttribute('href').slice(1)] = link;
  });

  const observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      const link = map[entry.target.id];
      if(!link) return;
      if(entry.isIntersecting){
        links.forEach(function(l){ l.classList.remove('active'); });
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(function(s){ observer.observe(s); });
})();

// ---- West Africa Time date & clock in footer ----
(function(){
  const yearEl = document.getElementById('footerYear');
  const clockEl = document.getElementById('footerClock');
  const timeZone = 'Africa/Lagos'; // WAT, UTC+1, no DST

  const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: timeZone,
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const timeFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  function updateClock(){
    const now = new Date(); // a Date object, rendered in WAT via the formatters above
    const datePart = dateFormatter.format(now);
    const timePart = timeFormatter.format(now);
    yearEl.textContent = now.toLocaleDateString('en-GB', { year: 'numeric', timeZone: timeZone });
    clockEl.innerHTML = datePart + ' · ' + timePart + '<span class="tz">WAT</span>';
  }

  updateClock();
  setInterval(updateClock, 1000);
})();