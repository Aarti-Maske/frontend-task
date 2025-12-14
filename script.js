// script.js - Complete functionality for responsive dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
    
    // Toggle sidebar on mobile
    mobileMenuBtn.addEventListener('click', function() {
        sidebar.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
    
    // Close sidebar
    function closeSidebar() {
        sidebar.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    sidebarCloseBtn.addEventListener('click', closeSidebar);
    mobileOverlay.addEventListener('click', closeSidebar);
    
    // Close sidebar when clicking on a menu item (on mobile)
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
            
            // Scroll to corresponding container
            const containerId = this.getAttribute('data-container');
            const container = document.getElementById(containerId);
            if (container) {
                container.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                
                // Highlight container
                container.style.boxShadow = '0 0 0 3px rgba(67, 97, 238, 0.3)';
                setTimeout(() => {
                    container.style.boxShadow = '';
                }, 2000);
            }
        });
    });
    
    // Main Image Slider Functionality
    const sliderImages = document.querySelectorAll('.slider-image');
    const sliderDots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        sliderImages.forEach(slide => slide.classList.remove('active'));
        sliderDots.forEach(dot => dot.classList.remove('active'));
        
        if (index >= sliderImages.length) currentSlide = 0;
        else if (index < 0) currentSlide = sliderImages.length - 1;
        else currentSlide = index;
        
        sliderImages[currentSlide].classList.add('active');
        sliderDots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    prevBtn.addEventListener('click', function() {
        prevSlide();
        resetInterval();
    });
    
    nextBtn.addEventListener('click', function() {
        nextSlide();
        resetInterval();
    });
    
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            resetInterval();
        });
    });
    
    // Start the main slider
    startSlideInterval();
    
    // Container 1: Carousel
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    const prevCarouselBtn = document.querySelector('.prev-carousel-btn');
    const nextCarouselBtn = document.querySelector('.next-carousel-btn');
    let currentCarouselSlide = 0;
    
    function showCarouselSlide(index) {
        carouselSlides.forEach(slide => slide.classList.remove('active'));
        carouselDots.forEach(dot => dot.classList.remove('active'));
        
        if (index >= carouselSlides.length) currentCarouselSlide = 0;
        else if (index < 0) currentCarouselSlide = carouselSlides.length - 1;
        else currentCarouselSlide = index;
        
        carouselSlides[currentCarouselSlide].classList.add('active');
        carouselDots[currentCarouselSlide].classList.add('active');
    }
    
    prevCarouselBtn.addEventListener('click', () => showCarouselSlide(currentCarouselSlide - 1));
    nextCarouselBtn.addEventListener('click', () => showCarouselSlide(currentCarouselSlide + 1));
    
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showCarouselSlide(index));
    });
    
    // Container 3: Interactive Slider
    const sliderItems = document.querySelectorAll('.slider-item');
    const sliderTrack = document.querySelector('.slider-track');
    const valueSlider = document.getElementById('valueSlider');
    const currentValue = document.getElementById('currentValue');
    const prevSliderItem = document.getElementById('prevSliderItem');
    const nextSliderItem = document.getElementById('nextSliderItem');
    let currentSliderItem = 0;
    const totalSliderItems = sliderItems.length;
    const itemWidth = 25; // Percentage
    
    function updateSliderPosition() {
        sliderTrack.style.transform = `translateX(-${currentSliderItem * itemWidth}%)`;
        sliderItems.forEach((item, index) => {
            item.classList.toggle('active', index === currentSliderItem);
        });
    }
    
    valueSlider.addEventListener('input', function() {
        currentValue.textContent = this.value;
    });
    
    prevSliderItem.addEventListener('click', function() {
        if (currentSliderItem > 0) {
            currentSliderItem--;
            updateSliderPosition();
        }
    });
    
    nextSliderItem.addEventListener('click', function() {
        if (currentSliderItem < totalSliderItems - 1) {
            currentSliderItem++;
            updateSliderPosition();
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderTrack.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    sliderTrack.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentSliderItem < totalSliderItems - 1) {
                // Swipe left
                currentSliderItem++;
            } else if (diff < 0 && currentSliderItem > 0) {
                // Swipe right
                currentSliderItem--;
            }
            updateSliderPosition();
        }
    }
    
    // Container 5: Action Buttons
    const buttonA = document.getElementById('buttonA');
    const buttonB = document.getElementById('buttonB');
    const buttonC = document.getElementById('buttonC');
    
    buttonA.addEventListener('click', function() {
        showNotification('Data exported successfully!', 'success');
        // Ripple effect
        createRippleEffect(this);
    });
    
    buttonB.addEventListener('click', function() {
        showNotification('Dashboard refreshed!', 'info');
        createRippleEffect(this);
        // Simulate refresh by resetting some values
        valueSlider.value = 75;
        currentValue.textContent = '75';
        showCarouselSlide(0);
    });
    
    buttonC.addEventListener('click', function() {
        showNotification('Settings panel opened', 'info');
        createRippleEffect(this);
    });
    
    function createRippleEffect(button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
        `;
        
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        .action-btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#2ecc71' : '#3498db'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        // Add CSS for animation
        const notificationStyle = document.createElement('style');
        notificationStyle.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(notificationStyle);
        
        document.body.appendChild(notification);
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', function() {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);
    }
    
    // Container 6: Animated Slider
    const animatedSlides = document.querySelectorAll('.animated-slide');
    const animDots = document.querySelectorAll('.anim-dot');
    const prevAnimSlide = document.getElementById('prevAnimSlide');
    const nextAnimSlide = document.getElementById('nextAnimSlide');
    const autoPlayToggle = document.getElementById('autoPlayToggle');
    let currentAnimSlide = 0;
    let animInterval;
    
    function showAnimSlide(index) {
        animatedSlides.forEach(slide => slide.classList.remove('active-slide'));
        animDots.forEach(dot => dot.classList.remove('active'));
        
        if (index >= animatedSlides.length) currentAnimSlide = 0;
        else if (index < 0) currentAnimSlide = animatedSlides.length - 1;
        else currentAnimSlide = index;
        
        animatedSlides[currentAnimSlide].classList.add('active-slide');
        animDots[currentAnimSlide].classList.add('active');
    }
    
    function nextAnimSlideFunc() {
        showAnimSlide(currentAnimSlide + 1);
    }
    
    function startAnimInterval() {
        if (autoPlayToggle.checked) {
            animInterval = setInterval(nextAnimSlideFunc, 4000);
        }
    }
    
    function stopAnimInterval() {
        clearInterval(animInterval);
    }
    
    prevAnimSlide.addEventListener('click', function() {
        showAnimSlide(currentAnimSlide - 1);
        stopAnimInterval();
        startAnimInterval();
    });
    
    nextAnimSlide.addEventListener('click', function() {
        showAnimSlide(currentAnimSlide + 1);
        stopAnimInterval();
        startAnimInterval();
    });
    
    animDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showAnimSlide(index);
            stopAnimInterval();
            startAnimInterval();
        });
    });
    
    autoPlayToggle.addEventListener('change', function() {
        if (this.checked) {
            startAnimInterval();
        } else {
            stopAnimInterval();
        }
    });
    
    // Mobile Bottom Navigation
    const bottomNavItems = document.querySelectorAll('.nav-item');
    bottomNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            bottomNavItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show notification for demo
            const navText = this.querySelector('span').textContent;
            showNotification(`Navigating to ${navText}`, 'info');
        });
    });
    
    // Mobile App Update Button
    const updateBtn = document.querySelector('.app-btn');
    if (updateBtn) {
        updateBtn.addEventListener('click', function() {
            showNotification('Checking for updates...', 'info');
            // Simulate update check
            setTimeout(() => {
                showNotification('App is up to date!', 'success');
            }, 1500);
        });
    }
    
    // Initialize everything
    showSlide(0);
    showCarouselSlide(0);
    showAnimSlide(0);
    startAnimInterval();
    updateSliderPosition();
    
    // Touch-friendly adjustments for mobile
    if ('ontouchstart' in window) {
        // Increase touch target sizes
        const buttons = document.querySelectorAll('button, .slider-btn, .action-btn');
        buttons.forEach(btn => {
            btn.style.minHeight = '44px';
            btn.style.minWidth = '44px';
        });
        
        // Add active states for touch feedback
        document.addEventListener('touchstart', function() {}, {passive: true});
    }
    
    // Window resize handling
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Close sidebar on resize to desktop
            if (window.innerWidth > 768) {
                closeSidebar();
            }
            // Update slider position
            updateSliderPosition();
        }, 250);
    });
});