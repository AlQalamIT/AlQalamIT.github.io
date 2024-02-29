// Aggiungi script JavaScript per gestire il carosello

const images = document.querySelectorAll('.carousel-image');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

// Nascondi tutte le immagini tranne la prima
images.forEach((image, index) => {
    if (index !== currentIndex) {
        image.style.display = 'none';
    }
});

// Gestisci il clic sul tasto "Precedente"
prevBtn.addEventListener('click', () => {
    images[currentIndex].style.display = 'none';
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    images[currentIndex].style.display = 'block';
});

// Gestisci il clic sul tasto "Successiva"
nextBtn.addEventListener('click', () => {
    images[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].style.display = 'block';
});
