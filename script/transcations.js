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
const transcations = getStoredObject("transcations") || "";

const loginBtn = document.getElementById("login-btn");
const userBtn = document.getElementById("user-btn");
const backBtn = document.getElementById("back-btn");
const forwardBtn = document.getElementById("forward-btn");

const tBody = document.getElementById("table-body");
const optionBtns = document.querySelectorAll(".profile-btn");

let forwardStep = 3;
let stepsForward = 0;
let backwardStep = 0;
let stepsBackward = 0;
let i = 0;

function showTranscations() {
	if (transcations) {
		let len = 0;
		transcations.forEach((element) => {
			if (len <= 3) {
				let row = document.createElement("tr");
				row.innerHTML = `
                <td> ${element.receiver} </td>
                <td> ${element.amount} </td>
                <td> ${element.mode} </td>`;
				tBody.appendChild(row);
				len++;
			}
		});
	}
}

function showNextTranscations(index) {
	while (i < index) {
		let row = document.createElement("tr");
		row.innerHTML = `
        <td> ${transcations[i].receiver}</td>
        <td> ${transcations[i].amount} </td>
        <td> ${transcations[i].mode} </td>`;
		tBody.appendChild(row);
		i++;
	}
}

backBtn.addEventListener("click", () => {
	if (tBody.hasChildNodes() && stepsBackward <= stepsForward) {
		let len = tBody.children.length - 1;
		tBody.removeChild(tBody.children[len]);
		let row = document.createElement("tr");
		row.innerHTML = `
        <td> ${transcations[backwardStep].receiver} </td>
        <td> ${transcations[backwardStep].amount} </td>
        <td> ${transcations[backwardStep].mode} </td>`;
		tBody.children[0].after(row);
		backwardStep++;
	}
});

forwardBtn.addEventListener("click", () => {
	if (tBody.hasChildNodes()) {
		console.log(tBody.children.length);
		tBody.removeChild(tBody.children[1]);
		forwardStep++;
		stepsForward++;
		showNextTranscations(forwardStep);
	}
});

function isLogedIn() {
	if (user) {
		loginBtn.style.display = "none";
		userBtn.innerText = `Hello, ${user.name.split(" ")[0]}`;
	} else {
		userBtn.style.display = "none";
	}
}

function logout() {
	alert("You are logging out!");
	sessionStorage.removeItem("user");
	alert("Logged out successfully");
}

(function init() {
	isLogedIn();
	// showTranscations();
	if (transcations) {
		showNextTranscations(forwardStep);
	}
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
