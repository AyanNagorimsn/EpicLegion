let modpackNavIsAnimating = false;
let lenis;

function init() {
  let loadedEvent = new Event("loaded");
  window.scrollTo(0, 0);
  lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  const mainTitle = document.querySelector(".main-title");
  const mainTitle2 = document.querySelector(".sub-title");
  const mainTitle3 = document.querySelector(".mainTitle3");
  const imageContainer = document.querySelector(".imageContainer");
  const midText = document.getElementById("MidText");
  const midText2 = document.getElementById("MidText2");
  const midTextContainer = document.querySelector(".midTextContainer");
  mainTitle.classList.add("reveal");
  mainTitle2.classList.add("reveal");
  mainTitle3.classList.add("reveal");
  imageContainer.classList.remove("transition3C");
  imageContainer.style.top = "";
  imageContainer.style.left = "";
  imageContainer.style.width = "";
  imageContainer.style.height = "";
  imageContainer.style.borderRadius = "";
  midTextContainer.style.position = "fixed";
  midTextContainer.style.top = 0;
  midText2.style.transform = "translateY(100vh)";
  midText2.style.top = "100vh";
  midText.style.top = "50%";
  midText.style.transform = "translateY(-50%)";
  document.querySelector(".viewMoreAndProfile").style.top = 0;
  document.querySelector(".secondContainer").style.position = "fixed";
  document.querySelector(".secondContainerNavContainer").style.position = "fixed";
  modpackNavIsAnimating = false;
  fetch("api/v1/users/", {
    method: "GET",
  }).then((res) => {
    if (res.headers.get("Content-Type") !== "application/json") {
      localStorage.removeItem("user_id");
      document.dispatchEvent(loadedEvent);
      return;
    }
    res.json().then((data) => {
      console.log(data);
      if (data.user_id !== undefined) {
        const username = data.username;
        const userId = data.user_id;
        localStorage.setItem("user_id", userId);
        document.getElementById("profileSignInUsername").innerHTML = username;
        document.getElementById(
          "ProfilePFP"
        ).src = `https://markpacks.net/api/v1/users/${userId}/profile-pictures`;
        document.getElementById("selfCommentUsername").innerHTML = "Signed in as " + username;
        document.getElementById("profileTitle").onclick = function () {
          window.location.href = "profile";
        };
        document.getElementById("settingsTab").href = "settings";
        document.getElementById(
          "commentPFPIMG"
        ).src = `https://markpacks.net/api/v1/users/${userId}/profile-pictures`;
        menuBackground.style.width = `calc(4.5em + ${
          (profileTitleContainer.clientWidth / document.documentElement.clientWidth) * 100
        }vw)`;
        document.getElementById("titleTabs").style.right = `calc(1.75em + ${
          profileTitleContainer.clientWidth + 1
        }px)`;
        document.dispatchEvent(loadedEvent);
      } else {
        localStorage.removeItem("user_id");
        document.dispatchEvent(loadedEvent);
      }
    });
  });
  document.querySelector(".leftSecondContainer").style.filter = "";
  document.querySelector(".secondContainerNavContainer").style.filter = "";
  menuBackground.style.width = `calc(4.5em + ${
    (profileTitleContainer.clientWidth / document.documentElement.clientWidth) * 100
  }vw)`;
  document.getElementById("titleTabs").style.right = `calc(1.75em + ${
    profileTitleContainer.clientWidth + 1
  }px)`;
}

let selectedOption = 0;
let imageIndex = 0;

function hoverOption(index) {
  const sliderLine = document.getElementById("Slider");
  sliderLine.style.left = `${index * 20}%`;
}

const slider = document.getElementById("sliderNav");

slider.addEventListener("mouseleave", function () {
  hoverOption(selectedOption);
});

const lessMotionTab = document.getElementById("lessMotionTab");
let firstFourChildren;
let lessMotionOn = false;
setTimeout(() => {
  firstFourChildren = Array.from(lessMotionTab.children).slice(0, 4);
}, 200);

let text = ["M", "o", "r", "e"];
let text2 = ["L", "e", "s", "s"];

lessMotionTab.addEventListener("click", function () {
  firstFourChildren.forEach((letter, i) => {
    letter.style.transform = "translateY(-100%)";

    setTimeout(() => {
      letter.firstElementChild.textContent = lessMotionOn ? text[i] : text2[i];
      letter.lastElementChild.textContent = lessMotionOn ? text[i] : text2[i];
      console.log(letter.textContent);
      letter.style.transform = "translateY(0%)";
    }, 500);
  });
  lessMotionOn = !lessMotionOn;
  if (document.querySelector(".titleTabSelected") === null) {
    document.getElementById("thirdcontainer-transition-light").style.display = "none";
    lenis.options["smoothWheel"] = true;
  } else {
    document.getElementById("thirdcontainer-transition-light").style.display = "block";
    lenis.options["smoothWheel"] = false;
  }
});

const dataArr = [
  {
    selectedOptionIndex: 0,
    title: "DYING LIGHT",
    summary: `Hello Pilgrim! Welcome to Villedor, a once lavish city now in ruins due to the horrific Harran virus. You are a very good parkourist, which helps you dodge zombies and climb up buildings to escape near-death situations. You have tons of weapons in your arsenal to craft and use; for example, pipes, hammers, sticks, machetes, and the list goes on. Now it's your turn to go out there and defeat the zombies.`,
    downloadPage: "https://modrinth.com/modpack/dying-light",
    downloadText: null,
    versionText: null,
    prefix: "DL",
  },

  {
    selectedOptionIndex: 1,
    title: "BRUHPAK 2",
    summary: `Bruhpak2 has all the fun and silliness that players love, plus OG mods, magic, and a tech side for hardcore and veteran players. Tech-savvy people can now try automating anything with moving belts, tools powered by RF waves, computers, and even rockets and MISSLES!!! And builders, don't worry—I haven't forgotten about you! We have mods that let you make almost perfect buildings and brand-new decorations, right down to the smallest details!`,
    downloadPage: "https://www.curseforge.com/minecraft/modpacks/bruhpak-2",
    downloadText: null,
    versionText: "1.16.5",
    prefix: "BP",
  },
  {
    selectedOptionIndex: 2,
    title: "RINTHED",
    summary: `A labyrinth of mods. Labyrinth: Something extremely complex | the rinthed pack is a complex pack with all types of mods going into it. As it shows the best forge mods Modrinth has to offer and levels up with Modrinth community. As of right now im focused on dying light but I could resume this pack so stay tuned for updates on discord and such.`,
    downloadPage: "https://modrinth.com/modpack/rinthed",
    downloadText: null,
    versionText: null,
    prefix: "rinthed",
  },
  {
    selectedOptionIndex: 3,
    title: "Wild",
    summary: `Hello and welcome to the WILD, this modpack features the best mods from the WILD update for both Forge and Fabric! It brings tons of new things to do in this amazing update, such as custom building, QOL changes, bosses, and tons of new weapons to try out! Come and try this amazing pack. See ya there!`,
    downloadPage: "https://modrinth.com/modpack/wild",
    downloadText: null,
    versionText: null,
    prefix: "WILD",
  },
  {
    selectedOptionIndex: 4,
    title: "EPICLY GALAXY",
    summary: `The First, the OG, the Alpha, the Omega, Here is the first ever pack ever made by Mark. Made years ago when Twitch still owned CurseForge. This was a passion project made with my amigo Don (who is helping out the website as well!). Although it got its last update a while ago, you should still try it as it features a ton of things (mainly spacecraft) for 1.12.2. Thank you, everyone.`,
    downloadPage: "https://www.curseforge.com/minecraft/modpacks/epic-yeeto",
    downloadText: null,
    versionText: "1.12.2",
    prefix: "epic",
  },
];

function fetchModpackData() {
  fetch("https://api.modrinth.com/v2/project/rinthed")
    .then((response) => response.json())
    .then((data) => {
      dataArr[0].downloadText = data.downloads
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      dataArr[0].downloadText = data.downloads
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      dataArr[0].versionText = data.game_versions.join(" <br/> ");
      changeDetails(dataArr[0], true);
      init();
    });
  fetch("https://api.cfwidget.com/508176")
    .then((response) => response.json())
    .then((data) => {
      dataArr[1].downloadText = data.downloads.total
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      dataArr[1].downloadText = data.downloads.total
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    });
  fetch("https://api.modrinth.com/v2/project/rinthed")
    .then((response) => response.json())
    .then((data) => {
      dataArr[2].downloadText = data.downloads
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      dataArr[2].downloadText = data.downloads
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      dataArr[2].versionText = data.game_versions.join(" · ");
    });
  fetch("https://api.modrinth.com/v2/project/wild")
    .then((response) => response.json())
    .then((data) => {
      dataArr[3].downloadText = data.downloads
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      dataArr[3].downloadText = data.downloads
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      dataArr[3].versionText = data.game_versions.join(" <br/> ");
    });
  fetch("https://api.cfwidget.com/411167")
    .then((response) => response.json())
    .then((data) => {
      dataArr[4].downloadText = data.downloads.total
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      dataArr[4].downloadText = data.downloads.total
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    });
}

window.addEventListener("load", fetchModpackData);

let intervalStatus = true;
let versionsScrollerIndex = 0;
let versions = document.getElementById("VersionsText");
function versionsScrollerFunction() {
  if (intervalStatus === false) return;
  versionsScrollerIndex++;

  if (versionsScrollerIndex >= 3) {
    versionsScrollerIndex = 0;
    versions.style.transform = `translateY(${-versionsScrollerIndex}em)`;
  } else {
    versions.style.transform = `translateY(${-versionsScrollerIndex}em)`;
  }
}
setInterval(versionsScrollerFunction, 2500);

function setActive(clickedBtn) {
  const NavBtns = document.querySelectorAll(".navBtns");

  if (modpackNavIsAnimating) return;
  if (document.querySelector(".transition3C") !== null) return;
  if (document.querySelector(".preTransition3C") !== null) return;
  NavBtns.forEach((btn) => {
    btn.classList.remove("selected");
  });

  clickedBtn.classList.add("selected");
}

const sliderBackgroundEl = document.getElementById("SliderBackground");
const versionsTextEl = document.getElementById("VersionsText");
const TitleEl = document.getElementById("Title");
const SummaryEl = document.getElementById("Summary");
const VersionContainer = document.getElementById("Versions");
const DownloadTextEl = document.getElementById("DownloadsText");

SummaryEl.addEventListener("transitionend", () => {
  if (document.querySelector(".GOUP") === null) {
    modpackNavIsAnimating = false;
  }
});

SummaryEl.addEventListener("transitionstart", () => {
  modpackNavIsAnimating = true;
});

SummaryEl.addEventListener("transitioncancel", () => {
  modpackNavIsAnimating = false;
});

function changeDetails(data, firstLoad = false) {
  const {
    selectedOptionIndex,
    title,
    summary,
    downloadText,
    downloadPage,
    versionText,
    prefix = "DL",
  } = data;

  if (!firstLoad) {
    if (selectedOption === selectedOptionIndex) return;
    if (modpackNavIsAnimating) return;
    if (document.querySelector(".transition3C") !== null) return;
    if (document.querySelector(".preTransition3C") !== null) return;
  }

  // Only Have the version interval for dying light
  if (title === "DYING LIGHT") {
    intervalStatus = true;
  } else {
    intervalStatus = false;
    versionsTextEl.style.transform = "tranlateY(0)";
  }

  selectedOption = selectedOptionIndex;
  sliderBackgroundEl.style.left = `${selectedOptionIndex * 20}%`;

  // Go up after click
  TitleEl.classList.add("GOUP");
  SummaryEl.classList.add("GOUP");
  VersionContainer.classList.add("GOUP");

  setTimeout(() => {
    // Change Text
    TitleEl.innerHTML = title;
    SummaryEl.innerHTML = summary;
    SummaryEl.href = downloadPage;
    DownloadTextEl.textContent = downloadText;
    versionsTextEl.innerHTML = versionText;

    // remove go up class
    TitleEl.classList.remove("GOUP");
    SummaryEl.classList.remove("GOUP");
    VersionContainer.classList.remove("GOUP");
  }, 700);

  if (!firstLoad) {
    imageIndex = 0;
    pagination.classList.add("changeModpack");
    const activeCollection = document.querySelector(".activeCollection");
    document.querySelector(".border").style.transform = `translateX(0)`;
    setTimeout(() => {
      activeCollection.classList.add("inactiveSoon");
      document.getElementById(`${prefix}ImageGallery`).classList.add("activeSoon");
      Array.from(document.querySelectorAll(".imageSelected")).forEach((img) =>
        img.classList.remove("imageSelected")
      );
      document.getElementById("i0").classList.add("imageSelected");
      for (let i = 0; i < 5; i++) {
        pagination.children[i].children[0].src = `../static/images/${prefix + (i + 1)}.png`;
      }
    }, 300);
    setTimeout(() => {
      pagination.classList.remove("changeModpack");
      activeCollection.style.translate = "";
      document.getElementById(`${prefix}ImageGallery`).classList.remove("activeSoon");
      document.getElementById(`${prefix}ImageGallery`).classList.add("activeCollection");
      activeCollection.classList.remove("inactiveSoon");
      activeCollection.classList.remove("activeCollection");
    }, 1000);
  }
  versionsTextEl.style.transform = `translateY(0em)`;
}

// Image slider stuff
let imageGallery = document.getElementById("ImageGallery");
const imageContainer = document.querySelector(".imageContainer");

let imageGalleryIsAnimating = false;

imageGallery.addEventListener("transitionend", function () {
  imageGalleryIsAnimating = false;
});

imageGallery.addEventListener("transitionstart", function () {
  imageGalleryIsAnimating = true;
});

imageGallery.addEventListener("transitioncancel", function () {
  imageGalleryIsAnimating = false;
});

function changeSelectedImage() {
  let hoveredMini = document.querySelector(".miniImage:hover");
  let selectedMini = document.querySelector(".imageSelected");

  if (hoveredMini === selectedMini || imageGalleryIsAnimating) {
    return;
  }

  if (hoveredMini === null) {
    if (document.querySelector(".circle:hover").id === "LeftArrowCircle") {
      index = selectedMini.id.split("i")[1];
      index--;
      if (index < 0) {
        index = 4;
      }
    } else if (document.querySelector(".circle:hover").id === "RightArrowCircle") {
      index = selectedMini.id.split("i")[1];
      index++;
      if (index > 4) {
        index = 0;
      }
    } else {
      return;
    }
    hoveredMini = document.getElementById("i" + index);
  }

  selectedMini.className = "miniImage";
  hoveredMini.className = "miniImage imageSelected";

  imageIndex = hoveredMini.id.split("i")[1] - 1;
  showNextImage();

  let border = document.querySelector(".border");
  border.style.transform = `translateX(${100 * imageIndex}%)`;
}

let pagination = document.querySelector(".pagination");

// Cursor follow thing
imageContainer.addEventListener("mousemove", function (e) {
  if (document.querySelectorAll(".transition3C").length > 0) {
    document.querySelectorAll(".circle").forEach(function (circle) {
      circle.style.transform = "scale(0)";
    });
    return;
  }
  let circle;
  let rect = imageContainer.getBoundingClientRect();
  if (e.clientX - rect.left < rect.width / 2) {
    circle = document.querySelector("#LeftArrowCircle");
  } else if (e.clientX - rect.left >= rect.width / 2) {
    circle = document.querySelector("#RightArrowCircle");
  }
  if (document.querySelector(".pagination:hover") !== null) {
    circle.style.transform = "scale(0)";
    return;
  }
  let style = window.getComputedStyle(imageContainer);
  let transform = style.getPropertyValue("transform");

  let scale = 1;
  if (transform && transform !== "none") {
    let values = transform.split("(")[1].split(")")[0].split(",");
    scale = values[0];
  }
  let arrow = circle.children[0];
  arrow.style.transform = "scale(1)";
  circle.style.opacity = "1";
  circle.style.transform = "scale(1)";
  circle.style.left = (e.clientX - rect.left) / scale - circle.offsetWidth / 2 + "px";
  circle.style.top = (e.clientY - rect.top) / scale - circle.offsetWidth / 2 + "px";
  otherArrows = document.querySelectorAll(
    ".arrow:not(#" + circle.id.substring(0, circle.id.length - 6) + ")"
  );
  otherArrows.forEach(function (otherArrow) {
    otherArrowParent = document.getElementById(otherArrow.id + "Circle");
    if (otherArrowParent !== null) {
      otherArrowParent.style.opacity = "0";
      otherArrow.style.transform = "scale(0)";
    }
  });
});

imageContainer.addEventListener("mouseleave", function (e) {
  let circle;
  let rect = imageContainer.getBoundingClientRect();
  if (e.clientX - rect.left < rect.width / 2) {
    circle = document.getElementById("LeftArrowCircle");
  } else if (e.clientX - rect.left >= rect.width / 2) {
    circle = document.getElementById("RightArrowCircle");
  }
  circle.style.transform = "scale(0)";

  let imageGallery = document.querySelector("#ImageGallery");
  imageGallery.classList.add("transition");
  setTimeout(function () {
    imageGallery.classList.remove("transition");
  }, 500);
  return;
});

imageContainer.addEventListener("mouseenter", function (e) {
  if (document.querySelectorAll(".transition3C").length > 0) {
    document.querySelectorAll(".circle").forEach(function (circle) {
      circle.style.transform = "scale(0)";
    });
    return;
  }
  document.querySelectorAll(".circle").forEach(function (circle) {
    circle.style.transform = "scale(1)";
  });
});

document.addEventListener("mousemove", function (e) {
  let imageGallery = document.querySelector("#ImageGallery");
  if (document.querySelectorAll(".transition3C").length > 0) {
    return;
  }
  if (document.querySelector(".imageContainer:hover") != null) {
    imageGallery.classList.add("reset");
    imageGallery.style.transform = "translateX(0%) translateY(0%)";
    setTimeout(function () {
      imageGallery.classList.remove("reset");
    }, 300);
    return;
  }
});

function showNextImage() {
  if (imageGalleryIsAnimating) {
    return;
  }
  imageIndex++;
  if (imageIndex > 4) {
    imageIndex = 0;
  }
  document.querySelector(".activeCollection").style.translate = -20 * imageIndex + "%";

  hoveredMini = document.getElementById("i" + imageIndex);
  selectedMini = document.querySelector(".imageSelected");

  selectedMini.className = "miniImage";
  hoveredMini.className = "miniImage imageSelected";

  imageIndex = hoveredMini.id.split("i")[1];
  let border = document.querySelector(".border");
  border.style.transform = `translateX(${100 * imageIndex}%)`;
  updateImagePositions();
}

function showPreviousImage() {
  if (imageGalleryIsAnimating) {
    return;
  }
  imageIndex--;
  if (imageIndex < 0) {
    imageIndex = 4;
  }
  document.querySelector(".activeCollection").style.translate = -20 * imageIndex + "%";

  hoveredMini = document.getElementById("i" + imageIndex);
  selectedMini = document.querySelector(".imageSelected");

  selectedMini.className = "miniImage";
  hoveredMini.className = "miniImage imageSelected";

  imageIndex = hoveredMini.id.split("i")[1];

  let border = document.querySelector(".border");
  border.style.transform = `translateX(${100 * imageIndex}%)`;
  updateImagePositions();
}

function updateImagePositions() {
  let imgs = document.querySelectorAll(".big-image");
  imgs.forEach(function (img) {
    img.style.transform = "translateX(" + -(imageIndex - 2) * 100 + "%)";
  });
  let border = document.querySelector(".big-border");
  border.style.transform = "translateX(" + 100 * imageIndex + "%)";
}
