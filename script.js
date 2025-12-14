// Update time displays
function updateTimes() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    // Format time as "H:MM"
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}`;
    
    // Update header time
    document.getElementById('currentTime').textContent = formattedTime;
    
    // Update container 1 time
    document.getElementById('container1-time').textContent = formattedTime;
    
    // Update small container time
    const smallContainers = document.querySelectorAll('.small-time');
    smallContainers.forEach(container => {
        container.textContent = formattedTime;
    });
    
    // Update container stats with random values
    updateContainerStats();
}

// Update container statistics
function updateContainerStats() {
    // Random values for containers
    const containers = [
        { id: 'container6', min: 30, max: 100 },
        { id: 'container7', min: 60, max: 95 },
        { id: 'scontainer4', min: 10, max: 50 }
    ];
    
    containers.forEach(container => {
        const value = Math.floor(Math.random() * (container.max - container.min + 1)) + container.min;
        const element = document.querySelector(`#${container.id} .container-stat, #${container.id} .small-stat`);
        if (element) {
            if (container.id === 'container7') {
                element.textContent = `${value}%`;
            } else {
                element.textContent = value;
            }
        }
    });
    
    // Update progress bar
    const progress = Math.floor(Math.random() * 30) + 65; // 65-95%
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
}

// Header Image Slider Functionality
function initHeaderSlider() {
    const sliderImages = document.querySelectorAll('.slider-img');
    const sliderDots = document.querySelectorAll('.slider-dot');
    let currentHeaderSlide = 0;
    let headerSliderInterval;
    
    function showHeaderSlide(index) {
        // Hide all slides
        sliderImages.forEach(img => img.classList.remove('active'));
        sliderDots.forEach(dot => dot.classList.remove('active'));
        
        // Handle loop
        if (index >= sliderImages.length) {
            currentHeaderSlide = 0;
        } else if (index < 0) {
            currentHeaderSlide = sliderImages.length - 1;
        } else {
            currentHeaderSlide = index;
        }
        
        // Show current slide
        sliderImages[currentHeaderSlide].classList.add('active');
        sliderDots[currentHeaderSlide].classList.add('active');
    }
    
    function nextHeaderSlide() {
        showHeaderSlide(currentHeaderSlide + 1);
    }
    
    function startSliderInterval() {
        headerSliderInterval = setInterval(nextHeaderSlide, 4000);
    }
    
    // Start auto-sliding
    startSliderInterval();
    
    // Dot click events
    sliderDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            showHeaderSlide(slideIndex);
            
            // Restart interval after manual interaction
            clearInterval(headerSliderInterval);
            setTimeout(startSliderInterval, 10000);
        });
    });
    
    // Initialize
    showHeaderSlide(0);
}

// Container click handlers
function setupContainerClicks() {
    // Large containers
    const largeContainers = document.querySelectorAll('.container-item');
    largeContainers.forEach(container => {
        container.addEventListener('click', function() {
            const containerId = this.id;
            const containerNum = containerId.replace('container', '');
            
            // Visual feedback
            this.style.transform = 'scale(0.98)';
            this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            
            // Show alert
            setTimeout(() => {
                alert(`Container ${containerNum} clicked`);
                this.style.transform = '';
                this.style.boxShadow = '';
            }, 200);
        });
    });
    
    // Small containers
    const smallContainers = document.querySelectorAll('.small-container');
    smallContainers.forEach(container => {
        container.addEventListener('click', function() {
            const containerId = this.id;
            const containerNum = containerId.replace('scontainer', '');
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            this.style.backgroundColor = '#f8f9fa';
            
            // Show alert
            setTimeout(() => {
                alert(`Small Container ${containerNum} clicked`);
                this.style.transform = '';
                this.style.backgroundColor = '';
            }, 200);
        });
    });
    
    // Tab bar clicks
    const tabItems = document.querySelectorAll('.tab-item');
    tabItems.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabItems.forEach(item => {
                item.classList.remove('active');
                item.style.transform = 'scale(1)';
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            this.style.transform = 'scale(1.1)';
            
            // Get tab name
            const tabName = this.querySelector('span').textContent;
            
            // Show notification
            const notification = document.createElement('div');
            notification.className = 'tab-notification';
            notification.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>Switched to ${tabName}</span>
            `;
            notification.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 15px 25px;
                border-radius: 15px;
                display: flex;
                align-items: center;
                gap: 10px;
                font-weight: 500;
                z-index: 1000;
                animation: fadeInOut 1.5s ease;
            `;
            
            // Add animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translate(-50%, -40%); }
                    20% { opacity: 1; transform: translate(-50%, -50%); }
                    80% { opacity: 1; transform: translate(-50%, -50%); }
                    100% { opacity: 0; transform: translate(-50%, -60%); }
                }
            `;
            document.head.appendChild(style);
            
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 1500);
        });
    });
}

// Animate containers on load
function animateContainers() {
    const containers = document.querySelectorAll('.container-item');
    containers.forEach((container, index) => {
        setTimeout(() => {
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Update time immediately
    updateTimes();
    
    // Update time every minute
    setInterval(updateTimes, 60000);
    
    // Update stats every 30 seconds
    setInterval(updateContainerStats, 30000);
    
    // Initialize header slider
    initHeaderSlider();
    
    // Setup click handlers
    setupContainerClicks();
    
    // Animate containers
    animateContainers();
    
    // Add some interactivity to the slider
    const headerSlider = document.querySelector('.header-slider');
    if (headerSlider) {
        headerSlider.addEventListener('mouseenter', () => {
            clearInterval(window.headerSliderInterval);
        });
        
        headerSlider.addEventListener('mouseleave', () => {
            initHeaderSlider();
        });
    }
});

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .container-item {
        transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease;
    }
    
    .small-container {
        transition: transform 0.2s ease, background-color 0.2s ease;
    }
    
    .tab-item {
        transition: color 0.3s ease, transform 0.3s ease;
    }
    
    .slider-img {
        transition: opacity 0.8s ease-in-out;
    }
    
    .progress-bar {
        transition: width 0.5s ease;
    }
`;
document.head.appendChild(animationStyles);