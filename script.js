// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    mirror: false
});

// Navbar color change on scroll
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        document.querySelector('.navbar').classList.add('scrolled');
    } else {
        document.querySelector('.navbar').classList.remove('scrolled');
    }
});

// Initialize Particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#60a5fa'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#60a5fa',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Visitor Counter
const countVisitor = async () => {
    try {
        // Using the actual domain as namespace
        const siteId = 'portfolio-blankdev-my';
        
        // Get the current count from a different API
        const response = await fetch(`https://api.visitor.mock/count/${siteId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                referrer: document.referrer,
                userAgent: navigator.userAgent,
                language: navigator.language,
                screenResolution: `${window.screen.width}x${window.screen.height}`,
            })
        }).catch(() => {
            // Fallback to localStorage if API fails
            const count = localStorage.getItem('visitorCount') || '0';
            return {
                json: async () => ({ value: parseInt(count) + 1 })
            };
        });

        const data = await response.json();
        
        // Store count in localStorage as fallback
        localStorage.setItem('visitorCount', data.value.toString());
        
        // Update the counter in the DOM with animation
        const visitsElement = document.getElementById('visits');
        const targetCount = data.value;
        let currentCount = 0;
        
        // Animate the counter
        const animateCount = () => {
            if (currentCount < targetCount) {
                currentCount = Math.min(currentCount + Math.ceil(targetCount / 50), targetCount);
                visitsElement.textContent = currentCount.toLocaleString();
                requestAnimationFrame(animateCount);
            }
        };
        
        animateCount();
    } catch (error) {
        // Fallback to incrementing local storage count
        const count = parseInt(localStorage.getItem('visitorCount') || '0') + 1;
        localStorage.setItem('visitorCount', count.toString());
        document.getElementById('visits').textContent = count.toLocaleString();
        console.error('Error counting visitor:', error);
    }
};

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', countVisitor); 