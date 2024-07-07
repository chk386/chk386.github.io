window.onload = function () {
  const swiper = new Swiper('.hero-banner', {
    // centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 0,

    // pagination: {
    //   el: ".swiper-pagination",
    //   clickable: true,
    // },

    autoplay: {
      delay: 5000,
    },
    speed: 1499,
    loop: true,

    navigation: {
      nextEl: '.swiper-next',
      prevEl: '.swiper-prev',
    },

    on: {
      init() {
        // document.querySelector('.swiper-total-count').textContent = this.slides.length;
      },
      activeIndexChange() {
        // document.querySelector('.swiper-current-count').textContent = this.realIndex + 1;
      },
    },
  });

  const el = document.querySelector('.top-banner');
  const observer = new IntersectionObserver(
    ([e]) => {
      const display = e.isIntersecting ? '' : 'none';
      const color = e.isIntersecting ? '' : 'white';
      const top = e.isIntersecting ? '50px' : '0px';

      document.querySelectorAll('.navbar, .logo, .kakaosync').forEach(x => {
        x.style.display = display;
      });

      document.querySelector('header').style.backgroundColor = color;
      document.querySelector('header').style.top = top;
    },
    { threshold: [1] },
  );

  observer.observe(el);
};
