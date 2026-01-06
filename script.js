/**
 * ORCA Portfolio - Main JavaScript
 * Neo-Brutalism Interactive Features
 */

// Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('show');
});

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        if (navToggle.classList.contains('open')) {
            navToggle.classList.remove('open');
            navMenu.classList.remove('show');
        }
    });
});

// Active nav on scroll
const sections = document.querySelectorAll('.hero, .about, .projects, .contact');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (pageYOffset >= section.offsetTop - 150) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
});

// Modern Preloader
const preloader = document.getElementById('preloader');
const counter = document.getElementById('preloader-counter');
const bar = document.getElementById('preloader-bar');
let progress = 0;

const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 12) + 3;
    if (progress >= 100) progress = 100;
    counter.textContent = progress + '%';
    bar.style.width = progress + '%';
    if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => preloader.remove(), 600);
        }, 500);
    }
}, 50);

// EmailJS Integration
emailjs.init('rbDwUF7QPkvZUGexg');

// Contact Form with EmailJS
const contactForm = document.querySelector('.contact-form');
const sentMessage = document.getElementById('sent-message');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        const formData = {
            from_name: contactForm.querySelector('input[name="name"]').value,
            from_email: contactForm.querySelector('input[name="email"]').value,
            message: contactForm.querySelector('textarea[name="message"]').value
        };

        try {
            // Send notification to site owner
            await emailjs.send('service_m4dwagk', 'template_k41qfnx', formData);

            // Send auto-reply to sender
            await emailjs.send('service_m4dwagk', 'template_xql6d4g', formData);

            // Show success message
            contactForm.style.display = 'none';
            sentMessage.classList.add('active');
            sentMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch (error) {
            console.error('EmailJS Error:', error);
            submitBtn.textContent = 'Failed - Try Again';
            submitBtn.disabled = false;
            setTimeout(() => {
                submitBtn.textContent = originalText;
            }, 3000);
        }
    });
}

// Scroll Progress Bar
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

