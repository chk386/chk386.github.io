window.onload=function(){new Swiper(".hero-banner",{centeredSlides:!0,slidesPerView:3,spaceBetween:0,autoplay:{delay:5e3},speed:1500,loop:!0,navigation:{nextEl:".swiper-next",prevEl:".swiper-prev"},on:{init(){document.querySelector(".swiper-total-count").textContent=this.slides.length},activeIndexChange(){document.querySelector(".swiper-current-count").textContent=this.realIndex+1}}});window.addEventListener("scroll",(function(){const e=window.scrollY>100?"flex":"none";document.querySelector(".go-top").style.display=e}))};