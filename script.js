// DOM Elements
const navLinks = document.querySelectorAll('.nav-menu a');
const supportButtons = document.querySelectorAll('.support-btn');
const heroStats = document.querySelectorAll('.stat .number');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    animateCounters();
    setupScrollEffects();
});

function initializePage() {
    // Set up navigation
    setupNavigation();
    
    // Set up button handlers
    setupButtonHandlers();
    
    // Add smooth scrolling
    setupSmoothScrolling();
    
    // Show welcome message
    setTimeout(() => {
        showNotification('أهلاً بك في موقع غزة في القلب', 'info');
    }, 1000);
}

function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Scroll to section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupButtonHandlers() {
    supportButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            handleSupportAction(action, this);
        });
    });
}

function handleSupportAction(action, button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        
        switch(action) {
            case 'تبرع الآن':
                showNotification('شكراً لك! تم توجيهك لصفحة التبرع', 'success');
                break;
            case 'شارك':
                shareContent();
                break;
            case 'انضم':
                showNotification('تم تسجيلك في قائمة المناصرين', 'success');
                break;
        }
    }, 2000);
}

function shareContent() {
    if (navigator.share) {
        navigator.share({
            title: 'غزة في القلب - موقع تذكاري',
            text: 'موقع تذكاري لتوثيق أحداث حرب غزة وتكريم الشهداء',
            url: window.location.href
        }).then(() => {
            showNotification('تم المشاركة بنجاح!', 'success');
        }).catch(() => {
            copyToClipboard();
        });
    } else {
        copyToClipboard();
    }
}

function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showNotification('تم نسخ الرابط للحافظة', 'success');
    }).catch(() => {
        showNotification('لم يتم نسخ الرابط', 'error');
    });
}

function animateCounters() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    heroStats.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString('ar-EG');
    }, 20);
}

function setupScrollEffects() {
    // Add scroll-based animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.timeline-item, .hero-card, .story-card, .support-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function setupSmoothScrolling() {
    // Handle all anchor links
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
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const iconMap = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'info': 'info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${iconMap[type]}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Add CSS for slide out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
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

// Update active navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Add memorial prayer functionality
function addMemorialPrayer() {
    const memorial = document.querySelector('.memorial-section');
    if (memorial) {
        memorial.addEventListener('click', () => {
            showNotification('اللهم ارحم شهداءنا الأبرار', 'info');
        });
    }
}

// Initialize memorial prayer
setTimeout(addMemorialPrayer, 1000);

// Add typing effect for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect for hero subtitle
setTimeout(() => {
    const heroSubtitle = document.querySelector('.hero h2');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        typeWriter(heroSubtitle, originalText, 80);
    }
}, 2000);

// Add Palestine flag colors animation
function addFlagAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes palestineFlag {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .flag-animation {
            background: linear-gradient(45deg, #000000, #ff0000, #ffffff, #00ff00);
            background-size: 400% 400%;
            animation: palestineFlag 4s ease infinite;
        }
    `;
    document.head.appendChild(style);
}

addFlagAnimation();

// Add prayer times reminder (symbolic)
function addPrayerReminder() {
    const now = new Date();
    const hours = now.getHours();
    
    // Show prayer reminder at specific times
    const prayerTimes = [5, 12, 15, 18, 20]; // Approximate prayer times
    
    if (prayerTimes.includes(hours)) {
        setTimeout(() => {
            showNotification('حان وقت الصلاة - ادع للشهداء', 'info');
        }, 5000);
    }
}

addPrayerReminder();

// Add resistance quotes
const resistanceQuotes = [
    "إن الموت في سبيل فلسطين حياة",
    "غزة تقاوم... غزة تنتصر",
    "من غزة نبدأ... وفي القدس ننتهي",
    "الشهادة في سبيل الله أسمى الأماني",
    "فلسطين حرة من النهر إلى البحر"
];

function showRandomQuote() {
    const randomQuote = resistanceQuotes[Math.floor(Math.random() * resistanceQuotes.length)];
    showNotification(randomQuote, 'info');
}

// Show random quote every 30 seconds
setInterval(showRandomQuote, 30000);

console.log('🇵🇸 موقع غزة في القلب تم تحميله بنجاح');
console.log('🤲 اللهم ارحم شهداء فلسطين');
