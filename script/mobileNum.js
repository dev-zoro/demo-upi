function getStoredObject(name) {
	try {
		const raw = sessionStorage.getItem(name);
		return raw ? JSON.parse(raw) : null;
	} catch (error) {
		console.warn("Failed to parse stored user:", error);
		return null;
	}
}

function storeObject(name, object) {
	sessionStorage.setItem(name, JSON.stringify(object));
	localStorage.setItem(name, JSON.stringify(object));
}

numberRegex = /^\d{9,18}$/;

const user = getStoredObject("user");
const transcations = getStoredObject("transcations") || [];
const transcation = {};

const loginBtn = document.getElementById("login-btn");
const userBtn = document.getElementById("user-btn");
const sendBtn = document.getElementById("send-btn");
// number amount account-opt send-btn
const numberEl = document.getElementById("number");
const amountEl = document.getElementById("amount");
const errors = document.querySelectorAll(".error");
const accountOptEl = document.getElementById("account-opt");
const option = accountOptEl.querySelector("option");

let isNumValid = false;
let isAmountValid = false;

function showError(input, msg, index) {
	input.classList.add("error-border");
	errors[index].innerText = msg;
	errors[index].style.color = "red";
	errors[index].style.display = "block";
}

function clearError(input, index) {
	input.classList.remove("error-border");
	errors[index].style.display = "none";
}

function setBalance() {
	user.bank.balance -= amountEl.value.trim();
	storeObject("user", user);
}

function saveTranscation() {
	transcation.receiver = numberEl.value.trim();
	transcation.amount = amountEl.value.trim();
	transcation.mode = "Bank Account";
	transcation.status = "success";
	transcations.push(transcation);
	storeObject("transcations", transcations);
}

numberEl.addEventListener("blur", () => {
	if (!numberRegex.test(numberEl.value.trim())) {
		showError(numberEl, "Enter a valid number!", 0);
	} else if (numberEl.value.trim() === user.number) {
		showError(numberEl, "Sender number cannot be same!", 0);
	} else {
		clearError(numberEl, 0);
		isNumValid = true;
	}
});

amountEl.addEventListener("blur", () => {
	let amount = amountEl.value.trim();
	if (amount < 0) {
		showError(amountEl, "Enter a valid amount!", 1);
	} else if (user.bank.balance < amountEl.value.trim()) {
		showError(amountEl, "Insufficient Balance!", 1);
	} else {
		clearError(amountEl, 1);
		isAmountValid = true;
	}
});

sendBtn.addEventListener("click", () => {
	if (isNumValid && isAmountValid) {
		alert("Transcation is successfull!");
		setBalance();
		saveTranscation();
		console.log(transcations);
		window.location.reload();
	} else {
		alert("Please Enter valid input!");
	}
});

userBtn.addEventListener("click", () => {
	window.location.href = "profile.html";
});

function isLogedIn() {
	if (user) {
		loginBtn.style.display = "none";
		userBtn.innerText = `Hello, ${user.name}`;
		option.value = user.bank.accountNumber;
		option.textContent = `${user.bank.name} - ${user.bank.accountNumber.slice(-4)}`;
	}
}

(function init() {
	isLogedIn();
})();
