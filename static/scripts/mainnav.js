const menuIcon = document.getElementById("viewMoreIcon");
const menuBackground = document.querySelector(".viewMoreIconBackground");
const titleTabs = document.querySelectorAll(".titleTab");
const profileTitleContainer = document.querySelector(".profileTitleContainer");
const menuBars = Array.from(menuIcon.children);
const settingsTab = document.getElementById("settingsTab");

menuIcon.onmouseenter = function () {
    const titleTabsWidth = (document.getElementById("titleTabs").clientWidth / document.documentElement.clientWidth) * 100;
    document.getElementById("titleTabs").style.right = `calc(1.75em + ${profileTitleContainer.clientWidth}px)`;
    menuBackground.style.width = `calc(4.5em + ${(profileTitleContainer.clientWidth / document.documentElement.clientWidth) * 100 + titleTabsWidth}vw)`;
    menuBars.forEach((bar) => {
        bar.classList.add("navArrow");
    });
    menuIcon.style.right = `calc(${titleTabsWidth}vw)`;
    for (let i = 0; i < titleTabs.length; i++) {
        setTimeout(() => {
            titleTabs[i].style.transform = "translateY(0)";
        }, 100 * (titleTabs.length - i));
    }
};

menuBackground.onmouseleave = function () {
    menuBackground.style.width = `calc(4.5em + ${(profileTitleContainer.clientWidth / document.documentElement.clientWidth) * 100}vw)`;
    menuBars.forEach((bar) => {
        bar.classList.remove("navArrow");
    });
    menuIcon.style.right = 0;
    for (let i = titleTabs.length - 1; i >= 0; i--) {
        setTimeout(() => {
            titleTabs[i].style.transform = "translateY(-100%)";
        }, 100 * i);
    }
};

titleTabs.forEach((link) => {
    let letters = link.textContent.split("");
    link.textContent = "";
    letters.forEach((letter, i) => {
        i += 1;
        let span = document.createElement("span");
        let delay = i / 20;
        if (i % 2 === 0) {
            delay -= 0.1;
        } else {
            delay += 0.05;
        }

        let letterOut = document.createElement("span");

        letterOut.textContent = letter;
        letterOut.style.transitionDelay = `${delay}s`;
        letterOut.classList.add("out");
        let letterIn = document.createElement("span");
        letterIn.textContent = letter;
        letterIn.style.transitionDelay = `${delay}s`;
        letterIn.classList.add("in");

        if (letter === " ") {
            letterIn.classList.add("emptyLetterSpace");
            letterOut.classList.add("emptyLetterSpace");
        }
        span.append(letterOut);
        span.append(letterIn);
        link.append(span);
    });
});

// settingsTab.addEventListener("click", function () {
//     if (settingsTab.href === null || settingsTab.href === "") {
//         document.getElementById("settingsSignIn").classList.toggle("settingsActive");
//     }
// });
