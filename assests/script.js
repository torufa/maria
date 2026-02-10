const locomotiveScroll = new LocomotiveScroll();

function mouseScale() {
  let xscale = 1;
  let yscale = 1;

  let xprev = 0;
  let yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    mouseFollow(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(".circle").style.transform =
        `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}
function mouseFollow(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    let cursor = document.querySelector(".circle");
    ((cursor.style.transform = `translate(${dets.clientX}px, ${dets.clientY}) scale(${(xscale, yscale)})`),
      (cursor.style.opacity = 1));
  });
}

function animation() {
  let tl = gsap.timeline();
  tl.to("nav", {
    transform: `translateY(-10px)`,
    duration: 1,
    opacity: 1,
  });

  document.querySelector(".menu .click").addEventListener("click", function () {
    tl.to(".main a", {
      y: 7,
      duration: 0.3,
      opacity: 1,
      stagger: 0.2,
      ease: "power1.inOut",
    });
    this.style.opacity = 0;
    this.style.zIndex = -1;
  });

  tl.to(".boxContent", {
    y: 0,
    ease: "power1.inOut",
    stagger: 0.2,
    opacity: 1,
  });

  window.addEventListener("scroll", function (e) {
    let arrow = document.querySelector(".bottom-arrow");
     if (window.scrollY > 200) {
       arrow.style.opacity = 1;
     } else {
       arrow.style.opacity = 0;
     }
  });
}


document.querySelectorAll("#portfolio .elems").forEach(function (elem) {
  let rotate = 0;
  let diffrot = 0;
  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("h3"), {
      x: 0,
      duration: 1,
      ease: "power3.out",
    });
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    let diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

    gsap.to(elem.querySelector("h3"), {
      x: 50,
      duration: 1,
      ease: "power3.out",
    });
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });

});

let now = new Date();
document.querySelector("#date").innerHTML = now.toLocaleTimeString("en-BD", {hour12: true,});

mouseFollow();
mouseScale();
animation();
