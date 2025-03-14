const cursor = document.getElementById("circle-cursor");
const downloadable = document.querySelectorAll(".downloadable");

document.addEventListener("mousemove", function (e) {
    let x = e.clientX;
    let y = e.clientY;
    let radius = cursor.offsetWidth / 2;

    if (x < radius || x > window.innerWidth - radius || y < radius || y > window.innerHeight - radius) {
        cursor.style.transform = `translate(${x - radius}px, ${y - radius}px) scale(0)`;
        return;
    }

    if (document.querySelector(".hideCursor:hover") != null) {
        cursor.style.transform = `translate(${x - radius}px, ${y - radius}px) scale(0)`;
    } else {
        cursor.style.transform = `translate(${x - radius}px, ${y - radius}px) scale(1)`;
    }
});

downloadable.forEach((card) => {
    card.addEventListener("mouseenter", (e) => {
        if (e.target.id == "Summary") {
            cursor.style.background = "rgb(233, 209, 173)";
        } else {
            cursor.style.background = "white";
        }
        cursor.classList.add("DownloadCursor");
    });
    card.addEventListener("mouseleave", () => {
        cursor.classList.remove("DownloadCursor");
        cursor.style.background = "white";
    });
});
