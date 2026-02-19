// Rotating title: Backend Developer, Full Stack Developer, Web Developer
const rotatingTitle = document.getElementById('rotatingTitle');
if (rotatingTitle) {
    const titles = ['Backend Developer', 'Full Stack Developer', 'Web Developer'];
    let index = 0;
    setInterval(function() {
        rotatingTitle.classList.add('fade-out');
        setTimeout(function() {
            index = (index + 1) % titles.length;
            rotatingTitle.textContent = titles[index];
            rotatingTitle.classList.remove('fade-out');
        }, 400);
    }, 2500);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Update active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

function updateActiveNav() {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Header background on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(31, 36, 45, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'transparent';
        header.style.backdropFilter = 'none';
    }
});

// ========== BACKEND: Contact form ==========
// Backend developer: set your API URL below. API should accept POST with JSON body:
// { fullName, email, phone, subject, message } and return 200 on success.

const CONTACT_API_URL = '/api/contact';  // Change to your backend endpoint, e.g. 'https://yoursite.com/api/contact'

const contactForm = document.querySelector('.contact-form');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        if (!submitBtn) return;

        const formData = new FormData(contactForm);
        const data = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone') || '',
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            const response = await fetch(CONTACT_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(errText || 'Request failed');
            }
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } catch (err) {
            console.error('Contact form error:', err);
            alert('Something went wrong. Please try again or email me directly.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
}

// Social links: open in new tab
document.querySelectorAll('.Social-Media a[href^="http"]').forEach(function(link) {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
});

// CV button: force download in same tab (file already set in HTML)
document.querySelector('.btn[aria-label="Download my CV"]')?.setAttribute('download', 'Ranjita-Kakodiya-Resume.pdf');

// Intersection Observer for animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('.skill-item, .portfolio-item, .about-content, .about-img').forEach(el => {
    observer.observe(el);
});

// Add animation delay to portfolio items
document.querySelectorAll('.portfolio-item').forEach((item, index) => {
    item.style.setProperty('--i', index + 1);
});
