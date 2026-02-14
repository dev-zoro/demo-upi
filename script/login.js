// number password - inputs
// error
//login-btn

const numberEl = document.getElementById("number");
const passwordEl = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const errors = document.querySelectorAll(".error");
let loginSuccess = false;

let users = JSON.parse(localStorage.getItem("users"));
let loginUser = {};
// console.log(users);

const numberRegex = /^[6-9]\d{9}$/;

function showError(input, msg, index) {
	input.classList.add("error-border");
	errors[index].innerText = msg;
	errors[index].style.display = "block";
}

function clearError(input, index) {
	input.classList.remove("error-border");
	errors[index].style.display = "none";
}

function isUserPresent(users, number) {
	for (let user of users) {
		if (user.number === number) {
			// console.log(user);
			return user;
		}
	}
	return {};
}

function getPassword(users, number) {
	for (let user of users) {
		if (user.number === number) {
			// console.log(`Password: ${user.password}`);
			return user.password;
		}
	}
	return null;
}

numberEl.addEventListener("blur", () => {
	loginUser = isUserPresent(users, numberEl.value);
	if (!loginUser) {
		showError(numberEl, "user not found!", 0);
	} else {
		clearError(numberEl, 0);
	}
});

passwordEl.addEventListener("blur", () => {
	let userPassword = getPassword(users, numberEl.value);
	if (userPassword !== passwordEl.value) {
		showError(passwordEl, "Wrong Password!", 1);
	} else {
		clearError(passwordEl, 1);
		loginSuccess = true;
		sessionStorage.setItem("user", JSON.stringify(loginUser));
	}
});

loginBtn.addEventListener("click", () => {
	if (loginSuccess) {
		window.alert("login successfull!");
		window.location.href = "../index.html";
	}
});
