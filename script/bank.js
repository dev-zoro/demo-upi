// --- utilities -----
function getStoredUser() {
	try {
		let raw = sessionStorage.getItem("user");
		return raw ? JSON.parse(raw) : null;
	} catch (error) {
		console.warn("Failed to parse stored user:", error);
		return null;
	}
}

function storeUser(u) {
	sessionStorage.setItem("user", JSON.stringify(u));
	localStorage.setItem("user", JSON.stringify(u));
}

// edit-bank-nam edit-acc-number edit-ifsc-code
let user = getStoredUser();

const loginBtn = document.getElementById("login-btn");
const userBtn = document.getElementById("user-btn");

const bankInfoTable = document.getElementById("bank-table");
const bankInfoForm = document.getElementById("bank-edit-mode");

const bankNameRow = document.getElementById("bank-name");
const accountNumberRow = document.getElementById("acc-number");
const ifscCodeRow = document.getElementById("ifsc-code");

const editBankName = document.getElementById("edit-bank-name");
const editAccNumber = document.getElementById("edit-acc-number");
const editIfscCode = document.getElementById("edit-ifsc-code");

const addAccBtn = document.getElementById("add-btn");
const saveBtn = document.getElementById("save-btn");
const optionBtns = document.querySelectorAll(".profile-btn");
const errors = document.querySelectorAll(".error");

const nameRegex = /^(?=.{2,50}$)(?=.*[A-Za-z])[A-Za-z.&\- ]+$/;
const accNumberRegex = /^\d{9,18}$/;
// 123456789, 123456789012345678
const ifscCodeRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/i;
// HDFC0001234, SBIN0001234

function isLoggedIn() {
	if (user) {
		loginBtn.style.display = "none";
		userBtn.style.backgroundColor = "whitesmoke";
		userBtn.innerText = `Hello, ${user.name}`;
	} else {
		userBtn.style.display = "none";
		loginBtn.style.display = "block";
	}
}

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
	// console.log(row);
	if (!row) return;
	// console.log(row);

	let cells = row.querySelectorAll("td");
	if (cells.length > 3) {
		cells[2].textContent = value;
	} else {
		let label = cells[0].textContent;
		row.innerHTML = `
        <td> ${label} </td>
        <td> : </td>
        <td> ${value} </td>`;
	}
}

function showbankInfo() {
	setThirdCell(bankNameRow, user.bank?.name || "-");
	setThirdCell(accountNumberRow, user.bank?.accountNumber || "-");
	setThirdCell(ifscCodeRow, user.bank?.ifscCode || "-");
	if (saveBtn) saveBtn.style.display = "none";
	if (bankInfoForm) bankInfoForm.style.display = "none";
}

function enterEditMode() {
	if (bankInfoTable) bankInfoTable.style.display = "none";
	if (bankInfoForm) bankInfoForm.style.display = "block";
	if (addAccBtn) addAccBtn.style.display = "none";
	if (saveBtn) saveBtn.style.display = "block";

	if (editBankName) editBankName.value = user.bank?.name || "";
	if (editAccNumber) editAccNumber.value = user.bank?.accountNumber || "";
	if (editIfscCode) editIfscCode.value = user.bank?.ifscCode || "";
}

function updateBankDetails({ name, accountNumber, ifscCode }) {
	user = {
		name: user?.name || "",
		number: user?.number || "",
		email: user?.email || "",
		password: user?.password || "",
		bank: {
			name: name,
			accountNumber: accountNumber,
			ifscCode: ifscCode,
			balance: 100000,
			isPrimary: true,
		},
	};
	storeUser(user);
}
function validateField(input, regex, message, index) {
	if (!regex.test(input.value)) {
		showError(input, message, index);
		return false;
	}
	clearError(input, index);
	return true;
}

function exitEditMode() {
	if (bankInfoForm) bankInfoForm.style.display = "none";
	if (bankInfoTable) bankInfoTable.style.display = "block";

	if (saveBtn) saveBtn.style.display = "none";
	if (addAccBtn) addAccBtn.style.display = "block";
}
function onSave() {
	let v1 = validateField(editBankName, nameRegex, "Enter a valid Name", 0);
	let v2 = validateField(
		editAccNumber,
		accNumberRegex,
		"Account number must be 9–18 digits.",
		1,
	);
	let v3 = validateField(
		editIfscCode,
		ifscCodeRegex,
		"Enter a valid IFSC (e.g., HDFC0001234).",
		2,
	);

	if (v1 && v2 && v3) {
		updateBankDetails({
			name: editBankName.value.trim(),
			accountNumber: editAccNumber.value.trim(),
			ifscCode: editIfscCode.value.trim(),
		});
		showbankInfo();
		exitEditMode();
	}
}

function wireButtons() {
	if (addAccBtn)
		addAccBtn.addEventListener("click", () => {
			enterEditMode();
			// validateData();
		});
	if (saveBtn)
		saveBtn.addEventListener("click", () => {
			onSave();
		});
}

function logout() {
	alert("You are logging out!");
	sessionStorage.removeItem("user");
	alert("Logged out successfully");
}

(function init() {
	isLoggedIn();
	showbankInfo();
	wireButtons();
})();

optionBtns[0].addEventListener("click", () => {
	window.location.href = "profile.html";
});

optionBtns[1].addEventListener("click", () => {
	window.location.href = "bank.html";
});

optionBtns[2].addEventListener("click", () => {
	window.location.href = "transcations.html";
});

optionBtns[3].addEventListener("click", () => {
	// sessionStorage.removeItem("user");
	logout();
	window.location.href = "../index.html";
});
