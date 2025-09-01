// Donation Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeDonationForm();
});

function initializeDonationForm() {
    const form = document.getElementById('donationForm');
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');
    const submitButton = document.querySelector('.donate-submit-btn');
    
    // Amount button selection
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Clear custom amount
            customAmountInput.value = '';
            
            // Store selected amount
            const amount = this.getAttribute('data-amount');
            console.log('Selected amount:', amount);
        });
    });
    
    // Custom amount input
    customAmountInput.addEventListener('input', function() {
        if (this.value) {
            // Remove active class from all amount buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleDonationSubmission();
    });
    
    // Payment method selection effects
    setupPaymentMethodEffects();
    
    // Form validation
    setupFormValidation();
}

function handleDonationSubmission() {
    const form = document.getElementById('donationForm');
    const submitButton = document.querySelector('.donate-submit-btn');
    
    // Get form data
    const formData = getFormData();
    
    // Validate form
    if (!validateForm(formData)) {
        return;
    }
    
    // Show loading state
    showLoadingState(true);
    
    // Simulate donation processing
    setTimeout(() => {
        showLoadingState(false);
        showSuccessMessage(formData);
    }, 3000);
}

function getFormData() {
    const selectedAmountBtn = document.querySelector('.amount-btn.active');
    const customAmount = document.getElementById('customAmount').value;
    
    return {
        amount: selectedAmountBtn ? selectedAmountBtn.getAttribute('data-amount') : customAmount,
        donationType: document.querySelector('input[name="donationType"]:checked').value,
        name: document.getElementById('donorName').value,
        email: document.getElementById('donorEmail').value,
        phone: document.getElementById('donorPhone').value,
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
        anonymous: document.getElementById('anonymous').checked,
        monthly: document.getElementById('monthly').checked
    };
}

function validateForm(data) {
    let isValid = true;
    const errors = [];
    
    // Validate amount
    if (!data.amount || data.amount < 10) {
        errors.push('يرجى اختيار مبلغ التبرع (الحد الأدنى 10 ريال)');
        isValid = false;
    }
    
    // Validate name
    if (!data.name || data.name.trim().length < 2) {
        errors.push('يرجى إدخال الاسم الكامل');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('يرجى إدخال بريد إلكتروني صحيح');
        isValid = false;
    }
    
    // Validate phone
    if (!data.phone || data.phone.length < 10) {
        errors.push('يرجى إدخال رقم هاتف صحيح');
        isValid = false;
    }
    
    if (!isValid) {
        showNotification(errors.join('\n'), 'error');
    }
    
    return isValid;
}

function showLoadingState(loading) {
    const form = document.getElementById('donationForm');
    const submitButton = document.querySelector('.donate-submit-btn');
    
    if (loading) {
        form.classList.add('form-loading');
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري المعالجة...';
        submitButton.disabled = true;
    } else {
        form.classList.remove('form-loading');
        submitButton.innerHTML = '<i class="fas fa-heart"></i> تبرع الآن';
        submitButton.disabled = false;
    }
}

function showSuccessMessage(data) {
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message show';
    successDiv.innerHTML = `
        <h3><i class="fas fa-check-circle"></i> تم التبرع بنجاح!</h3>
        <p>شكراً لك ${data.anonymous ? '' : data.name} على تبرعك بمبلغ ${data.amount} ريال</p>
        <p>سيتم التواصل معك قريباً لتأكيد التبرع</p>
        ${data.monthly ? '<p><strong>تم تفعيل التبرع الشهري</strong></p>' : ''}
    `;
    
    // Insert after form
    const form = document.getElementById('donationForm');
    form.parentNode.insertBefore(successDiv, form.nextSibling);
    
    // Hide form
    form.style.display = 'none';
    
    // Show notification
    showNotification('تم إرسال طلب التبرع بنجاح! شكراً لدعمك', 'success');
    
    // Send confirmation email (simulation)
    setTimeout(() => {
        showNotification('تم إرسال رسالة تأكيد على بريدك الإلكتروني', 'info');
    }, 2000);
}

function setupPaymentMethodEffects() {
    const paymentOptions = document.querySelectorAll('input[name="paymentMethod"]');
    
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            const method = this.value;
            console.log('Payment method selected:', method);
            
            // You can add specific effects or information based on payment method
            switch(method) {
                case 'card':
                    showNotification('سيتم توجيهك لصفحة الدفع الآمنة', 'info');
                    break;
                case 'paypal':
                    showNotification('سيتم فتح PayPal في نافذة جديدة', 'info');
                    break;
                case 'bank':
                    showNotification('سيتم عرض تفاصيل التحويل البنكي', 'info');
                    break;
            }
        });
    });
}

function setupFormValidation() {
    const inputs = document.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Remove error styling on input
            this.style.borderColor = '#e9ecef';
        });
    });
}

function validateField(field) {
    let isValid = true;
    const value = field.value.trim();
    
    switch(field.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
            break;
        case 'tel':
            isValid = value.length >= 10;
            break;
        default:
            isValid = value.length >= 2;
    }
    
    if (!isValid) {
        field.style.borderColor = '#ff4757';
    } else {
        field.style.borderColor = '#2ed573';
    }
    
    return isValid;
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
        white-space: pre-line;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
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

// Animate impact numbers on scroll
function animateImpactNumbers() {
    const impactNumbers = document.querySelectorAll('.impact-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target;
                const finalValue = parseInt(number.textContent.replace(/,/g, ''));
                animateCounter(number, finalValue);
                observer.unobserve(number);
            }
        });
    }, { threshold: 0.5 });
    
    impactNumbers.forEach(number => {
        observer.observe(number);
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

// Initialize impact numbers animation
setTimeout(animateImpactNumbers, 1000);

console.log('🇵🇸 صفحة التبرع تم تحميلها بنجاح');
console.log('💝 شكراً لدعمكم لغزة والشعب الفلسطيني');
