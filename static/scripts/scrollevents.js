gsap.registerPlugin(ScrollTrigger);

const secondContainer = document.querySelector(".secondContainer");
const midTextContainer = document.querySelector(".midTextContainer");

const headingEl = document.querySelector(".introHeading");
const scrollThumb = document.querySelector(".scrollBarThumb");
const scrollBarTrack = document.querySelector(".scrollBarTrack");

window.addEventListener("scroll", function () {
  let scrollPosition = window.scrollY;
  let banner = document.getElementById("banner");
  let bannerHeight = banner.offsetHeight;
  updateScrollbar();

  // Hide scrollbar when not scrolling
  function scrollBarToggle() {
    if (lenis?.actualScroll === lenis?.targetScroll) {
      scrollBarTrack.style.opacity = "0";
    } else {
      scrollBarTrack.style.opacity = "1";
    }
  }
  setTimeout(scrollBarToggle, 200);

  const secondContainerNav = document.querySelector(".secondContainerNavContainer");
  const midText = document.getElementById("MidText");
  const midText2 = document.getElementById("MidText2");
  const secondContainerElements = [
    document.querySelector(".leftSecondContainer"),
    document.querySelector(".rightSecondContainer"),
  ];
  const pagination = document.querySelector(".pagination");
  const imageGallery = document.getElementById("ImageGallery");

  if (scrollPosition < bannerHeight / 2) {
    banner.style.scale = 1 - scrollPosition / bannerHeight / 20;
  } else {
    banner.style.scale = 1 - 1 / 40;
  }

  if (scrollPosition < bannerHeight) {
    midText.style.top = `${100 - ((scrollPosition - bannerHeight / 2) / bannerHeight) * 100}%`;
    banner.style.backgroundPositionY = `${80 - (scrollPosition / bannerHeight) * 225}%`;
    banner.style.borderRadius = `${(scrollPosition / bannerHeight) * 5}vw`;
    midText.innerHTML = "IMMERSE YOURSELF IN A WORLD OF ENDLESS MODS.";
  } else if (scrollPosition < bannerHeight * 2) {
    midText.style.transform = "translateY(-50%)";
    midText2.style.transform = "translateY(100vh)";
    let text = midText.textContent.split("");
    let n = Math.floor(((scrollPosition - bannerHeight) / bannerHeight) * (text.length + 1));
    for (let i = 0; i < text.length; i++) {
      if (i < n) {
        text[i] = '<span class="highlight">' + text[i] + "</span>";
      }
    }
    midText.innerHTML = text.join("");
  } else if (scrollPosition < bannerHeight * 3.5) {
    midText.style.transform = "translateY(-120vh)";
    if (scrollPosition < bannerHeight * 2.5) {
      midText2.style.top = `${100 - ((scrollPosition - bannerHeight * 2) / bannerHeight) * 100}%`;
      midText2.style.transform = "translateY(-150%)";
      midText2.innerHTML = "WHERE EVERY BLOCK TELLS A STORY.";
    } else {
      midText2.style.transform = "translateY(-150%)";
      let text2 = midText2.textContent.split("");
      n = Math.floor(((scrollPosition - bannerHeight * 2.5) / bannerHeight) * (text2.length + 1));
      for (let i = 0; i < text2.length; i++) {
        if (i < n) {
          text2[i] = '<span class="highlight">' + text2[i] + "</span>";
        }
      }
      midText2.innerHTML = text2.join("");
    }
    secondContainerElements.forEach(function (element) {
      element.style.top = "10%";
      element.style.opacity = "0";
    });
    if (midTextContainer.style.position !== "fixed") {
      midTextContainer.style.position = "fixed";
      midTextContainer.style.top = "0";
    }
  } else if (scrollPosition < bannerHeight * 4.5) {
    scrollBarTrack.classList.remove("light");

    if (midTextContainer.style.position !== "absolute") {
      midText2.style.transform = "translateY(-100vh)";
      midTextContainer.style.position = "absolute";
      midTextContainer.style.top = `${bannerHeight * 3.5}px`;
    }
    let scrollPercent =
      (scrollPosition - bannerHeight * 3.5) / (bannerHeight * 4.5 - bannerHeight * 3.5);
    scrollPercent = Math.min(1, Math.max(0, scrollPercent));
    secondContainerElements.forEach(function (element) {
      element.style.top = `${10 - scrollPercent * (10 - 0)}%`;
      element.style.opacity = `${0 - scrollPercent * (0 - 1)}`;
    });
    if (scrollPosition >= bannerHeight * 4) {
      scrollPercent = (scrollPosition - bannerHeight * 4) / (bannerHeight * 4.5 - bannerHeight * 4);
      secondContainerNav.style.top = `${-12.5 - scrollPercent * (-12.5 - 0)}vh`;
    } else {
      secondContainerNav.style.top = "-12.5vh";
    }
    let thirdContainerTransition = document.getElementById("thirdcontainer-transition");
    thirdContainerTransition.style.transform = `translateY(100%)`;
  } else if (scrollPosition < bannerHeight * 5) {
    scrollBarTrack.classList.add("light");

    secondContainerElements.forEach(function (element) {
      element.style.top = "0%";
      element.style.opacity = "1";
    });
    imageContainer.style.width = "";
    imageContainer.style.height = "";
    imageContainer.style.left = "";
    imageContainer.style.top = "";
    imageContainer.style.borderRadius = "";
    imageContainer.classList.remove("transition3C");
    imageGallery.classList.remove("preTransition3C");
    secondContainerNav.style.top = "0vh";
    let thirdContainerTransition = document.getElementById("thirdcontainer-transition");
    thirdContainerTransition.style.transform = `translateY(100%)`;
  } else if (scrollPosition < bannerHeight * 6.5) {
    secondContainer.style.position = "fixed";
    secondContainerNav.style.position = "fixed";
    if (scrollPosition >= bannerHeight * 5.5) {
      if (document.querySelector(".titleTabSelected") === null) {
        imageGallery.classList.add("preTransition3C");
        let scrollPercent =
          (scrollPosition - bannerHeight * 5.5) / (bannerHeight * 6 - bannerHeight * 5.5);
        let width = window.innerWidth > 0 ? window.innerWidth : screen.width;
        scrollPercent = Math.min(1, Math.max(0, scrollPercent));
        let thirdContainerTransition = document.getElementById("thirdcontainer-transition");
        thirdContainerTransition.style.transform = `translateY(${
          100 - scrollPercent * (100 + 10)
        }%)`;
        pagination.classList.add("changeModpack");
        if (scrollPosition >= bannerHeight * 5.75) {
          imageContainer.classList.add("transition3C");
          scrollPercent =
            (scrollPosition - bannerHeight * 5.75) / (bannerHeight * 6.5 - bannerHeight * 5.75);
          scrollPercent = Math.min(1, Math.max(0, scrollPercent));
          if (width > 767) {
            imageContainer.style.width = `${42.5 + scrollPercent * (100 - 42.5)}vw`;
            imageContainer.style.height = `${74.375 + scrollPercent * (100 - 74.375)}vh`;
            imageContainer.style.left = `${3.75 + scrollPercent * (-50 - 3.75)}vw`;
            imageContainer.style.top = `${6.5625 + scrollPercent * (-12.5 - 6.5625)}vh`;
          } else {
            //template: ${start} + ${scrollPercent} * (${end} - ${start})
            imageContainer.style.height = `${
              (87.5 / 2) * 0.85 + scrollPercent * (100 - (87.5 / 2) * 0.85)
            }lvh`;
            imageContainer.style.width = `${85 + scrollPercent * (100 - 85)}lvw`;
            imageContainer.style.left = `${7.5 + scrollPercent * (0 - 7.5)}lvw`;
            imageContainer.style.top = `${0 + scrollPercent * (-(12.5 + 87.5 * 0.5) - 0)}lvh`;
          }
          imageContainer.style.borderRadius = `${1.75 - scrollPercent * (1.75 - 0)}vw`;
          secondContainerElements[0].style.filter = `blur(${scrollPercent * 5}px)`;
          secondContainerNav.style.filter = `blur(${scrollPercent * 5}px)`;
        } else {
          imageContainer.classList.remove("transition3C");
          imageContainer.style.width = "";
          imageContainer.style.height = "";
          imageContainer.style.left = "";
          imageContainer.style.top = "";
          secondContainerElements[0].style.filter = `blur(0px)`;
          secondContainerNav.style.filter = `blur(0px)`;
        }
      }
    } else {
      let thirdContainerTransition = document.getElementById("thirdcontainer-transition");
      thirdContainerTransition.style.transform = `translateY(100%)`;
      if (scrollPosition >= bannerHeight * 5.4) {
        pagination.classList.remove("changeModpack");
      }
      secondContainerElements[0].style.filter = `blur(0px)`;
      secondContainerNav.style.filter = `blur(0px)`;
      imageGallery.classList.remove("preTransition3C");
    }
  } else if (scrollPosition < bannerHeight * 12.5) {
    let thirdContainerTransition = document.getElementById("thirdcontainer-transition");
    secondContainer.style.position = "absolute";
    secondContainerNav.style.position = "absolute";
    if (document.querySelector(".titleTabSelected") === null) {
      thirdContainerTransition.style.transform = `translateY(-10%)`;
      secondContainerElements[0].style.filter = `blur(5px)`;
      secondContainerNav.style.filter = `blur(5px)`;
    }
  }
});

// Gsap Stuff -- ParallelXL
gsap.registerPlugin(ScrollTrigger);

// Scroll to reveal for the modSection Intro Heading
Array.from(headingEl.children).forEach((element) => {
  gsap.to(element, {
    opacity: 1,
    scrollTrigger: {
      trigger: element,
      start: "top 93%",
      end: "bottom 72%",
      scrub: true,
    },
  });
});

// --------- Mod Section ---------

const parentDiv = document.querySelector(".parallaxHeadings");

let modTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".modSection",
    start: "top top",
    end: "+=7200px",
    pin: true,
    scrub: 0.1,
  },
});

const animations = {
  opacity: { opacity: 1, duration: 1.2, ease: "power1.in" },
  fontSize: { fontSize: "1.6vw", duration: 10, ease: "power1.in" },

  hideHeading: { y: "-100%", duration: "2.3" },
  showHeading: { y: "100%", duration: "2.3" },

  toTopLeft: {
    width: "38vw",
    height: "42vw",
    top: "0%",
    left: "0%",
    x: "-100%",
    y: "-100%",
    duration: 10,
    ease: "power1.in",
  },
  toTopRight: {
    width: "38vw",
    height: "42vw",
    top: "0%",
    left: "100%",
    y: "-100%",
    duration: 10,
    ease: "power1.in",
  },
  toBottomRight: {
    width: "38vw",
    height: "42vw",
    top: "100%",
    left: "100%",
    duration: 10,
    ease: "power1.in",
  },
  toBottomLeft: {
    width: "38vw",
    height: "42vw",
    top: "100%",
    left: "0%",
    x: "-100%",
    duration: 10,
    ease: "power1.in",
  },
};

setTimeout(() => {
  modTl
    .add(() => {
      gsap.set("body", { background: "#0e0d0d" });
    })
    .from(".heading1", animations.showHeading)

    .to(".modBox1", animations.opacity)
    .to(".modBox1 h1", animations.fontSize, "<")
    .to(".modBox1", animations.toTopLeft, "<")

    .to(".modBox2", animations.opacity, ">-7")
    .to(".modBox2 h1", animations.fontSize, "<")
    .to(".modBox2", animations.toTopRight, "<")

    .to(".modBox3", animations.opacity, ">-5")
    .to(".modBox3 h1", animations.fontSize, "<")
    .to(".modBox3", animations.toBottomRight, "<")

    .to(".heading1", animations.hideHeading)
    .from(".heading2", animations.showHeading, "<+0.4")

    .to(".modBox4", animations.opacity, ">-4")
    .to(".modBox4 h1", animations.fontSize, "<")
    .to(".modBox4", animations.toBottomLeft, "<")

    .to(".modBox5", animations.opacity, ">-5")
    .to(".modBox5 h1", animations.fontSize, "<")
    .to(".modBox5", animations.toTopLeft, "<")

    .to(".modBox6", animations.opacity, ">-7")
    .to(".modBox6 h1", animations.fontSize, "<")
    .to(".modBox6", animations.toTopRight, "<")

    .to(".heading2", animations.hideHeading)
    .from(".heading3", animations.showHeading, "<+0.4")

    .to(".modBox7", animations.opacity, ">-4")
    .to(".modBox7 h1", animations.fontSize, "<")
    .to(".modBox7", animations.toBottomRight, "<")

    .to(".modBox8", animations.opacity, ">-5")
    .to(".modBox8 h1", animations.fontSize, "<")
    .to(".modBox8", animations.toBottomLeft, "<")

    .to(".modBox9", animations.opacity, ">-5")
    .to(".modBox9 h1", animations.fontSize, "<")
    .to(".modBox9", animations.toTopLeft, "<")

    .to(".heading3", animations.hideHeading);
}, 1000);

// --------- CUSTOM SCROLLBAR ---------
// Update the thumb according to page scroll progress
function updateScrollbar() {
  const scrollPercentage =
    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  scrollThumb.style.top = `${scrollPercentage}%`;
  scrollThumb.style.transform = `translateY(-${scrollPercentage}%)`;
}

// Make scrollbar visible only after the banner/hero section
gsap.to(scrollThumb, {
  scrollTrigger: {
    trigger: ".blankContainer",
    start: "top top",
    end: "max",
    scrub: true,
    onToggle: () => {
      scrollBarTrack.classList.toggle("invisible");
    },
  },
});

// ---------
// --------- TEAM SECTION TRANSITION
// ---------

const profileDot = document.getElementById("profilePaginationDot");
const teamTitle = document.querySelector(".teamRight > h1");

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".team-section",
    start: "top top",
    end: "+=5500px",
    pin: true,
    scrub: 0.1,
  },
});

gsap.set(".tImg1", { x: "0vw", y: "100%" });
gsap.set(".tImg2", { x: "33.3333vw", y: "100%" });
gsap.set(".tImg3", { x: "66.666vw", y: "100%" });

setTimeout(() => {
  tl.from(".team-section", { y: "100px", duration: 0.1 });
  // Phase 1
  tl.to(".tImg1", { y: "0%", duration: 4 }, "0")
    .to(".tImg2", { y: "0%", duration: 3.3 }, "0.7")
    .to(".tImg3", { y: "0%", duration: 2.7 }, "1.3")
    .add(() => {
      scrollBarTrack.classList.toggle("invisible");
      scrollBarTrack.classList.toggle("light");
    }, "1")
    .set(".teamRight", { opacity: 1 }, "4");

  // Phase 2
  tl.to(".tImg1", { x: "-80%", duration: 2.7 }, "4")
    .to(".tImg2", { x: "0%", duration: 3.1 }, "4")
    .to(".tImg3", { x: "0%", duration: 3.9 }, "4")
    .add(() => {
      scrollBarTrack.classList.toggle("invisible");
    }, "5")
    .from(".TeamTitle", { y: "100%", duration: 2.2 }, "4.5")
    .from(".teamDetailsContainer", { opacity: "0", duration: 1 }, ">")
    .from(".teamTitleLine", { opacity: "0", duration: 1 }, "<")

    .add(() => {
      profileDot.classList.toggle("hide");
      document.body.classList.toggle("bg-primary");
      document.querySelector(".team-section").classList.toggle("bg-primary");
    }, "7");

  // Comments SECTION TRANSITION
  tl.to({}, { duration: 0.6 })
    .addLabel("CT")
    .to(".teamRight", { y: "-120%", duration: 4 }, "CT2")
    .to(".teamLeft", { y: "-60%", duration: 4 }, "CT2")
    .to(".CTImgContainer", { scaleY: "1.02", duration: 1 }, "CT2")
    .to(".CTsection", { top: "0", duration: 4 }, "CT2")
    .add(() => {
      lenis.scrollTo(0, 15000);
      lenis.stop();
      document.querySelector(".CTImgContainer").classList.toggle("fullScreen");
      document.getElementById("seeYouText").classList.toggle("fullScreen");
      scrollBarTrack.classList.toggle("invisible");
      setTimeout(() => {
        lenis.start();
      }, 1050);
    }, ">")
    .set(".teamLeft", { opacity: 0 })
    .to({}, { duration: 0.5 });
}, 1000);

let tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".commentSection",
    start: "top bottom",
    end: "top top",
    scrub: 0.1,
  },
});

// prettier-ignore
tl2.to(".CTImgContainer", { borderRadius: "0 0 4vw 4vw", scale: 0.96 })
   .to(".CTImgSlow", { y: "25%" }, "<")
   .to("#seeYouText", { y: "-45%" }, "<")
