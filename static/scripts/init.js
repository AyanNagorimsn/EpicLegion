document.addEventListener(
    "keydown",
    (e) => {
        if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
            const ignoreTypes = ["input", "textarea", "select", "button"];
            const isContentEditable = e.target.getAttribute("contenteditable") === "true";
            if (ignoreTypes.indexOf(e.target.tagName.toLowerCase()) > -1 || isContentEditable) {
                return;
            }
            e.preventDefault();
        }
    },
    false
);
