// Donations Page JavaScript

// Sample donations data
const donationsData = [
    {
        id: 1,
        name: "أحمد محمد الصالح",
        amount: 5000,
        type: "دعم عام",
        time: "منذ 5 دقائق",
        anonymous: false
    },
    {
        id: 2,
        name: "متبرع مجهول",
        amount: 2500,
        type: "مساعدات طبية",
        time: "منذ 15 دقيقة",
        anonymous: true
    },
    {
        id: 3,
        name: "فاطمة علي الزهراني",
        amount: 1000,
        type: "طعام وماء",
        time: "منذ 30 دقيقة",
        anonymous: false
    },
    {
        id: 4,
        name: "خالد عبدالله",
        amount: 3000,
        type: "مأوى",
        time: "منذ ساعة",
        anonymous: false
    },
    {
        id: 5,
        name: "متبرع مجهول",
        amount: 1500,
        type: "تعليم",
        time: "منذ ساعتين",
        anonymous: true
    },
    {
        id: 6,
        name: "نور الهدى محمد",
        amount: 800,
        type: "دعم عام",
        time: "منذ 3 ساعات",
        anonymous: false
    },
    {
        id: 7,
        name: "عبدالرحمن أحمد",
        amount: 4000,
        type: "مساعدات طبية",
        time: "منذ 4 ساعات",
        anonymous: false
    },
    {
        id: 8,
        name: "متبرع مجهول",
        amount: 2000,
        type: "طعام وماء",
        time: "منذ 5 ساعات",
        anonymous: true
    },
    {
        id: 9,
        name: "سارة محمد الأحمد",
        amount: 1200,
        type: "تعليم",
        time: "منذ 6 ساعات",
        anonymous: false
    },
    {
        id: 10,
        name: "محمد علي الخالدي",
        amount: 6000,
        type: "دعم عام",
        time: "منذ 8 ساعات",
        anonymous: false
    }
];

let currentPage = 0;
const itemsPerPage = 5;

document.addEventListener('DOMContentLoaded', function() {
    initializeDonationsPage();
});

function initializeDonationsPage() {
    // Animate counters
    animateCounters();
    
    // Load initial donations
    loadDonations();
    
    // Create donations chart
    createDonationsChart();
    
    // Add real-time updates simulation
    simulateRealTimeUpdates();
}

function animateCounters() {
    const totalAmount = document.getElementById('totalAmount');
    const totalDonors = document.getElementById('totalDonors');
    
    if (totalAmount) {
        animateCounter(totalAmount, 2847650);
    }
    
    if (totalDonors) {
        animateCounter(totalDonors, 1247);
    }
    
    // Animate stat numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/,/g, ''));
        animateCounter(stat, target);
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

function loadDonations() {
    const donationsList = document.getElementById('donationsList');
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const donationsToShow = donationsData.slice(startIndex, endIndex);
    
    if (donationsToShow.length === 0) {
        const loadMoreBtn = document.querySelector('.load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
        return;
    }
    
    donationsToShow.forEach(donation => {
        const donationElement = createDonationElement(donation);
        donationsList.appendChild(donationElement);
    });
    
    currentPage++;
}

function createDonationElement(donation) {
    const donationItem = document.createElement('div');
    donationItem.className = 'donation-item';
    
    const displayName = donation.anonymous ? 'متبرع مجهول' : donation.name;
    const avatarIcon = donation.anonymous ? 'fa-user-secret' : 'fa-user';
    
    donationItem.innerHTML = `
        <div class="donation-info">
            <div class="donation-avatar">
                <i class="fas ${avatarIcon}"></i>
            </div>
            <div class="donation-details">
                <h4>${displayName}</h4>
                <div class="donation-type">${donation.type}</div>
            </div>
        </div>
        <div class="donation-meta">
            <div class="donation-amount">${donation.amount.toLocaleString('ar-EG')} ريال</div>
            <div class="donation-time">${donation.time}</div>
        </div>
    `;
    
    return donationItem;
}

function loadMoreDonations() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    // Show loading state
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
    loadMoreBtn.disabled = true;
    
    setTimeout(() => {
        loadDonations();
        loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> عرض المزيد';
        loadMoreBtn.disabled = false;
    }, 1000);
}

function createDonationsChart() {
    const ctx = document.getElementById('donationsChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['المساعدات الطبية', 'الطعام والماء', 'المأوى', 'التعليم', 'دعم عام'],
            datasets: [{
                data: [30, 25, 20, 10, 15],
                backgroundColor: [
                    '#ff6b6b',
                    '#4ecdc4',
                    '#45b7d1',
                    '#96ceb4',
                    '#feca57'
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            family: 'Cairo',
                            size: 14
                        },
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    },
                    titleFont: {
                        family: 'Cairo'
                    },
                    bodyFont: {
                        family: 'Cairo'
                    }
                }
            }
        }
    });
}

function simulateRealTimeUpdates() {
    // Simulate new donations every 30 seconds
    setInterval(() => {
        addNewDonation();
    }, 30000);
}

function addNewDonation() {
    const newDonation = generateRandomDonation();
    
    // Add to the beginning of the array
    donationsData.unshift(newDonation);
    
    // Create and add the new donation element
    const donationsList = document.getElementById('donationsList');
    const newElement = createDonationElement(newDonation);
    
    // Add animation class
    newElement.style.opacity = '0';
    newElement.style.transform = 'translateY(-20px)';
    
    donationsList.insertBefore(newElement, donationsList.firstChild);
    
    // Animate in
    setTimeout(() => {
        newElement.style.transition = 'all 0.5s ease';
        newElement.style.opacity = '1';
        newElement.style.transform = 'translateY(0)';
    }, 100);
    
    // Update counters
    updateCounters(newDonation.amount);
    
    // Show notification
    showNotification(`تبرع جديد: ${newDonation.amount.toLocaleString('ar-EG')} ريال`, 'success');
}

function generateRandomDonation() {
    const names = [
        'أحمد محمد',
        'فاطمة علي',
        'خالد عبدالله',
        'نور الهدى',
        'عبدالرحمن أحمد',
        'سارة محمد',
        'محمد علي',
        'زينب أحمد'
    ];
    
    const types = ['دعم عام', 'مساعدات طبية', 'طعام وماء', 'مأوى', 'تعليم'];
    const amounts = [500, 1000, 1500, 2000, 2500, 3000, 5000];
    
    const isAnonymous = Math.random() < 0.3; // 30% chance of anonymous
    
    return {
        id: Date.now(),
        name: isAnonymous ? 'متبرع مجهول' : names[Math.floor(Math.random() * names.length)],
        amount: amounts[Math.floor(Math.random() * amounts.length)],
        type: types[Math.floor(Math.random() * types.length)],
        time: 'الآن',
        anonymous: isAnonymous
    };
}

function updateCounters(newAmount) {
    const totalAmount = document.getElementById('totalAmount');
    const totalDonors = document.getElementById('totalDonors');
    
    if (totalAmount) {
        const currentAmount = parseInt(totalAmount.textContent.replace(/,/g, ''));
        const newTotal = currentAmount + newAmount;
        animateCounter(totalAmount, newTotal);
    }
    
    if (totalDonors) {
        const currentDonors = parseInt(totalDonors.textContent.replace(/,/g, ''));
        const newTotal = currentDonors + 1;
        animateCounter(totalDonors, newTotal);
    }
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
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2ed573' : type === 'error' ? '#ff4757' : '#667eea'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-family: 'Cairo', sans-serif;
        font-weight: 600;
        max-width: 350px;
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

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
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
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;
document.head.appendChild(style);

// Add scroll effects
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.stat-card, .donor-card, .donation-item');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Initialize scroll effects
document.querySelectorAll('.stat-card, .donor-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

console.log('🇵🇸 صفحة التبرعات تم تحميلها بنجاح');
console.log('💝 شكراً لجميع المتبرعين الكرام');
