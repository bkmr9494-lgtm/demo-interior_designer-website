/* =============================================
   AG ARCHITECTS - MAIN JAVASCRIPT
   ============================================= */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initPreloader();
    initNavigation();
    initCounters();
    initPortfolioFilter();
    initBeforeAfterSlider();
    initSwipers();
    initFAQ();
    initLightbox();
    initBackToTop();
    initContactForm();
    initGSAPAnimations();
    initAOS();
});

/* =============================================
   PRELOADER
   ============================================= */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('loaded');
        }, 500);
    });
}

/* =============================================
   NAVIGATION
   ============================================= */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

/* =============================================
   ANIMATED COUNTERS
   ============================================= */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let countersStarted = false;
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Intersection Observer for counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                countersStarted = true;
                counters.forEach(counter => animateCounter(counter));
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

/* =============================================
   PORTFOLIO FILTER
   ============================================= */
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

/* =============================================
   BEFORE/AFTER SLIDER
   ============================================= */
function initBeforeAfterSlider() {
    const slider = document.querySelector('.ba-slider');
    if (!slider) return;
    
    const beforeImage = slider.querySelector('.ba-before');
    const handle = slider.querySelector('.ba-handle');
    let isDragging = false;
    
    function updateSlider(x) {
        const rect = slider.getBoundingClientRect();
        let position = (x - rect.left) / rect.width * 100;
        
        position = Math.max(0, Math.min(100, position));
        
        beforeImage.style.width = position + '%';
        handle.style.left = position + '%';
    }
    
    // Mouse events
    handle.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', (e) => {
        if (isDragging) updateSlider(e.clientX);
    });
    
    // Touch events
    handle.addEventListener('touchstart', () => isDragging = true);
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('touchmove', (e) => {
        if (isDragging) updateSlider(e.touches[0].clientX);
    });
    
    // Click to position
    slider.addEventListener('click', (e) => updateSlider(e.clientX));
}

/* =============================================
   SWIPER CAROUSELS
   ============================================= */
function initSwipers() {
    // Featured Projects Swiper
    new Swiper('.featured-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.featured-swiper .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.featured-swiper .swiper-button-next',
            prevEl: '.featured-swiper .swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });
    
    // Testimonials Swiper
    new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.testimonials-swiper .swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });
}

/* =============================================
   FAQ ACCORDION
   ============================================= */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/* =============================================
   LIGHTBOX
   ============================================= */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/* =============================================
   BACK TO TOP BUTTON
   ============================================= */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* =============================================
   CONTACT FORM
   ============================================= */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show success message (in production, send to server)
        alert('Thank you for your inquiry! We will contact you shortly.');
        form.reset();
        
        // In production, you would send this data to your server:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     body: JSON.stringify(data),
        //     headers: { 'Content-Type': 'application/json' }
        // });
    });
}

/* =============================================
   GSAP ANIMATIONS
   ============================================= */
function initGSAPAnimations() {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero animations
    gsap.from('.hero-content', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.5
    });
    
    // Parallax effect on hero image
    gsap.to('.hero-image', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
    
    // Section reveal animations
    gsap.utils.toArray('.section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 30,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Service cards stagger
    gsap.from('.service-card', {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%'
        }
    });
    
    // Portfolio items stagger
    gsap.from('.portfolio-item', {
        opacity: 0,
        scale: 0.9,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
            trigger: '.portfolio-grid',
            start: 'top 80%'
        }
    });
    
    // Why cards animation
    gsap.from('.why-card', {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: {
            trigger: '.why-grid',
            start: 'top 80%'
        }
    });
}

/* =============================================
   AOS INITIALIZATION
   ============================================= */
function initAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100,
        disable: 'mobile'
    });
}

/* =============================================
   UTILITY: FADE IN ANIMATION
   ============================================= */
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(fadeInStyle);

/* =============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});