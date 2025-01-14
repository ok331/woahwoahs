// Typing Animation
const texts = [
    "Cybersecurity Administrator",
    "Network Security Specialist",
    "IoT Systems Expert",
    "Security Architecture Designer"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const waitTime = 2000;

function typeText() {
    const typingElement = document.querySelector('.typing-text');
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeText, waitTime);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeText, 500);
        return;
    }

    setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
}

// Snow Effect
class Snowflake {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = -10;
        this.size = Math.random() * 3 + 2;
        this.speed = Math.random() * 1 + 0.5;
        this.opacity = Math.random() * 0.6 + 0.4;
        this.swing = Math.random() * 3;
        this.swingSpeed = Math.random() * 0.02;
        this.swingCount = 0;
    }

    update() {
        this.y += this.speed;
        this.swingCount += this.swingSpeed;
        this.x += Math.sin(this.swingCount) * this.swing;

        if (this.y > window.innerHeight) {
            this.reset();
        }
    }
}

class SnowAnimation {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.getElementById('snow-container').appendChild(this.canvas);
        
        this.snowflakes = [];
        this.resize();
        
        window.addEventListener('resize', () => this.resize());
        this.createSnowflakes();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createSnowflakes() {
        const numberOfSnowflakes = Math.floor(window.innerWidth * 0.1);
        for (let i = 0; i < numberOfSnowflakes; i++) {
            this.snowflakes.push(new Snowflake());
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.snowflakes.forEach(snowflake => {
            this.ctx.beginPath();
            this.ctx.arc(snowflake.x, snowflake.y, snowflake.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${snowflake.opacity})`;
            this.ctx.fill();
            snowflake.update();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    typeText();
    
    // Initialize snow effect
    new SnowAnimation();
    
    // Initialize scroll animations
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Form submission handler
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add form submission logic here
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
        });
    }
});
