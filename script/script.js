let user = JSON.parse(sessionStorage.getItem("user"));

const payBox = document.getElementById("pay-box");
const payForm = document.getElementById("pay-form-cont");
const msgContainer = document.getElementById("msg-container");
const loginBtn = document.getElementById("login-btn");
const userBtn = document.getElementById("user-btn");
// #mobile-btn, #bank-btn, #self-btn
const mobileBtn = document.getElementById("mobile-btn");
const bankBtn = document.getElementById("bank-btn");
const selfBtn = document.getElementById("self-btn");

function isLogedIn() {
	if (user) {
		payBox.classList.remove("noLogin");
		msgContainer.style.display = "none";
		loginBtn.style.display = "none";
		userBtn.style.backgroundColor = "whitesmoke";
		userBtn.innerText = `Hello, ${user.name}`;
	} else {
		payBox.classList.add("noLogin");
		msgContainer.style.display = "block";
		userBtn.style.display = "none";
	}
}

function isPresent() {
	if (user.bank) return true;

	return;
}

function wireOptionButtons() {
	mobileBtn.addEventListener("click", () => {
		if (isPresent()) {
			window.location.href = "html/mobileNum.html";
		} else {
			alert("Please add Bank Account First!");
		}
	});
	bankBtn.addEventListener("click", () => {
		if (isPresent()) {
			window.location.href = "html/bankAcc.html";
		} else {
			alert("Please add Bank Account First");
		}
	});
}

function signUp() {
	window.location.href = "./html/signUp.html";
}

userBtn.addEventListener("click", () => {
	if (user) {
		window.location.href = "html/profile.html";
	}
});

(function init() {
	isLogedIn();
	wireOptionButtons();
})();
