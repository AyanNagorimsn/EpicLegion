function clickPFPTransition(index, newPFP) {
    let dot = document.getElementById("profilePaginationDot");
    let oldPFP = document.querySelector(".pfpSelected");
    oldPFP.classList.remove("pfpSelected");
    newPFP.classList.add("pfpSelected");
    dot.style.right = `${(index - 1) * 4}em`;
    changeBio(5 - index);
}

function changeBio(index) {
    document.querySelector(".teamProfilesContainer").style.left = `${-index * 100}vw`;
}
