$mobileDarkModeToggle.addEventListener("click", () => {
	document.body.classList.toggle("dark");

	// Sets the local storage value for dark mode enabled or not
	if (document.body.classList.contains("dark")) {
		localStorage.setItem("dark-mode", "true");
		changeIconsToDark();
	} else {
		localStorage.setItem("dark-mode", "false");
		changeIconsToLight();
	}
});

$darkModeToggle.addEventListener("click", () => {
	document.body.classList.toggle("dark");

	// Sets the local storage value for dark mode enabled or not
	if (document.body.classList.contains("dark")) {
		localStorage.setItem("dark-mode", "true");
		changeIconsToDark();
	} else {
		localStorage.setItem("dark-mode", "false");
		changeIconsToLight();
	}
});

// Checks if dark mode is enabled or not in localStorage
if (localStorage.getItem("dark-mode") === "true") {
	document.body.classList.add("dark");
	changeIconsToDark();
} else {
	document.body.classList.remove("dark");
	changeIconsToLight();
}

function changeIconsToDark() {
	const logo = document.getElementById("logo-mobile");
	logo.src = "assets/mobile/logo-mobile-modo-noct.svg";
	$createGifBtn.src = "assets/mobile/button-crear-gifo-dark.svg";
	$navSearchIcon.src = "assets/mobile/icon-search-mod-noc.svg";
	$closeNavSearch.src = "assets/mobile/close-modo-noct.svg";
	$searchIcon.src = "assets/mobile/icon-search-mod-noc.svg";
	$closeSearchIcon.src = "assets/mobile/close-modo-noct.svg";
	$buttonPrevImg.src = "assets/mobile/button-left-dark.svg";
	$buttonNextImg.src = "assets/mobile/button-right-dark.svg";
	$camera.src = "assets/mobile/camara-modo-noc.svg";
	$celuloide.src = "assets/mobile/pelicula-modo-noc.svg";
	$maxGifBtnClose.src = "assets/mobile/close-modo-noct.svg";
	$burgerMenu.src = "assets/mobile/burger-dark.svg";
}

function changeIconsToLight() {
	const logo = document.getElementById("logo-mobile");
	logo.src = "assets/mobile/logo-mobile.svg";
	$createGifBtn.src = "assets/mobile/button-crear-gifo.svg";
	$navSearchIcon.src = "assets/mobile/icon-search.svg";
	$closeNavSearch.src = "assets/mobile/close.svg";
	$searchIcon.src = "assets/mobile/icon-search.svg";
	$closeSearchIcon.src = "assets/mobile/close.svg";
	$buttonPrevImg.src = "assets/mobile/button-left.svg";
	$buttonNextImg.src = "assets/mobile/button-right.svg";
	$camera.src = "assets/mobile/camara.svg";
	$celuloide.src = "assets/mobile/pelicula.svg";
	$maxGifBtnClose.src = "assets/mobile/close.svg";
	$burgerMenu.src = "assets/mobile/burger.svg";
}
