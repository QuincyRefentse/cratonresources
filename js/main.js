/**
 * Craton Resources - Main JavaScript
 * Mobile navigation, form handling, and interactive elements
 */

(function() {
    'use strict';

    // ========================================
    // MOBILE NAVIGATION
    // ========================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileClose = document.querySelector('.mobile-close');

    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileNav.classList.toggle('open');
            document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
        });

        if (mobileClose) {
            mobileClose.addEventListener('click', function() {
                mobileNav.classList.remove('open');
                document.body.style.overflow = '';
            });
        }

        // Close mobile nav when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileNav.classList.contains('open')) {
                const isClickInside = mobileNav.contains(e.target);
                const isToggle = mobileToggle.contains(e.target);
                if (!isClickInside && !isToggle) {
                    mobileNav.classList.remove('open');
                    document.body.style.overflow = '';
                }
            }
        });
    }

    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile nav if open
                if (mobileNav && mobileNav.classList.contains('open')) {
                    mobileNav.classList.remove('open');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // ========================================
    // CONTACT FORM HANDLING
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const division = document.getElementById('division').value;
            const message = document.getElementById('message').value.trim();

            // Basic validation
            if (!name || !email || !message) {
                showFormResponse('Please fill in all required fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showFormResponse('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Mock API call
            setTimeout(function() {
                showFormResponse(
                    `Thank you, ${name}! Your message has been sent to our ${division} team. We'll get back to you within 24 hours.`,
                    'success'
                );
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    function showFormResponse(message, type) {
        if (!formResponse) return;
        formResponse.textContent = message;
        formResponse.className = 'form-response ' + type;
        formResponse.style.display = 'block';

        // Auto-hide after 6 seconds
        clearTimeout(window.formTimeout);
        window.formTimeout = setTimeout(function() {
            formResponse.style.display = 'none';
        }, 6000);
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ========================================
    // KEYBOARD ACCESSIBILITY
    // ========================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (mobileNav && mobileNav.classList.contains('open')) {
                mobileNav.classList.remove('open');
                document.body.style.overflow = '';
            }
        }
    });

    // ========================================
    // CONSOLE WELCOME
    // ========================================
    console.log('%c Craton Resources ', 'background: #1f2a3a; color: #b28b6c; font-size: 1.2rem; font-weight: bold; padding: 8px 16px; border-radius: 4px;');
    console.log('Three strategies. One integrated practice.');
    console.log('Advisory · Trading · Capital');

})();