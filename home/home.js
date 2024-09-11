let angle = 0;

function rotateCarousel(direction) {
    angle += direction * 60;
    document.querySelector('.carousel__container').style.transform = `translateZ(-400px) rotateY(${angle}deg)`;
}
