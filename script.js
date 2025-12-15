document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully!');
    
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    
    mobileMenuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        const icon = this.querySelector('i');
        if (sidebar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const slidesContainer = document.querySelector('.slides');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let carouselInterval;
    
    function updateCarousel() {
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    function startCarousel() {
        carouselInterval = setInterval(nextSlide, 5000);
    }
    
    function resetCarousel() {
        clearInterval(carouselInterval);
        startCarousel();
    }
    
    prevBtn.addEventListener('click', function() {
        prevSlide();
        resetCarousel();
    });
    
    nextBtn.addEventListener('click', function() {
        nextSlide();
        resetCarousel();
    });
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            currentSlide = index;
            updateCarousel();
            resetCarousel();
        });
    });
    
    updateCarousel();
    startCarousel();
    
    const brightnessSlider = document.getElementById('brightnessSlider');
    const volumeSlider = document.getElementById('volumeSlider');
    const contrastSlider = document.getElementById('contrastSlider');
    const sliderValues = document.querySelectorAll('.slider-value');
    const brightValue = document.getElementById('brightValue');
    const volumeValue = document.getElementById('volumeValue');
    const contrastValue = document.getElementById('contrastValue');
    
    function updateSlider(slider, valueElement, displayElement) {
        const value = slider.value;
        valueElement.textContent = value + '%';
        if (displayElement) displayElement.textContent = value + '%';
    }
    
    brightnessSlider.addEventListener('input', function() {
        updateSlider(this, sliderValues[0], brightValue);
    });
    
    volumeSlider.addEventListener('input', function() {
        updateSlider(this, sliderValues[1], volumeValue);
    });
    
    contrastSlider.addEventListener('input', function() {
        updateSlider(this, sliderValues[2], contrastValue);
    });
    
    updateSlider(brightnessSlider, sliderValues[0], brightValue);
    updateSlider(volumeSlider, sliderValues[1], volumeValue);
    updateSlider(contrastSlider, sliderValues[2], contrastValue);
    
    const buttonA = document.getElementById('buttonA');
    const buttonB = document.getElementById('buttonB');
    const buttonResult = document.getElementById('buttonResult');
    const countA = document.getElementById('countA');
    const countB = document.getElementById('countB');
    
    let clicksA = 0;
    let clicksB = 0;
    
    buttonA.addEventListener('click', function() {
        clicksA++;
        countA.textContent = clicksA;
        
        buttonResult.innerHTML = '<p style="color: #4361ee; font-weight: bold;"><i class="fas fa-check-circle" style="margin-right: 10px;"></i>Button A clicked! Primary action activated.</p><p style="margin-top: 10px; font-size: 0.9rem;">Total clicks: ' + clicksA + '</p>';
        
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
        
        buttonResult.style.backgroundColor = 'rgba(67, 97, 238, 0.1)';
        setTimeout(() => {
            buttonResult.style.backgroundColor = '';
        }, 1000);
    });
    
    buttonB.addEventListener('click', function() {
        clicksB++;
        countB.textContent = clicksB;
        
        buttonResult.innerHTML = '<p style="color: #3a0ca3; font-weight: bold;"><i class="fas fa-cogs" style="margin-right: 10px;"></i>Button B clicked! Secondary action activated.</p><p style="margin-top: 10px; font-size: 0.9rem;">Total clicks: ' + clicksB + '</p>';
        
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
        
        buttonResult.style.backgroundColor = 'rgba(58, 12, 163, 0.1)';
        setTimeout(() => {
            buttonResult.style.backgroundColor = '';
        }, 1000);
    });
    
    const startAnimBtn = document.getElementById('startAnim');
    const stopAnimBtn = document.getElementById('stopAnim');
    const animatedBox = document.getElementById('animatedBox');
    const animStatus = document.getElementById('animStatus');
    
    let isAnimating = false;
    
    startAnimBtn.addEventListener('click', function() {
        if (!isAnimating) {
            isAnimating = true;
            
            animatedBox.classList.add('pulse');
            animatedBox.classList.add('rotate');
            
            animStatus.textContent = 'Running';
            animStatus.style.color = '#4CAF50';
            
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Animating...';
            
            stopAnimBtn.disabled = false;
            
            setTimeout(() => {
                if (isAnimating) {
                    stopAnimation();
                }
            }, 10000);
        }
    });
    
    stopAnimBtn.addEventListener('click', function() {
        stopAnimation();
    });
    
    function stopAnimation() {
        isAnimating = false;
        
        animatedBox.classList.remove('pulse');
        animatedBox.classList.remove('rotate');
        
        animStatus.textContent = 'Stopped';
        animStatus.style.color = '#f44336';
        
        startAnimBtn.disabled = false;
        startAnimBtn.innerHTML = '<i class="fas fa-play"></i> Start Animation';
        
        stopAnimBtn.disabled = true;
    }
    
    stopAnimBtn.disabled = true;
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    slidesContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slidesContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const difference = touchStartX - touchEndX;
        
        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            resetCarousel();
        }
    }
    
    console.log('All JavaScript functionality loaded!');
});