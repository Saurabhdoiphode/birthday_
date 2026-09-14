/* Romantic Birthday App Engine - Expanded Romantic Lines & Sound Engine */

// Global state for theme & particles
window.currentTheme = 'velvet-midnight';

const themePalettes = {
  'velvet-midnight': { primary: '#ff4d6d', secondary: '#c77dff', gold: '#ffd166' },
  'pink-romance': { primary: '#ff758f', secondary: '#ffccd5', gold: '#ffe066' },
  'golden-sunset': { primary: '#ffb703', secondary: '#fb8500', gold: '#fff3b0' },
  'neon-moonlight': { primary: '#00f5d4', secondary: '#f72585', gold: '#4cc9f0' }
};

// Floating Particles Background Canvas
class BackgroundParticles {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.maxParticles = 55;

    this.resize();
    this.init();
    this.animate();

    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height + this.canvas.height,
      size: Math.random() * 16 + 8,
      speedY: Math.random() * 1.5 + 0.5,
      speedX: Math.random() * 1 - 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      isHeart: Math.random() > 0.25
    };
  }

  drawHeart(ctx, x, y, size, opacity, rotation, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color || '#ff4d6d';
    ctx.shadowColor = color || '#ff758f';
    ctx.shadowBlur = 10;

    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
    ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.2);
    ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
    ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawStar(ctx, x, y, size, opacity, color) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color || '#ffe066';
    ctx.shadowColor = color || '#ffe066';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(x, y, size / 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const palette = themePalettes[window.currentTheme] || themePalettes['velvet-midnight'];

    this.particles.forEach((p) => {
      p.y -= p.speedY;
      p.x += Math.sin(p.y * 0.01) * 0.5;
      p.rotation += p.rotSpeed;

      if (p.y < -30) {
        Object.assign(p, this.createParticle());
        p.y = this.canvas.height + 20;
      }

      if (p.isHeart) {
        this.drawHeart(this.ctx, p.x, p.y, p.size, p.opacity, p.rotation, palette.primary);
      } else {
        this.drawStar(this.ctx, p.x, p.y, p.size, p.opacity, palette.gold);
      }
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Live Theme Switcher Logic
window.setTheme = function(themeName) {
  window.currentTheme = themeName;
  document.documentElement.setAttribute('data-theme', themeName);

  const buttons = document.querySelectorAll('.theme-btn');
  buttons.forEach(btn => {
    if (btn.dataset.theme === themeName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (window.carousel3D) {
    window.carousel3D.arrangeCards();
  }
};

// Lightbox modal helper
window.openLightbox = function(imageSrc, captionText) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');

  if (modal && img) {
    img.src = imageSrc;
    if (caption) caption.innerText = captionText || '';
    modal.classList.add('active');
  }
};

window.closeLightbox = function() {
  const modal = document.getElementById('lightboxModal');
  if (modal) modal.classList.remove('active');
};

// Animated Subtitle Typing Effect with Deeply Romantic Best Lines
function initTypingEffect() {
  const phrases = [
    "Wishing the happiest birthday to my favorite person! ❤️",
    "With you, every single day feels like a dream come true ✨",
    "My heart found its home the moment I met you, Shree 💕",
    "Tu Hai Kahan... Always in my thoughts, heart & soul 🎵💖",
    "You are my today, my tomorrow, and my forever 🥂✨"
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const target = document.getElementById('typingText');

  if (!target) return;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      target.innerText = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.innerText = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 35 : 75;

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2400;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 450;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// Super Animated Birthday Cake Candle Blowing
function initCakeLogic() {
  const cake = document.getElementById('birthdayCake');
  const flames = document.querySelectorAll('.flame');
  const candles = document.querySelectorAll('.candle');
  const wishMessage = document.getElementById('cakeWishMsg');

  if (!cake) return;
  let blownOut = false;

  cake.addEventListener('click', () => {
    if (blownOut) return;
    blownOut = true;

    flames.forEach((flame, idx) => {
      setTimeout(() => {
        flame.classList.add('blown-out');

        const candle = candles[idx];
        if (candle) {
          const smoke = document.createElement('div');
          smoke.className = 'smoke-puff active';
          candle.appendChild(smoke);
          setTimeout(() => smoke.remove(), 2500);
        }
      }, idx * 120);
    });

    if (wishMessage) {
      setTimeout(() => {
        wishMessage.innerText = "✨ Your wishes are coming true! Happy Birthday Shree! 🎉💖";
        wishMessage.classList.add('glow-text', 'animate-bounce');
      }, 400);
    }

    triggerConfetti();
    setTimeout(() => triggerConfetti(), 800);
  });
}

// Multi-burst Confetti Launcher
function triggerConfetti() {
  if (typeof confetti === 'function') {
    const count = 240;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#ff4d6d', '#c77dff', '#ffd166'] });
    fire(0.2, { spread: 60, colors: ['#ffffff', '#ffb3c6'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, colors: ['#ffd166', '#ff4d6d'] });
  }
}

// Super Animated Secret Gift Box
function initGiftBox() {
  const giftBox = document.getElementById('giftBox');
  const giftModal = document.getElementById('giftModal');

  if (giftBox && giftModal) {
    giftBox.addEventListener('click', () => {
      if (giftBox.classList.contains('opening')) return;
      
      giftBox.classList.add('opening');
      spawnGiftHearts(giftBox);

      setTimeout(() => {
        giftModal.classList.add('active');
        triggerConfetti();
      }, 650);
    });
  }
}

function spawnGiftHearts(giftBox) {
  for (let i = 0; i < 8; i++) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.left = '50%';
    heart.style.top = '30%';
    heart.style.fontSize = `${Math.random() * 16 + 18}px`;
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '20';
    heart.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    giftBox.appendChild(heart);

    setTimeout(() => {
      const offsetX = (Math.random() - 0.5) * 160;
      const offsetY = -Math.random() * 120 - 50;
      heart.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.4) rotate(${(Math.random() - 0.5) * 60}deg)`;
      heart.style.opacity = '0';
    }, 50);

    setTimeout(() => heart.remove(), 1100);
  }
}

window.closeGiftModal = function() {
  const giftModal = document.getElementById('giftModal');
  const giftBox = document.getElementById('giftBox');
  if (giftModal) giftModal.classList.remove('active');
  if (giftBox) giftBox.classList.remove('opening');
};

// Automatic "Tu Hai Kahan" Audio Engine
class TuHaiKahanAudioEngine {
  constructor() {
    this.audio = document.getElementById('bgAudio');
    this.widget = document.getElementById('audioWidget');
    this.musicWaves = document.getElementById('musicWaves');
    this.audioText = document.getElementById('audioText');
    this.welcomeOverlay = document.getElementById('welcomeOverlay');
    this.isPlaying = false;
    this.hasStarted = false;

    this.init();
  }

  init() {
    if (!this.audio) return;

    this.audio.defaultPlaybackRate = 1.0;
    this.audio.playbackRate = 1.0;
    this.audio.volume = 0.9;

    this.audio.addEventListener('ratechange', () => {
      if (this.audio.playbackRate !== 1.0) {
        this.audio.playbackRate = 1.0;
      }
    });

    if (this.widget) {
      this.widget.addEventListener('click', () => this.togglePlay());
    }

    const startBtn = document.getElementById('startExperienceBtn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        this.playAudio();
        this.hideOverlay();
      });
    }

    const autoPlayOnUserGesture = () => {
      if (!this.hasStarted) {
        this.playAudio();
      }
      ['click', 'touchstart', 'scroll', 'pointerdown'].forEach(evt => {
        document.removeEventListener(evt, autoPlayOnUserGesture);
      });
    };

    ['click', 'touchstart', 'scroll', 'pointerdown'].forEach(evt => {
      document.addEventListener(evt, autoPlayOnUserGesture, { once: true });
    });

    this.playAudio();
  }

  hideOverlay() {
    if (this.welcomeOverlay) {
      this.welcomeOverlay.style.opacity = '0';
      setTimeout(() => this.welcomeOverlay.style.display = 'none', 400);
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pauseAudio();
    } else {
      this.playAudio();
    }
  }

  playAudio() {
    if (!this.audio) return;
    this.audio.playbackRate = 1.0;

    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.hasStarted = true;
        this.onPlaySuccess();
      }).catch(() => {
        if (this.welcomeOverlay) this.welcomeOverlay.style.display = 'flex';
      });
    }
  }

  pauseAudio() {
    if (this.audio) this.audio.pause();
    this.isPlaying = false;
    if (this.musicWaves) this.musicWaves.classList.add('paused');
    if (this.audioText) this.audioText.innerText = "Tu Hai Kahan 🎵";
  }

  onPlaySuccess() {
    this.isPlaying = true;
    if (this.musicWaves) this.musicWaves.classList.remove('paused');
    if (this.audioText) this.audioText.innerText = "Tu Hai Kahan 💕";
    this.hideOverlay();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new BackgroundParticles('bgCanvas');
  initTypingEffect();
  initCakeLogic();
  initGiftBox();
  window.audioEngine = new TuHaiKahanAudioEngine();
});
