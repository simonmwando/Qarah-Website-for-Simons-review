// Function to scroll to contact section
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to the CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-btn');
    
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('primary')) {
                scrollToContact();
            } else if (this.classList.contains('secondary')) {
                alert('Thank you for your interest! This is where you would schedule a consultation with Qarah.');
            }
        });
    });
    
    // Add active state to navigation
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default for same-page links (like #contact)
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
            }
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
    
    // Add some animation to the pattern
    const patternImage = document.querySelector('.pattern-image');
    
    if (patternImage) {
        patternImage.style.opacity = '0';
        patternImage.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            patternImage.style.transition = 'all 0.8s ease-out';
            patternImage.style.opacity = '1';
            patternImage.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Counter animation for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + suffix;
                }
            };
            
            updateCounter();
        });
    }
    
    // Intersection Observer to trigger animation when section comes into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe the stats section
    const statsSection = document.querySelector('.stats-horizontal');
    if (statsSection) {
        observer.observe(statsSection);
    }
});

// Add CSS animation class
const style = document.createElement('style');
style.textContent = `
    .pattern-image {
        transition: all 0.8s ease-out;
    }
    
    .pattern-container {
        animation: patternFloat 4s ease-in-out infinite;
    }
    
    @keyframes patternFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
    }
`;
document.head.appendChild(style);
