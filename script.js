// Image Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all slider elements
    const sliderImages = document.querySelectorAll('.slider-img');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    // Function to show a specific slide
    function showSlide(slideIndex) {
        // Hide all slides
        sliderImages.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Handle loop
        if (slideIndex >= sliderImages.length) {
            currentSlide = 0;
        } else if (slideIndex < 0) {
            currentSlide = sliderImages.length - 1;
        } else {
            currentSlide = slideIndex;
        }
        
        // Show current slide
        sliderImages[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Previous slide
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Auto slide every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Reset interval when user interacts
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Event listeners
    prevBtn.addEventListener('click', function() {
        prevSlide();
        resetInterval();
    });
    
    nextBtn.addEventListener('click', function() {
        nextSlide();
        resetInterval();
    });
    
    // Dot click events
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            showSlide(slideIndex);
            resetInterval();
        });
    });
    
    // Button click events
    const buttonA = document.getElementById('buttonA');
    const buttonB = document.getElementById('buttonB');
    
    buttonA.addEventListener('click', function() {
        alert('Button A clicked: Exporting data...');
    });
    
    buttonB.addEventListener('click', function() {
        alert('Button B clicked: Refreshing dashboard...');
    });
    
    // Container click events
    const containerCards = document.querySelectorAll('.container-card');
    containerCards.forEach(card => {
        card.addEventListener('click', function() {
            const containerId = this.id;
            const containerNumber = containerId.replace('container', '');
            alert(`Container ${containerNumber} clicked!`);
        });
    });
    
    // Initialize the slider
    showSlide(0);
});