window.onload = function () {
  const swiper = new Swiper('.hero-banner', {
    centeredSlides: true,
    slidesPerView: 3,
    spaceBetween: 0,

    // pagination: {
    //   el: ".swiper-pagination",
    //   clickable: true,
    // },

    autoplay: {
      delay: 5000,
    },
    speed: 1500,
    loop: true,

    navigation: {
      nextEl: '.swiper-next',
      prevEl: '.swiper-prev',
    },

    on: {
      init() {
        document.querySelector('.swiper-total-count').textContent = this.slides.length;
      },
      activeIndexChange() {
        document.querySelector('.swiper-current-count').textContent = this.realIndex + 1;
      },
    },
  });

  window.addEventListener('scroll', function () {
    const y = window.scrollY;
    const display = y > 100 ? 'flex' : 'none';
    document.querySelector('.go-top').style.display = display;
  });
};
