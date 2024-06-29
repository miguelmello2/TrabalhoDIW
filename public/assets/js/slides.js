async function loadCarousel() {
    const response = await fetch('http://localhost:3000/slides');
    const slides = await response.json();
  
    const carouselContent = document.getElementById('carousel-content');
  
    slides.forEach((slide, index) => {
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');
      if (index === 0) {
        carouselItem.classList.add('active');
      }
      carouselItem.innerHTML = `
        <a href="${slide.link}" target="_blank">
          <img class="d-block w-100" src="${slide.image}" alt="${slide.title}">
        </a>
        <div class="carousel-caption d-none d-md-block">
          <h5>${slide.title}</h5>
          <p>${slide.description}</p>
        </div>
      `;
      carouselContent.appendChild(carouselItem);
    });
  }
  
  loadCarousel();
  