/* 3D Circular Auto-Scrolling Photo Carousel ("Round Madhe Auto Scroll") - Mobile Responsive Optimized */

class Carousel3D {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.ring = this.container.querySelector('.carousel-ring');
    this.cards = Array.from(this.container.querySelectorAll('.carousel-card'));
    this.count = this.cards.length;

    this.autoRotateSpeed = options.speed || 0.3; // speed of auto rotation
    this.currentAngle = 0;
    this.isPaused = false;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.dragStartAngle = 0;
    this.touchDirectionChecked = false;
    this.isHorizontalSwipe = false;

    this.init();
  }

  calculateRadius() {
    const isMobile = window.innerWidth <= 640;
    const cardWidth = isMobile ? (window.innerWidth <= 380 ? 150 : 170) : 240;
    // Calculate radius for N cards around a circle
    return Math.round((cardWidth / 2) / Math.tan(Math.PI / this.count)) + (isMobile ? 25 : 40);
  }

  init() {
    this.arrangeCards();
    this.bindEvents();
    this.animate();
  }

  arrangeCards() {
    const angleStep = 360 / this.count;
    this.radius = this.calculateRadius();

    this.cards.forEach((card, index) => {
      const angle = index * angleStep;
      card.style.transform = `rotateY(${angle}deg) translateZ(${this.radius}px)`;
      card.dataset.angle = angle;
      card.dataset.index = index;

      // Click / tap to open lightbox
      card.onclick = (e) => {
        if (!this.isDragging && !this.isHorizontalSwipe) {
          const img = card.querySelector('img');
          const caption = card.querySelector('.card-caption')?.innerText || '';
          if (img && window.openLightbox) {
            window.openLightbox(img.src, caption);
          }
        }
      };
    });
  }

  bindEvents() {
    // Hover pause on desktop
    this.container.addEventListener('mouseenter', () => this.isPaused = true);
    this.container.addEventListener('mouseleave', () => {
      if (!this.isDragging) this.isPaused = false;
    });

    // Mouse drag for desktop
    this.container.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.isPaused = true;
      this.startX = e.clientX;
      this.dragStartAngle = this.currentAngle;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.startX;
      this.currentAngle = this.dragStartAngle + (deltaX * 0.4);
      this.updateTransform();
    });

    window.addEventListener('mouseup', () => {
      if (this.isDragging) {
        this.isDragging = false;
        setTimeout(() => this.isPaused = false, 1200);
      }
    });

    // Smart Touch swipe for mobile (distinguishes vertical page scroll vs horizontal ring rotation)
    this.container.addEventListener('touchstart', (e) => {
      this.isDragging = true;
      this.isPaused = true;
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
      this.dragStartAngle = this.currentAngle;
      this.touchDirectionChecked = false;
      this.isHorizontalSwipe = false;
    }, { passive: true });

    this.container.addEventListener('touchmove', (e) => {
      if (!this.isDragging) return;
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const deltaX = currentX - this.startX;
      const deltaY = currentY - this.startY;

      if (!this.touchDirectionChecked) {
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
          this.isHorizontalSwipe = true;
        }
        this.touchDirectionChecked = true;
      }

      if (this.isHorizontalSwipe) {
        this.currentAngle = this.dragStartAngle + (deltaX * 0.55);
        this.updateTransform();
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      if (this.isDragging) {
        this.isDragging = false;
        setTimeout(() => {
          this.isPaused = false;
          this.isHorizontalSwipe = false;
        }, 1200);
      }
    });

    // Window resize recalculation for responsiveness
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => this.arrangeCards(), 150);
    });

    // Prev / Next control buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const rotateStep = 360 / this.count;

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.currentAngle += rotateStep;
        this.updateTransform();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.currentAngle -= rotateStep;
        this.updateTransform();
      });
    }
  }

  updateTransform() {
    this.ring.style.transform = `rotateY(${this.currentAngle}deg)`;
  }

  animate() {
    if (!this.isPaused && !this.isDragging) {
      this.currentAngle += this.autoRotateSpeed;
      this.updateTransform();
    }
    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.carousel3D = new Carousel3D('carousel3d', { speed: 0.3 });
});
