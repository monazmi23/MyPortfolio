// Navbar color change on scroll
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        document.querySelector('.navbar').classList.add('scrolled');
    } else {
        document.querySelector('.navbar').classList.remove('scrolled');
    }
});

// Add hover effect to cards
document.querySelectorAll('.skill-card, .project-card, .contact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translate(8px, 8px)';
        this.style.boxShadow = '0 0 0 var(--dark-color)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
        this.style.boxShadow = '8px 8px 0 var(--dark-color)';
    });
});

// Add click effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'translate(4px, 4px)';
        this.style.boxShadow = '4px 4px 0 var(--dark-color)';
    });

    button.addEventListener('mouseup', function() {
        this.style.transform = 'translate(8px, 8px)';
        this.style.boxShadow = '0 0 0 var(--dark-color)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
        this.style.boxShadow = '8px 8px 0 var(--dark-color)';
    });
});

// Add random rotation to elements on hover
document.querySelectorAll('.skill-card, .project-card').forEach(element => {
    element.addEventListener('mouseenter', function() {
        const randomRotation = Math.random() * 4 - 2; // Random rotation between -2 and 2 degrees
        this.style.transform = `translate(8px, 8px) rotate(${randomRotation}deg)`;
    });

    element.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0) rotate(0deg)';
    });
});
