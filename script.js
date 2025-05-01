// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

if (burger) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        
        navLinks.forEach((link, index) => {
            link.style.animation = link.style.animation ? '' : `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        });
        
        burger.classList.toggle('toggle');
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            if (nav?.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger?.classList.remove('toggle');
                navLinks.forEach(link => link.style.animation = '');
            }
        }
    });
});

// Navbar background on scroll
let scrollTimeout;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            navbar.style.backgroundColor = window.scrollY > 50 ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.9)';
        }, 10);
    }
});

// Lightbox functionality
function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');

    if (!lightbox || !lightboxImg || !lightboxCaption || !closeLightbox) return;

    const closeLightboxHandler = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.portfolio-item img').forEach(img => {
        img.addEventListener('click', function() {
            lightboxImg.src = this.src;
            const caption = this.nextElementSibling;
            if (caption) {
                lightboxCaption.innerHTML = `<h3>${caption.querySelector('h3').textContent}</h3><p>${caption.querySelector('p').textContent}</p>`;
            }
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeLightbox.addEventListener('click', closeLightboxHandler);
    lightbox.addEventListener('click', (e) => e.target === lightbox && closeLightboxHandler());
    document.addEventListener('keydown', (e) => e.key === 'Escape' && lightbox.classList.contains('active') && closeLightboxHandler());
}

// Cookie Consent functionality
function initializeCookieConsent() {
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookies = document.getElementById('accept-cookies');
    const declineCookies = document.getElementById('decline-cookies');

    if (!cookieConsent || !acceptCookies || !declineCookies) return;

    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieConsent');
    
    if (!cookieChoice) {
        // Show the cookie consent banner if no choice has been made
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 1000);
    }

    // Handle accept cookies
    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.classList.remove('show');
        // Here you can initialize any cookies or tracking scripts
    });

    // Handle decline cookies
    declineCookies.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        cookieConsent.classList.remove('show');
        // Here you can disable any cookies or tracking scripts
    });
}

// Skill bars animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
                observer.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.2
    });

    skillBars.forEach(bar => observer.observe(bar));
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeLightbox();
    initializeCookieConsent();
    initializeSkillBars();
    
    const playOverlay = document.querySelector('.play-overlay');
    if (playOverlay) {
        playOverlay.addEventListener('click', () => playOverlay.classList.add('hidden'));
    }
}); 
