// Main JS: hamburger, access control, placeholder intercept, reveal, testimonials
document.addEventListener('DOMContentLoaded', function(){
  // make images lazy if not set
  document.querySelectorAll('img:not([loading])').forEach(img=>img.setAttribute('loading','lazy'));

  // hamburger menu
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav.main-nav');
  if(toggle && nav){
    toggle.addEventListener('click', ()=>{
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
    // close when clicking a link
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>nav.classList.remove('open')));
  }

  // Mantener comportamiento de acceso restringido
  (function(){
    const accessBtn = document.getElementById('boton');
    if(accessBtn){
      accessBtn.addEventListener('click', function(e){
        const pw = prompt('Escribe la contraseña');
        if(pw === 'delta.99'){
          alert('Contraseña correcta. Bienvenido.');
          window.location.href = 'lehak.html';
        } else {
          alert('Lo siento, no puedes pasar');
        }
      });
    }
  })();

  // seguridad: rel noopener para links target=_blank
  document.querySelectorAll('a[target="_blank"]').forEach(a=>{
    const rel = a.getAttribute('rel') || '';
    if(!/noopener/i.test(rel)) rel += ' noopener noreferrer';
    a.setAttribute('rel', rel.trim());
  });

  // Interceptar placeholder links
  (function(){
    const anchors = document.querySelectorAll('a[href]');
    anchors.forEach(a => {
      const href = a.getAttribute('href').trim();
      const isPlaceholder = href === '#' || href === '' || href.toLowerCase().startsWith('javascript:') || (!href.includes('.') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('https://') && !href.startsWith('http://'));
      if(isPlaceholder){
        if(a.hasAttribute('data-preserve')) return;
        a.addEventListener('click', function(e){
          e.preventDefault();
          alert('Estamos trabajando en esta seccion');
        });
      }
    });
  })();

  // reveal on scroll
  (function(){
    const reveals = document.querySelectorAll('.reveal');
    if('IntersectionObserver' in window){
      const io = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
          if(e.isIntersecting){
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },{threshold:0.12});
      reveals.forEach(r=>io.observe(r));
    } else {
      reveals.forEach(r=>r.classList.add('visible'));
    }
  })();

  // Testimonials carousel
  (function(){
    const track = document.getElementById('testimonialTrack');
    const dots = Array.from(document.querySelectorAll('#testControls .dot'));
    if(!track || !dots.length) return;

    const total = track.children.length;
    let index = 0;
    let width = track.children[0].offsetWidth + 18; // gap

    function update(){
      track.style.transform = `translateX(${-(width * index)}px)`;
      dots.forEach(d=>d.classList.remove('active'));
      const active = dots[index % total];
      if(active) active.classList.add('active');
    }

    window.addEventListener('resize', ()=>{
      width = track.children[0].offsetWidth + 18;
      update();
    });

    dots.forEach(d=>d.addEventListener('click', ()=>{
      index = Number(d.getAttribute('data-index')) || 0;
      update();
    }));

    let timer = setInterval(()=>{
      index = (index + 1) % total;
      update();
    }, 4500);

    track.addEventListener('mouseenter', ()=>clearInterval(timer));
    track.addEventListener('mouseleave', ()=>{ timer = setInterval(()=>{ index = (index + 1) % total; update(); }, 4500); });

    setTimeout(update, 60);
  })();

});
