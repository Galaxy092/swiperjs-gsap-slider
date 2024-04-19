import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

const swiper = new Swiper('.custom-slider .swiper', {
  speed: 1300,
  allowTouchMove: false,
  parallax: true,
  on: {
    transitionStart: handleTransitionStart,
    transitionEnd: handleTransitionEnd,
    init: handleInit,
  },
});

const btnPrev = document.querySelector('.navigator .swiper-button-prev');
btnPrev.addEventListener('click', handlePrevClick);

const btnNext = document.querySelector('.navigator .swiper-button-next');
btnNext.addEventListener('click', handleNextClick);

function handleTransitionStart(e) {
  const { slides, activeIndex, previousIndex } = e;
  const active = slides[activeIndex];
  const prev = slides[previousIndex];
  const motion = gsap.timeline();

  motion
    .to(prev.querySelector('.img'), {
      duration: 1,
      ease: 'cubic-bezier(.5,0,0,1)',
      scale: 0.6,
    })
    .to(
      prev.querySelector('img'),
      { duration: 1, ease: 'cubic-bezier(.5,0,0,1)', scale: 1.2 },
      '<'
    )
    .to(prev.querySelector('.title'), { color: 'transparent' }, '<');
}

function handleTransitionEnd(e) {
  const { slides, activeIndex } = e;
  const active = slides[activeIndex];
  const motion = gsap.timeline();

  motion
    .to(active.querySelector('.img'), {
      duration: 1,
      ease: 'cubic-bezier(.5,0,0,1)',
      scale: 1,
    })
    .to(
      active.querySelector('img'),
      { duration: 1, ease: 'cubic-bezier(.5,0,0,1)', scale: 1 },
      '<'
    )
    .to(active.querySelector('.title'), { color: 'white' }, '<');

  document
    .querySelector('.swiper-button-prev')
    .classList.toggle('swiper-button-disabled', activeIndex === 0);
  document
    .querySelector('.swiper-button-next')
    .classList.toggle(
      'swiper-button-disabled',
      activeIndex === slides.length - 1
    );
}

function handleInit(e) {
  e.emit('transitionEnd');
}

function handlePrevClick(e) {
  e.preventDefault();
  swiper.slidePrev();
}

function handleNextClick(e) {
  e.preventDefault();
  swiper.slideNext();
}
