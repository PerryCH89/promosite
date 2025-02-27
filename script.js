document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            // Move the background slightly as user scrolls
            hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
        }
    });

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.synopsis, .poster');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // If element is in viewport
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };

    // Add visible class to elements in viewport on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Smooth scroll for navigation
    const smoothScroll = function(target, duration) {
        const targetElement = document.querySelector(target);
        const targetPosition = targetElement.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        let startTime = null;
        
        const animation = function(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        
        // Easing function
        const ease = function(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
        
        requestAnimationFrame(animation);
    };

    // Add hover effect for poster sections
    const posters = document.querySelectorAll('.poster');
    
    posters.forEach(poster => {
        poster.addEventListener('mouseenter', function() {
            posters.forEach(p => {
                if (p !== poster) {
                    p.style.opacity = '0.7';
                }
            });
        });
        
        poster.addEventListener('mouseleave', function() {
            posters.forEach(p => {
                p.style.opacity = '1';
            });
        });
    });

    // Add glitch effect to title on hover
    const title = document.querySelector('.title');
    
    if (title) {
        title.addEventListener('mouseenter', function() {
            this.classList.add('glitch');
        });
        
        title.addEventListener('mouseleave', function() {
            this.classList.remove('glitch');
        });
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .synopsis, .poster {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 1s ease, transform 1s ease;
        }
        
        .synopsis.visible, .poster.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .title.glitch {
            animation: glitch 0.5s linear infinite;
        }
        
        @keyframes glitch {
            0% {
                transform: translate(0);
            }
            20% {
                transform: translate(-2px, 2px);
            }
            40% {
                transform: translate(-2px, -2px);
            }
            60% {
                transform: translate(2px, 2px);
            }
            80% {
                transform: translate(2px, -2px);
            }
            100% {
                transform: translate(0);
            }
        }
    `;
    
    document.head.appendChild(style);
});
