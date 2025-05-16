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
document.addEventListener('DOMContentLoaded', function() {
    // Generate a unique key for your website
    const NAMESPACE = 'portfolio.blankdev.my';
    const KEY = 'visitors';
    
    // Function to format numbers with commas
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // Function to update visitor count
    async function updateVisitorCount() {
        try {
            // First, try to get the count
            const response = await fetch(`https://api.countapi.xyz/get/${NAMESPACE}/${KEY}`);
            const data = await response.json();
            
            if (data.value === undefined) {
                // If the key doesn't exist, create it
                const initResponse = await fetch(`https://api.countapi.xyz/create?namespace=${NAMESPACE}&key=${KEY}&value=1`);
                const initData = await initResponse.json();
                document.getElementById('visitorCount').textContent = formatNumber(initData.value);
            } else {
                // If it exists, increment it
                const hitResponse = await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`);
                const hitData = await hitResponse.json();
                document.getElementById('visitorCount').textContent = formatNumber(hitData.value);
            }
        } catch (error) {
            console.error('Error updating visitor count:', error);
            document.getElementById('visitorCount').textContent = 'Error';
        }
    }
    
    // Update the visitor count when the page loads
    updateVisitorCount();
});