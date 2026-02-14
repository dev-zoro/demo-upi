/** ---------- Utilities ---------- */
function getStoredUser() {
	try {
		const raw = sessionStorage.getItem("user");
		return raw ? JSON.parse(raw) : null;
	} catch (error) {
		console.warn("Failed to parse stored user:", error);
		return null;
	}
}

function storeUser(user) {
	sessionStorage.setItem("user", JSON.stringify(user));
	localStorage.setItem("user", JSON.stringify(user));
}

let user = getStoredUser();
console.log(user);

const loginBtn = document.getElementById("login-btn");
const userBtn = document.getElementById("user-btn");
// user-name user-number user-email
const userNameRow = document.getElementById("user-name");
const userNumberRow = document.getElementById("user-number");
const userEmailRow = document.getElementById("user-email");

const editBtn = document.getElementById("edit-btn");
const saveBtn = document.getElementById("save-btn");

const userInfoTable = document.getElementById("user-table");
const userInfoForm = document.getElementById("user-edit-mode");

const nameEl = document.getElementById("edit-name");
const numberEl = document.getElementById("edit-number");
const emailEl = document.getElementById("edit-email");

const errors = document.querySelectorAll(".error");
const optionBtns = document.querySelectorAll(".profile-btn");

const nameRegex = /^[a-zA-Z]+(?:\s[A-Za-z]+)+$/;
const numberRegex = /^[6-9]\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isLogedIn() {
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

function validateField(input, regex, index, message) {
	const val = (input?.value || "").trim();
	if (!regex.test(val)) {
		showError(input, message, index);
		return false;
	}
	clearError(input, index);
	return true;
}

function updateUser({ name, number, email }) {
	user = {
		name:
			name !== undefined && name.trim() !== "" ? name.trim() : user.name,
		number:
			number !== undefined && number.trim() !== ""
				? number.trim()
				: user.number,
		email: email !== undefined && email.trim() !== "" ? email.trim() : "",
		password: user.password,
	};
	console.log(user);
	storeUser(user);
}

function editUser() {
	userInfoTable.style.display = "none";
	userInfoForm.style.display = "block";
	editBtn.style.display = "none";
	saveBtn.style.display = "block";
	nameEl.value = user.name ? user.name : "";
	numberEl.value = user.number ? user.number : "";
	emailEl.value = user.email ? user.email : "";
}

function setThirdCell(row, value) {
	if (!row) return;
	const cells = row.querySelectorAll("td");
	if (cells.length >= 3) {
		cells[2].innerText = value;
	} else {
		const label = row[0]?.textContex || "Field";
		row.innerHTML = `
        <td> ${label} </td>
        <td> : </td>
        <td> ${value} </td>`;
	}
}

function showUserInfo() {
	setThirdCell(userNameRow, user?.name || "-");
	setThirdCell(userNumberRow, user?.number || "-");
	setThirdCell(userEmailRow, user?.email || "-");
	if (saveBtn) saveBtn.style.display = "none";
}

function enterEditMode() {
	if (userInfoTable) userInfoTable.style.display = "none";
	if (userInfoForm) userInfoForm.style.display = "block";
	if (editBtn) editBtn.style.display = "none";
	if (saveBtn) saveBtn.style.display = "block";

	if (nameEl) nameEl.value = user?.name || "";
	if (numberEl) numberEl.value = user?.number || "";
	if (emailEl) emailEl.value = user?.email || "";
}

function exitEditMode() {
	if (userInfoForm) userInfoForm.style.display = "none";
	if (userInfoTable) userInfoTable.style.display = "block";

	if (saveBtn) saveBtn.style.display = "none";
	if (editBtn) editBtn.style.display = "block";
}

function onSave() {
	// validate the entered fileds validateField(input, regex, 0, "")
	let v1 = validateField(
		nameEl,
		nameRegex,
		0,
		"Enter valid name (min 3 letters).",
	);
	let v2 = validateField(
		numberEl,
		numberRegex,
		1,
		"Enter valid 10-digit Indian mobile (starts with 6-9).",
	);
	let v3 = validateField(
		emailEl,
		emailRegex,
		2,
		"Enter valid email (e.g., name@example.com).",
	);

	if (!(v1 && v2 && v3)) return;

	updateUser({
		name: nameEl.value,
		number: numberEl.value,
		email: emailEl.value,
	});
	showUserInfo();
	isLogedIn();
	exitEditMode();
}

/** ---------- Wire up buttons ---------- */
function wireButtons() {
	if (editBtn)
		editBtn.addEventListener("click", () => {
			enterEditMode();
			// attachOnceValidation();
		});

	if (saveBtn) saveBtn.addEventListener("click", onSave);
}

function logout() {
	alert("You are logging out!");
	sessionStorage.removeItem("user");
	alert("Logged out successfully");
}

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

(function init() {
	isLogedIn();
	showUserInfo();
	wireButtons();
})();

// showUserInfo
// isLogedIn
// wireButtons

// enterEditMode
// attachOnceValidation
// onSave

// getUser -> render UserInfo -> editMode -> validation info -> saveUpdatedInfo
// -> render updatedUserInfo();
