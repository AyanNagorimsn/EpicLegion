const closeBtn = document.querySelectorAll("#closeIcon");
const eyeBtn = document.querySelectorAll("#eye");
const inputs = document.querySelectorAll("input");

const passwordInputs = document.querySelectorAll('input[type="password"]');
const errorField = document.getElementById("errors");

document.addEventListener("input", function (e) {
    let errors = [];
    // Usernames: 3-15 characters, alphanumeric plus _ - .
    // must contain at least one letter
    if (document.querySelector("#signInUsername:focus")) {
        const usernameTyped = document.getElementById("signInUsername").value;
        const usernameTypedLength = usernameTyped.length;
        if (usernameTypedLength > 15) {
            errors.push("Username must be less than 15 characters");
        }
        if (usernameTypedLength < 3) {
            errors.push("Username must contain 3 or more characters");
        }
        if (!/^[a-zA-Z0-9_.-]*$/.test(usernameTyped)) {
            errors.push("Invalid characters in username");
        }
        if (!/[a-zA-Z]/.test(usernameTyped)) {
            errors.push("Username must contain at least one letter");
        }
    }
    // Passwords: 8-15 characters, alphanumeric plus ! @ # $ _ - + < > . ?
    // must contain lowercase, uppercase, and number
    if (document.querySelector("#signInPassword:focus") || document.querySelector("#signInConfirmPassword:focus")) {
        const passwordTyped = document.getElementById("signInPassword").value;
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
    }
    if (errors.length !== 0) {
        document.getElementById("signUpSubmit").disabled = true;
    } else {
        document.getElementById("signUpSubmit").disabled = false;
    }
    errorField.innerHTML = errors.join("<br>");
});

inputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
        if (e.target.value === "") {
            closeBtn[index].classList.add("hide");
        }
        if (e.target.value) {
            closeBtn[index].classList.remove("hide");
        }
    });
});

passwordInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
        if (e.target.value === "") {
            eyeBtn[index].classList.add("hide");
        }
        if (e.target.value) {
            eyeBtn[index].classList.remove("hide");
        }
    });
});

document.querySelectorAll(".switchBtn").forEach((btn) => {
    btn.addEventListener("click", function () {
        document.querySelector("main").classList.toggle("switch");
    });
});

const signUpForm = document.getElementById("signUpForm");
const signInForm = document.getElementById("signInForm");

signUpForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const form = new FormData(document.getElementById("signUpForm"));
    if (form.get("password_1") !== form.get("password_2")) {
        alert("Passwords do not match!");
        return;
    }
    fetch("api/v1/users/", {
        method: "POST",
        body: form,
    }).then((res) => {
        console.log(res.text());
        if (res.status === 200) {
            document.querySelector("main").classList.toggle("switch");
        } else {
            alert("Error code " + res.status);
        }
    });
});

signInForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const form = new FormData(document.getElementById("signInForm"));
    fetch("api/v1/auth/login", {
        method: "POST",
        body: form,
    }).then((res) => {
        console.log(res);
        if (res.status === 200) {
            window.location.href = "/home";
        } else if (res.status === 500) {
            alert("Internal server error");
        } else {
            res.json().then((data) => {
                document.getElementById("LoginPassword").value = "";
                alert(data.error);
            });
        }
    });
});
