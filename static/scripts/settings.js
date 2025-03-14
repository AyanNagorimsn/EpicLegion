function init() {
    fetch("api/v1/users/").then((res) => {
        if (res.headers.get("Content-Type") !== "application/json") {
            window.location.href = "auth";
        } else {
            res.json().then((data) => {
                document.getElementById("usernameEditable").innerText = data.username;
                document.querySelector(".profilePicture").src = `https://markpacks.net/api/v1/users/${data.user_id}/profile-pictures`;
            });
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    init();
});

function signOut() {
    fetch("https://markpacks.net/api/v1/auth/logout/", {
        method: "DELETE",
    }).then((window.location.href = "home"));
}

function changeUsernameClicked() {
    let usernameEditable = document.getElementById("usernameEditable");
    if (usernameEditable.hasAttribute("contenteditable")) {
        let result = changeUsername(usernameEditable.innerText);
        if (result == []) {
            usernameEditable.removeAttribute("contenteditable");
        } else {
            alert(result.join("\n"));
        }
    } else {
        usernameEditable.setAttribute("contenteditable", "true");
        usernameEditable.focus();
        usernameEditable.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
            }
        });
    }
}

function changeUsername(newUsername) {
    // Usernames: 3-15 characters, alphanumeric plus _ - .
    // must contain at least one letter
    let errors = [];
    const usernameTypedLength = newUsername.length;
    if (usernameTypedLength > 15) {
        errors.push("Username must be less than 15 characters");
    }
    if (usernameTypedLength < 3) {
        errors.push("Username must contain 3 or more characters");
    }
    if (!/^[a-zA-Z0-9_.-]*$/.test(newUsername)) {
        errors.push("Invalid characters in username");
    }
    if (!/[a-zA-Z]/.test(newUsername)) {
        errors.push("Username must contain at least one letter");
    }
    if (errors.length !== 0) {
        return errors;
    } else {
        fetch("api/v1/users/usernames/", {
            method: "PATCH",
            body: new FormData().append("username", newUsername),
        }).then((res) => {
            console.log(res);
            return [];
        });
    }
}

function changePassword() {
    let errors = [];
    const oldPassword = document.getElementById("currentPassword").value;
    const passwordTyped = document.getElementById("changePassword").value;
    const passwordTypedLength = passwordTyped.length;
    if (passwordTypedLength > 15) {
        errors.push("Password must be less than 15 characters");
    }
    if (passwordTypedLength < 8) {
        errors.push("Password must contain 8 or more characters");
    }
    if (!/^[a-zA-Z0-9!@#$_.-]*$/.test(passwordTyped)) {
        errors.push("Invalid characters in password");
    }
    if (!/[a-z]/.test(passwordTyped)) {
        errors.push("Password must contain at least one lowercase");
    }
    if (!/[A-Z]/.test(passwordTyped)) {
        errors.push("Password must contain at least one uppercase");
    }
    if (!/[0-9]/.test(passwordTyped)) {
        errors.push("Password must contain at least one number");
    }
    if (passwordTyped !== document.getElementById("signInConfirmPassword").value) {
        errors.push("Passwords do not match");
    }
    if (errors.length !== 0) {
        alert(errors.join("\n"));
    } else {
        fetch("api/v1/users/passwords/", {
            method: "PATCH",
            body: new FormData().append("oldPassword", oldPassword).append("newPassword", passwordTyped),
        }).then((res) => {
            alert(res.text())
        });
    }
}

function changeProfilePictureClicked(event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            const form = new FormData();
            form.append("custom", "true");
            form.append("profile_picture", file);
            fetch("api/v1/users/profile-pictures/", {
                method: "PATCH",
                body: form,
            }).then((res) => {
                console.log(res);
                init();
            });
        };
    }
}