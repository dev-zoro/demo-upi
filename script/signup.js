//name number email - input fileds
// btn signup-btn error
// import { encrpt } from "./passwordEncrpt";
const nameEl = document.getElementById("name");
const numberEl = document.getElementById("number");
const passwordEl = document.getElementById("password");
const confirmPasswordEl = document.getElementById("confirm-password");
const singupBtn = document.getElementById("signup-btn");
let errors = document.querySelectorAll(".error");

let user = {};
let users = [];
//validate? clearError : showError;
//showError
//clearErro
// encrpt();
const nameRegex = /^[a-zA-Z]+(?:\s[A-Za-z]+)+$/;
const numberRegex = /^[6-9]\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const passwordRegex =
	/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`-]).{8,}$/;

function showError(input, msg, index) {
	input.classList.add("error-border");
	errors[index].innerText = msg;
	errors[index].style.display = "block";
}

function clearError(input, index) {
	input.classList.remove("error-border");
	errors[index].style.display = "none";
}

nameEl.addEventListener("blur", () => {
	if (!nameRegex.test(nameEl.value.trim())) {
		showError(nameEl, "Enter valid name!", 0);
	} else {
		clearError(nameEl, 0);
	}
});

numberEl.addEventListener("blur", () => {
	if (!numberRegex.test(numberEl.value.trim())) {
		showError(numberEl, "Enter valid number!", 1);
	} else {
		clearError(numberEl, 1);
	}
});

passwordEl.addEventListener("blur", () => {
	if (!passwordRegex.test(passwordEl.value.trim())) {
		showError(passwordEl, "Min 8 char, 1 uppercase and 1 symbol", 2);
	} else {
		clearError(passwordEl, 2);
	}
});

confirmPasswordEl.addEventListener("blur", () => {
	if (confirmPasswordEl.value !== passwordEl.value) {
		showError(confirmPasswordEl, "Password does not match!", 3);
	} else {
		clearError(confirmPasswordEl, 3);
	}
});

function isValid() {
	nameRegex.test(nameEl.value)
		? clearError(0)
		: showError("Enter a valid name!", 0);
	numberRegex.test(numberEl.value) ? clearError(1) : showError(1);
	emailRegex.test(emailEl.value) ? clearError(2) : showError(2);
}

function userInfo() {
	user.name = nameEl.value.trim();
	user.number = numberEl.value;
	// user.email = emailEl.value.trim();
	user.password = passwordEl.value;
	users.push(user);

	localStorage.setItem("users", JSON.stringify(users));
	// console.log(user);
	window.alert("Sign Up Successfull!");
	window.location.href = "../html/login.html";
}
