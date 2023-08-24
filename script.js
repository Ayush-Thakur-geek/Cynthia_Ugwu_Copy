let timeOut = 0;

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function circleMouseFollower(xScaleVal, yScaleVal) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#miniCircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xScaleVal}, ${yScaleVal})`;
  });
}

function LandingPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 2,
    ease: Expo.easeInOut,
  })
    .to(".bounding-elem", {
      y: 0,
      // opacity: 0,
      duration: 2,
      delay: -1,
      ease: Expo.easeInOut,
      stagger: 0.2,
    })
    .from("#LandingPageFooter", {
      y: "-10",
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

function circleSkew() {
  //define scale value
  let xScaleVal = 1;
  let yScaleVal = 1;

  let xPrev = 0;
  let yPrev = 0;
  window.addEventListener("mousemove", function (dets) {
    // console.log(dets);
    clearTimeout(timeOut);
    let xDiff = dets.clientX - xPrev;
    xScaleVal = gsap.utils.clamp(0.8, 1.2, xDiff);
    xPrev = dets.clientX;

    let yDiff = dets.clientY - yPrev;
    yScaleVal = gsap.utils.clamp(0.8, 1.2, yDiff);
    yPrev = dets.clientY;

    circleMouseFollower(xScaleVal, yScaleVal);

    timeOut = setTimeout(function () {
      document.querySelector(
        "#miniCircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

document.querySelectorAll(".elem").forEach(function (elem) {
  let diffRot = 0;
  let rotate = 0;
  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
    });
  });
  elem.addEventListener("mousemove", function (dets) {
    let diff = dets.clientY - elem.getBoundingClientRect().top;
    diffRot = dets.clientX - rotate;
    rotate = dets.clientX;

    // elem.querySelector("img").style.opacity = 1;

    //or

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffRot),
    });
  });
});

circleSkew();
circleMouseFollower();
LandingPageAnim();
