// Variables globales
let currentSlide = 1;
const totalSlides = 14;
let touchStartX = 0;
let touchEndX = 0;

// Elementos DOM
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slideIndicator = document.getElementById('slideIndicator');
const swipeHint = document.getElementById('swipeHint');

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    updateSlide();
    updateIndicator();
    
    // Ocultar hint después de 5 segundos
    setTimeout(() => {
        swipeHint.classList.add('hidden');
    }, 5000);
});

// Navegación con botones
prevBtn.addEventListener('click', () => {
    if (currentSlide > 1) {
        currentSlide--;
        updateSlide();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides) {
        currentSlide++;
        updateSlide();
    }
});

// Navegación con teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentSlide > 1) {
        currentSlide--;
        updateSlide();
    } else if (e.key === 'ArrowRight' && currentSlide < totalSlides) {
        currentSlide++;
        updateSlide();
    }
});

// Navegación táctil (swipe)
document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentSlide < totalSlides) {
            // Swipe left - siguiente slide
            currentSlide++;
            updateSlide();
            swipeHint.classList.add('hidden');
        } else if (diff < 0 && currentSlide > 1) {
            // Swipe right - slide anterior
            currentSlide--;
            updateSlide();
            swipeHint.classList.add('hidden');
        }
    }
}

// Actualizar slide visible
function updateSlide() {
    // Ocultar todas las slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Mostrar slide actual
    const activeSlide = document.querySelector(`[data-slide="${currentSlide}"]`);
    if (activeSlide) {
        activeSlide.classList.add('active');
    }
    
    // Actualizar botones
    prevBtn.disabled = currentSlide === 1;
    nextBtn.disabled = currentSlide === totalSlides;
    
    // Actualizar indicador
    updateIndicator();
    
    // Scroll al inicio de la slide
    window.scrollTo(0, 0);
}

// Actualizar indicador de slide
function updateIndicator() {
    slideIndicator.textContent = `${currentSlide} / ${totalSlides}`;
}

// Prevenir scroll horizontal accidental
let isScrolling = false;
document.addEventListener('scroll', () => {
    if (!isScrolling) {
        isScrolling = true;
        setTimeout(() => {
            isScrolling = false;
        }, 100);
    }
});

// Animación suave al cambiar de slide
function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Auto-ocultar hint al interactuar
document.addEventListener('click', () => {
    if (!swipeHint.classList.contains('hidden')) {
        swipeHint.classList.add('hidden');
    }
});

// Soporte para rueda del mouse (opcional)
let scrollTimeout;
document.addEventListener('wheel', (e) => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (e.deltaY > 0 && currentSlide < totalSlides) {
            // Scroll down
            currentSlide++;
            updateSlide();
        } else if (e.deltaY < 0 && currentSlide > 1) {
            // Scroll up
            currentSlide--;
            updateSlide();
        }
    }, 150);
}, { passive: true });

// Precargar imagen
const img = new Image();
img.src = 'orlando-munoz.jpg';

// Función para compartir (si se desea agregar)
function sharePresentation() {
    if (navigator.share) {
        navigator.share({
            title: 'Orlando Muñoz - 1er Informe',
            text: '10 Iniciativas Clave del Regidor Orlando Muñoz Gómez',
            url: window.location.href
        }).catch(() => {
            // Error al compartir
        });
    }
}

// Detección de orientación para optimización móvil
window.addEventListener('orientationchange', () => {
    updateSlide();
});

// Mensaje de console para desarrolladores
console.log('%c🌟 Orlando Muñoz - 1er Informe 🌟', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cPresentación desarrollada para móviles', 'color: #764ba2; font-size: 14px;');
