function getStoredObject(name) {
	try {
		const raw = sessionStorage.getItem(name);
		return raw ? JSON.parse(raw) : null;
	} catch (error) {
		console.warn("Failed to parse stored user:", error);
		return null;
	}
}

const user = getStoredObject("user");

const loginBtn = document.getElementById("login-btn");
const userBtn = document.getElementById("user-btn");
const checkBalBtn = document.getElementById("check-bal");
const checkBtn = document.getElementById("check-btn");

const bankDetailsTable = document.getElementById("bank-details");
const checkBox = document.getElementById("check-box");

const bankNameRow = document.getElementById("bank-name");
const accNumberRow = document.getElementById("acc-number");
const balanceRow = document.getElementById("balance");

const userName = document.getElementById("name");
const passwordEl = document.getElementById("password");
const errors = document.querySelectorAll(".error");

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

function setThirdCell(row, value) {
	if (!row) return;
	// console.log("inside setThirdCell");
	let cells = row.querySelectorAll("td");
	// console.log(cells);
	if (cells.length == 3) {
		cells[2].innerText = value;
	} else {
		let label = cells[0].value;
		row.innerHTML = `
        <td> ${label} </td>
        <td> : </td>
        <td> ${value} </td>`;
	}
}

function bankDetails() {
	// console.log("Inside bankDetails");
	if (user.bank) {
		// console.log("Inside if block");
		setThirdCell(bankNameRow, user.bank.name);
		setThirdCell(accNumberRow, user.bank.accountNumber);
		setThirdCell(balanceRow, "-");
	} else {
		alert("Please add bank account!");
		return;
	}
}

function userDetails() {
	userName.value = user.name;
}

checkBtn.addEventListener("click", () => {
	if (user.password !== passwordEl.value) {
		showError(passwordEl, "Password is wrong!", 0);
	} else {
		clearError(passwordEl, 0);
		checkBox.classList.add("invisible");
		bankDetailsTable.style.display = "flex";
		setThirdCell(balanceRow, user.bank.balance);
	}
});

checkBalBtn.addEventListener("click", () => {
	if (!user) return;

	if (user.bank) {
		bankDetailsTable.style.display = "none";
		checkBox.classList.remove("invisible");
		// bankDetailsTable.classList.add("invisible");
		userDetails();
	} else {
		alert("Please add bank account first!");
		return;
	}
});

function isLoggedIn() {
	if (user) {
		loginBtn.style.display = "none";
		userBtn.style.backgroundColor = "whitesmoke";
		userBtn.innerText = `Hello, ${user.name.split(" ")[0]}`;
		checkBox.classList.add("invisible");
	} else {
		msgContainer.style.display = "block";
		userBtn.style.display = "none";
	}
}

(function init() {
	isLoggedIn();
	bankDetails();
})();
