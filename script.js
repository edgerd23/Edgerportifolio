/* ============================================================
   EDGER DAWSON — PORTFOLIO SCRIPTS
   script.js
============================================================ */

/* ============================================================
   CUSTOM CURSOR
============================================================ */
(function initCursor() {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
    });

    (function animateCursor() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(animateCursor);
    })();

    const hoverTargets = 'a, button, .project-card, .interest-card, .social-icons a';
    document.querySelectorAll(hoverTargets).forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });

    // Hide cursor on mobile
    if ('ontouchstart' in window) {
        dot.style.display = 'none';
        ring.style.display = 'none';
        document.body.style.cursor = 'auto';
    }
})();


/* ============================================================
   HAMBURGER / MOBILE NAV
============================================================ */
(function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileNav.classList.remove('open');
        });
    });
})();


/* ============================================================
   STICKY HEADER + SCROLL PROGRESS + BACK TO TOP
============================================================ */
(function initScrollUI() {
    const header = document.getElementById('mainHeader');
    const progressBar = document.getElementById('scrollProgress');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;

        if (header) header.classList.toggle('scrolled', scrolled > 20);
        if (progressBar) progressBar.style.width = (scrolled / total * 100) + '%';
        if (backToTop) backToTop.classList.toggle('show', scrolled > 400);
    }, { passive: true });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
})();


/* ============================================================
   ACTIVE NAV LINK HIGHLIGHT ON SCROLL
============================================================ */
(function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#desktopNav ul li a');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));
})();


/* ============================================================
   SCROLL REVEAL ANIMATIONS
============================================================ */
(function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
})();


/* ============================================================
   ANIMATED SKILL BARS
============================================================ */
(function initSkillBars() {
    const fills = document.querySelectorAll('.skill-fill');
    if (!fills.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                // Small delay for visual stagger
                setTimeout(() => {
                    fill.style.width = fill.dataset.width + '%';
                }, 200);
                observer.unobserve(fill);
            }
        });
    }, { threshold: 0.5 });

    fills.forEach(fill => observer.observe(fill));
})();


/* ============================================================
   TYPING ANIMATION
============================================================ */
(function initTypingAnimation() {
    const typingEl = document.getElementById('typingText');
    if (!typingEl) return;

    const roles = [
        'Web Developer',
        'Graphic Designer',
        'Cyber Security Enthusiast',
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let pauseTimer = null;

    const TYPING_SPEED = 80;
    const DELETING_SPEED = 45;
    const PAUSE_AFTER_WORD = 1800;
    const PAUSE_BEFORE_TYPE = 400;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;

        if (!isDeleting && charIndex === currentRole.length) {
            // Finished typing — pause then start deleting
            pauseTimer = setTimeout(() => {
                isDeleting = true;
                type();
            }, PAUSE_AFTER_WORD);
            return;
        }

        if (isDeleting && charIndex === 0) {
            // Finished deleting — move to next role
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = PAUSE_BEFORE_TYPE;
        }

        setTimeout(type, speed);
    }

    // Kick off
    setTimeout(type, 600);
})();


/* ============================================================
   BUTTON RIPPLE EFFECT
============================================================ */
(function initRipple() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const size = Math.max(rect.width, rect.height);
            ripple.style.cssText = `
                width:${size}px;
                height:${size}px;
                left:${e.clientX - rect.left - size / 2}px;
                top:${e.clientY - rect.top - size / 2}px;
            `;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
})();


/* ============================================================
   PROJECT MODAL SYSTEM
============================================================ */
(function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalStack = document.getElementById('modalStack');
    const modalLink = document.getElementById('modalLink');

    if (!modal) return;

    function openModal(card) {
        const title = card.dataset.title || '';
        const desc = card.dataset.desc || '';
        const stack = card.dataset.stack || '';
        const img = card.dataset.img || '';
        const link = card.dataset.link || '#';

        modalImg.src = img;
        modalImg.alt = title;
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modalLink.href = link;

        // Render stack tags
        modalStack.innerHTML = '';
        if (stack) {
            stack.split(',').forEach(tech => {
                const tag = document.createElement('span');
                tag.className = 'tag';
                tag.textContent = tech.trim();
                modalStack.appendChild(tag);
            });
        }

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Open on card click
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => openModal(card));
    });

    // Close on X button
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close on overlay click
    modal.addEventListener('click', e => {
        if (e.target === modal) closeModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal();
    });
})();


/* ============================================================
   CONTACT FORM FEEDBACK
============================================================ */
(function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = this.querySelector('[type="submit"]');
        const original = btn.innerHTML;

        btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        btn.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.4)';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = original;
            btn.style.background = '';
            btn.style.boxShadow = '';
            btn.disabled = false;
            this.reset();
        }, 3500);
    });
})();
