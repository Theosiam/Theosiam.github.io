/* ============================================================
   Theofanis Siamatras — Portfolio
   main.js — Typing, Scroll, Nav, Reveal, Particles
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initNavbar();
    initScrollReveal();
    initActiveNavOnScroll();
    initEmailCopy();
    initParticles();
});

/* ----- 1. Terminal Typing Effect ----- */
function initTypingEffect() {
    const el = document.getElementById('typing-text');
    if (!el) return;

    const phrases = [
        'Computer Vision',
        'Edge AI Deployment',
        'Driver Monitoring Systems',
        'Multimodal Fusion',
        'AI Security / IDS'
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typeSpeed = 60;
    const deleteSpeed = 30;
    const pauseAfterType = 1800;
    const pauseAfterDelete = 400;

    function type() {
        const current = phrases[phraseIdx];

        if (isDeleting) {
            el.textContent = current.substring(0, charIdx - 1);
            charIdx--;
        } else {
            el.textContent = current.substring(0, charIdx + 1);
            charIdx++;
        }

        let delay;

        if (!isDeleting && charIdx === current.length) {
            // Finished typing — pause then start deleting
            delay = pauseAfterType;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            // Finished deleting — move to next phrase
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            delay = pauseAfterDelete;
        } else {
            delay = isDeleting ? deleteSpeed : typeSpeed;
        }

        setTimeout(type, delay);
    }

    setTimeout(type, 600);
}

/* ----- 2. Navbar ----- */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    if (!navbar || !toggle || !links) return;

    // Mobile menu toggle
    toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !expanded);
        links.classList.toggle('open');
        document.body.style.overflow = expanded ? '' : 'hidden';
    });

    // Close menu on link click (mobile)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            links.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Add scrolled class on scroll
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
}

/* ----- 3. Scroll Reveal (IntersectionObserver) ----- */
function initScrollReveal() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ----- 4. Active Nav on Scroll ----- */
function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    if (sections.length === 0 || navItems.length === 0) return;

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    });
}

/* ----- 5. Email Copy to Clipboard ----- */
function initEmailCopy() {
    const btn = document.getElementById('copy-email');
    const toast = document.getElementById('copy-toast');
    if (!btn || !toast) return;

    const email = 'th.siamatras@gmail.com';

    btn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(email);
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        } catch {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = email;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        }
    });
}

/* ----- 6. Particle Background (Hero) ----- */
function initParticles() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    hero.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    const maxParticles = 45;

    function resize() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.8 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 229, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.strokeStyle = `rgba(0, 229, 255, ${0.04 * (1 - dist / 130)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        connectParticles();
        requestAnimationFrame(animate);
    }

    // Respect reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        animate();
    }
}
