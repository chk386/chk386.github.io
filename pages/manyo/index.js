window.onload=function(){new Swiper(".hero-banner",{slidesPerView:1,spaceBetween:0,autoplay:{delay:5e3},speed:1499,loop:!0,navigation:{nextEl:".swiper-next",prevEl:".swiper-prev"},on:{init(){},activeIndexChange(){}}});const e=document.querySelector(".top-banner");new IntersectionObserver((([e])=>{const n=e.isIntersecting?"":"none",o=e.isIntersecting?"":"white",t=e.isIntersecting?"50px":"0px";document.querySelectorAll(".navbar, .logo, .kakaosync").forEach((e=>{e.style.display=n})),document.querySelector("header").style.backgroundColor=o,document.querySelector("header").style.top=t}),{threshold:[1]}).observe(e)};