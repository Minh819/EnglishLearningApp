// Interactive functionality for English Learning Hub

// Smooth scroll behavior
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

// Active navigation link update
window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Start Learning button functionality
const startLearningBtn = document.querySelector('.btn-primary');
if (startLearningBtn) {
    startLearningBtn.addEventListener('click', () => {
        window.location.href = 'vocab.html';
        showNotification('Welcome! Starting your English learning journey...');
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #667eea;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Exercise interactivity
document.querySelectorAll('.exercise-card').forEach((card, index) => {
    const card_element = card;
    card_element.addEventListener('click', () => {
        card_element.style.animation = 'pulse 0.3s ease';
    });
});

// Add click handlers for feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
    });
    card.addEventListener('mouseleave', function () {
        this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'h' && e.ctrlKey) {
        window.location.href = 'index.html';
        showNotification('Going to Home...');
    }
});

// Log page load
console.log('English Learning Hub - Ready to learn!');

// Store user progress (basic localStorage example)
function saveProgress(topic, score) {
    const progress = JSON.parse(localStorage.getItem('englishProgress') || '{}');
    progress[topic] = score;
    localStorage.setItem('englishProgress', JSON.stringify(progress));
    console.log(`Progress saved for ${topic}: ${score}%`);
}

function getProgress(topic) {
    const progress = JSON.parse(localStorage.getItem('englishProgress') || '{}');
    return progress[topic] || 0;
}

// Example: Save and retrieve progress
// saveProgress('vocabulary', 75);
// console.log('Current vocabulary progress:', getProgress('vocabulary'));
