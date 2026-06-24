// ── Hero image rotator ──────────────────────────────────────────────
const mobileImages = [
    './images/install-detail-p.jpg',
    './images/cubes-cover.jpg',
    './images/shapeof-cover2.png',
    './images/alacart-cover.png',
    './images/theweaving-open.jpg',
    './images/bumi-cover-m.png',
];

const desktopImages = [
    './images/install-detail-h.jpg',
    './images/cubes-cover.jpg',
    './images/shapeof-cover2.png',
    './images/theweaving-open.jpg',
    './images/bumi-identityspread.jpg',
    './images/alacart-diecut.jpg',
    './images/hermeswstwindow2.jpg',
    './images/milklife-shelf.png',
];

const mobileImg = document.querySelector('.HomeLanding-module-scss-module__LwAsna__MOBILE');
const desktopImg = document.querySelector('.HomeLanding-module-scss-module__LwAsna__DESKTOP');

if (mobileImg && desktopImg) {
    let currentIndex = Math.floor(Math.random() * mobileImages.length);
    mobileImg.src = mobileImages[currentIndex];
    desktopImg.src = desktopImages[currentIndex];

    setInterval(() => {
        currentIndex = (currentIndex + 1) % mobileImages.length;
        mobileImg.src = mobileImages[currentIndex];
        desktopImg.src = desktopImages[currentIndex];
    }, 2100);
}

        // ── Cursor trail (desktop only) ─────────────────────────────────────
        if (window.innerWidth > 1024) (function () {
            const seedImages = [
                './images/seed1.png',
                './images/seed2.png',
                './images/seed3.png',
                './images/seed4.png',
                './images/seed5.png',
            ];

            const seedImgEls = seedImages.map(src => {
                const img = new Image();
                img.src = src;
                return img;
            });

            const canvas = document.getElementById('cursor-trail-canvas');
            const ctx = canvas.getContext('2d');
            const dot = document.getElementById('cursor-dot');

            dot.style.display = 'none';

            // Apply cursor to everything
            // Remove old cursorStyle if it exists, then re-inject at end of head
            const cursorStyle = document.createElement('style');
            document.head.appendChild(cursorStyle); // append LAST so it wins specificity

            const pomImg = new Image();
            pomImg.onload = () => {
                const c = document.createElement('canvas');
                c.width = c.height = 44;
                c.getContext('2d').drawImage(pomImg, 0, 0, 44, 44);
                const dataURL = c.toDataURL('image/png');

                const css = `
    html, body, *, *::before, *::after {
      cursor: url('${dataURL}') 16 16, auto !important;
    }
  `;
                cursorStyle.textContent = css;

                // Also set directly on every interactive element
                document.querySelectorAll('a, button, [role="button"], input, select, textarea, label, [onclick], [tabindex]')
                    .forEach(el => {
                        el.style.setProperty('cursor', `url('${dataURL}') 16 16, pointer`, 'important');
                    });
            };
            pomImg.src = './images/pomegranate.png';
            document.head.appendChild(cursorStyle);

            let particles = [];
            let mouse = { x: -999, y: -999 };
            let lastX = -999, lastY = -999, spawnAccum = 0;

            function resize() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            resize();
            window.addEventListener('resize', resize);

            class Particle {
                constructor(x, y) {
                    this.x = x;
                    this.y = y;
                    this.img = seedImgEls[Math.floor(Math.random() * seedImgEls.length)];
                    this.size = 10 + Math.random() * 10;
                    this.vx = (Math.random() - 0.5) * 0.8;
                    this.vy = -0.6 - Math.random() * 0.6;
                    this.gravity = 0.018;
                    this.rotation = Math.random() * Math.PI * 2;
                    this.rotationSpeed = (Math.random() - 0.5) * 0.05;
                    this.life = 0;
                    this.maxLife = 55 + Math.random() * 40;
                }
                update() {
                    this.vy += this.gravity;
                    this.x += this.vx;
                    this.y += this.vy;
                    this.rotation += this.rotationSpeed;
                    this.life++;
                }
                draw() {
                    if (!this.img.complete) return;
                    const t = this.life / this.maxLife;
                    // ease-in fade: hold opacity longer, then soften out
                    const alpha = t < 0.6 ? 1 - t * 0.3 : (1 - t) / 0.4 * 0.82;
                    ctx.save();
                    ctx.globalAlpha = Math.max(0, alpha);
                    ctx.translate(this.x, this.y);
                    ctx.rotate(this.rotation);
                    ctx.drawImage(this.img, -this.size / 2, -this.size / 2, this.size, this.size);
                    ctx.restore();
                }
            }

            document.addEventListener('mousemove', (e) => {
                const prevX = lastX === -999 ? e.clientX : lastX;
                const prevY = lastY === -999 ? e.clientY : lastY;
                mouse.x = e.clientX;
                mouse.y = e.clientY;

                const dx = mouse.x - prevX, dy = mouse.y - prevY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                spawnAccum += dist;

                // Interpolate spawn positions along the mouse path for even spacing
                let spawned = 0;
                while (spawnAccum > 14) {
                    const t = dist > 0 ? Math.min((spawned * 14) / dist, 1) : 1;
                    particles.push(new Particle(prevX + dx * t, prevY + dy * t));
                    spawnAccum -= 14;
                    spawned++;
                }
                lastX = mouse.x;
                lastY = mouse.y;
            });

            function loop() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles = particles.filter(p => p.life < p.maxLife);
                for (const p of particles) { p.update(); p.draw(); }
                requestAnimationFrame(loop);
            }
            loop();
        })();

        function initNav() {
            document.querySelectorAll('.HeaderLayout-module-scss-module__x_kloq__button').forEach(function (btn) {
                btn.addEventListener('click', function (e) {
                    if (window.innerWidth > 1024) return;
                    const menu = btn.closest('.HeaderLayout-module-scss-module__x_kloq__menu');
                    if (!menu) return;
                    const submenu = menu.querySelector('.HeaderLayout-module-scss-module__x_kloq__submenu');
                    if (!submenu) return;
                    e.preventDefault();

                    const opening = !menu.classList.contains('is-open');
                    menu.classList.toggle('is-open');

                    if (opening) {
                        submenu.style.height = 'auto';
                        submenu.style.overflow = 'visible';
                    } else {
                        submenu.style.height = '';
                        submenu.style.overflow = '';
                    }
                });
            });
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initNav);
        } else {
            initNav();
        }