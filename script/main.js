/* ********* NAVBAR******** */
// Logo
const logo = document.getElementById("logo-mobile");
logo.addEventListener("click", goToHome);

function goToHome() {
	$createGifSection.classList.add("hidden");
	$heroSection.classList.remove("hidden");
	$searchBarSection.classList.remove("hidden");
	$trendingTagsSection.classList.remove("hidden");
	$searchSection.classList.add("hidden");
	$favouriteSection.classList.add("hidden");
	$carouselSection.classList.remove("hidden");
	$myGifosSection.classList.add("hidden");
}

// Burger menu
const burgerMenu = document.getElementById("burger");
const menuLinks = document.getElementById("navlinks");
const borderLinks = document.getElementsByClassName("links-border");
burgerMenu.addEventListener("click", showMenu);

// Function that shows the menu on mobile version
function showMenu() {
	menuLinks.classList.toggle("menu-hide");
	for (let i = 0; i < borderLinks.length; i++) {
		borderLinks[i].classList.toggle("borders-actives");
	}
	changeBurgerMenu();
}

// This function switches between the burger menu icon and the button close icon
function changeBurgerMenu() {
	if (localStorage.getItem("dark-mode") === "true") {
		if (
			burgerMenu.src ===
			"https://gif-os.netlify.app/assets/mobile/burger-dark.svg"
		) {
			burgerMenu.src =
				"https://gif-os.netlify.app/assets/mobile/button-close-dark.svg";
		} else {
			burgerMenu.src =
				"https://gif-os.netlify.app/assets/mobile/burger-dark.svg";
		}
	} else {
		if (
			burgerMenu.src === "https://gif-os.netlify.app/assets/mobile/burger.svg"
		) {
			burgerMenu.src =
				"https://gif-os.netlify.app/assets/mobile/button-close.svg";
		} else {
			burgerMenu.src = "https://gif-os.netlify.app/assets/mobile/burger.svg";
		}
	}
}

// Sticky search bar in navbar
function displayStickySearch() {
	if (document.documentElement.scrollTop > 350) {
		if (window.innerWidth > 992) {
			$stickySearch.classList.remove("searchHidden");
		} else {
			$stickySearch.classList.add("searchHidden");
		}
	} else {
		$stickySearch.classList.add("searchHidden");
	}
}
window.addEventListener("scroll", displayStickySearch);

//Searchbar in Navbar
$navbarSearchInput.addEventListener("focus", setNavSearchActive);

function setNavSearchActive() {
	$navSearchActive.classList.remove("hidden");
	$navSearchIcon.classList.add("hidden");
	$closeNavSearch.classList.remove("hidden");
}

$closeNavSearch.addEventListener("click", resetSearch);
/* ********TRENDINGS TAGS********* */

// Request to Giphy API to show trending tags
async function getTrendingTags() {
	const url = `${trendingTagsEndpoint}?api_key=${apiKey}`;
	await fetch(url)
		.then((response) => response.json())
		.then((json) => {
			const trendingTagsArray = json.data.slice(0, 5);
			const trendingTagsCapitalize = trendingTagsArray
				.map((word) => {
					return word[0].toUpperCase() + word.substring(1);
				})
				.join(",");
			const newText = trendingTagsCapitalize.toString().split(",").join(", ");
			$trendingSearchTags.textContent = newText;
		})
		.catch((err) => console.log(err));
}

getTrendingTags();

/* ******** SEARCH BAR ********** */

/* Reset search bar to initial state */
function resetSearch() {
	$searchInput.value = "";
	$navbarSearchInput.value = "";
	setInactiveSearch();
}

/* Sets active search bar */
function setActiveSearch() {
	$searchSuggestions.classList.remove("hidden");
	$searchBar.classList.add("searchActive");
	$searchIcon.classList.add("hidden");
	$closeSearchIcon.classList.remove("hidden");
	$searchIconActive.classList.remove("hidden");
}

/* Sets inactive search bar */
function setInactiveSearch() {
	$searchSuggestions.classList.add("hidden");
	$searchBar.classList.remove("searchActive");
	if ($searchInput.value == "") {
		$searchIcon.classList.remove("hidden");
		$closeSearchIcon.classList.add("hidden");
		$searchIconActive.classList.add("hidden");
	}
}

/* Resets list of search suggestions */
function cleanSearchSuggestions() {
	$searchSuggestions.classList.add("hidden");
	$searchSuggestionList.innerHTML = "";
	setActiveSearch();
}

// Request to Giphy API to autocomplete search suggestions
async function showSearchSuggestions() {
	cleanSearchSuggestions();
	let inputValue = $searchInput.value;
	const url = `${searchAutocompleteEndpoint}?api_key=${apiKey}&q=${inputValue}&limit=4`;
	await fetch(url)
		.then((response) => response.json())
		.then((result) => {
			for (let i = 0; i < result.data.length; i++) {
				const li = document.createElement("li");
				li.setAttribute("onmousedown", `searchGifs('${result.data[i].name}')`);
				li.innerHTML = `
                <img class="searchList-icon" src="assets/mobile/icon-search-grey.svg" alt="search icon">
                <span id="suggestion-${i}">${result.data[i].name}</span>`;
				$searchSuggestionList.appendChild(li);
			}
		})
		.catch((err) => console.log(err));
	$searchSuggestions.classList.remove("hidden");
	$searchBar.classList.add("searchActive");
}

let offSet = 0;
async function searchGifs(search) {
	cleanSearchSuggestions();
	cleanFavourites();
	$heroSection.classList.remove("hidden");
	$searchBarSection.classList.remove("hidden");
	$trendingTagsSection.classList.remove("hidden");
	$searchInput.value = search;
	$navbarSearchInput.value = search;
	$searchSection.classList.remove("hidden");
	$searchTitle.innerHTML = search;

	if (offSet === 0) {
		$searchGallery.innerHTML = "";
	}

	let searchUrl = `${searchEndpoint}?api_key=${apiKey}&q=${search}&limit=12&offset=${offSet}&rating=pg`;
	await fetch(searchUrl)
		.then((response) => response.json())
		.then((results) => {
			if (results.data == 0) {
				displayErrorSearch();
			} else {
				displaySearchResults(results);
			}
		});
}

function displayErrorSearch() {
	$searchSection.classList.remove("hidden");
	$searchViewMore.classList.add("hidden");
	$errorSearch.classList.remove("hidden");
}

function displaySearchResults(results) {
	$searchViewMore.classList.remove("hidden");

	if (offSet === 0) {
		window.scrollTo({ top: 400, behavior: "smooth" });
	}

	if (results.data.length < 12) {
		$searchViewMore.style.display = "none";
	}

	for (let i = 0; i < results.data.length; i++) {
		const gifsContainer = document.createElement("div");
		gifsContainer.setAttribute("class", "gifsContainer");
		gifsContainer.innerHTML = `
		<img class="gif" src="${
			results.data[i].images.downsized.url
		}" onclick="maximizeGif('${results.data[i].images.downsized.url}', '${
			results.data[i].username
		}', '${results.data[i].title}', '${i + offSet}')">
		
		<div class="gifHover">
		<div class="gifHover__icons">
		<img class="gif-icons" src="assets/mobile/icon-fav-hover.svg" alt="icon fav" id="fav${
			i + offSet
		}" onclick="addToFavouritesAndChangeIcon('${
			results.data[i].images.downsized.url
		}', '${results.data[i].title}', '${results.data[i].username}', 'fav${
			i + offSet
		}')">
		<img class="gif-icons" src="assets/mobile/icon-download.svg" alt="icon download" onclick="downloadGif('${
			results.data[i].images.original.url
		}', '${results.data[i].title}')">
		<img class="gif-icons" id="max-${
			i + offSet
		}" src="assets/mobile/icon-max.svg" alt="icon max" onclick="maximizeGif('${
			results.data[i].images.downsized.url
		}', '${results.data[i].username}', '${results.data[i].title}', '${
			i + offSet
		}')">
		</div>
        <div class="gifHover__textBox">
        <p class="gifHover__textBox__text">${results.data[i].username}</p>
        <p class="gifHover__textBox__text">${results.data[i].title}</p>
        </div>
		</div>

		
        `;
		$searchGallery.appendChild(gifsContainer);
	}
}

function addToFavouritesAndChangeIcon(url, title, username, id) {
	addToFavourites(url, title, username);
	changeFavIcon(id, url);
}
function cleanResults() {
	$searchGallery.innerHTML = "";
	$searchSection.classList.add("hidden");
	$errorSearch.classList.add("hidden");
}

function viewMoreBtn() {
	offSet += 12;
	if ($searchInput.value) {
		searchGifs($searchInput.value);
	} else {
		searchGifs($navbarSearchInput.value);
	}
}

$searchInput.addEventListener("focus", setActiveSearch);
$searchInput.addEventListener("input", showSearchSuggestions);
$searchInput.addEventListener("focusout", setInactiveSearch);
$searchInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		searchGifs($searchInput.value);
		cleanSearchSuggestions();
	}
});
$searchIconActive.addEventListener("click", () =>
	searchGifs($searchInput.value),
);
$closeSearchIcon.addEventListener("click", () => {
	resetSearch();
	cleanResults();
});
$closeNavSearch.addEventListener("click", () => {
	resetSearch();
	cleanResults();
});
$navSearchActive.addEventListener("click", () => {
	searchGifs($navbarSearchInput.value);
});
$navbarSearchInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		searchGifs($navbarSearchInput.value);
		cleanSearchSuggestions();
	}
});
$searchViewMore.addEventListener("click", viewMoreBtn);

/* ********* TRENDING CAROUSEL HOME *********** */

// Request to Giphy API to show trending gifs
const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=10&rating=pg`;

async function getTrendingGifs() {
	await fetch(url)
		.then((response) => response.json())
		.then((results) => {
			for (let i = 0; i < results.data.length; i++) {
				showTrendingGifs(results.data[i], i);
			}
		})
		.catch((err) => console.log(err));
}

// Shows a carousel of trending gifs
function showTrendingGifs(json, i) {
	const gifCard = document.createElement("div");
	gifCard.setAttribute("class", "gifCard");
	gifCard.setAttribute("id", `gif${i}`);
	gifCard.innerHTML = `
    <img class="gifCard__gif" src="${json.images.downsized.url}" alt="${json.title}">`;
	$trendingTrack.appendChild(gifCard);

	// Creates a hover over the gif with gif's info and action buttons
	const gifHover = document.createElement("div");
	gifHover.setAttribute("class", "gifHover hidden");
	gifHover.setAttribute("id", `gifHover${i}`);

	gifHover.innerHTML = `<div class="gifHover__icons">
    <img class="gif-icons" src="assets/mobile/icon-fav-hover.svg" alt="icon fav" id="fav${i}">
    <img class="gif-icons" src="assets/mobile/icon-download.svg" alt="icon download" onclick="downloadGif('${json.images.original.url}', '${json.title}')">
    <img class="gif-icons" id="max-${i}" src="assets/mobile/icon-max.svg" alt="icon max">
    </div>
    <div class="gifHover__textBox">
    <p class="gifHover__textBox__text">${json.username}</p>
    <p class="gifHover__textBox__text">${json.title}</p>
    </div>`;
	gifCard.appendChild(gifHover);

	// Maximizes gif when clicked max button
	let maxIcon = document.getElementById(`max-${i}`);
	maxIcon.setAttribute(
		"onclick",
		`maximizeGif('${json.images.downsized.url}', '${json.username}', '${json.title}', '${i}')`,
	);

	// In mobile maximizes gif when touched, in desktop
	// display hover when mouse move over gif
	gifCard.addEventListener("mouseover", () => {
		if (window.innerWidth > 990) {
			let hoverOn = document.getElementById(`gifHover${i}`);
			hoverOn.classList.remove("hidden");
		} else {
			maximizeGif(json.images.downsized.url, json.username, json.title, i);
		}
	});
	gifCard.addEventListener("mouseout", () => {
		let hoverOut = document.getElementById(`gifHover${i}`);
		hoverOut.classList.add("hidden");
	});

	// Adds a click event on close button to close maximized Gifs
	$maxGifBtnClose.addEventListener("click", closeMax);

	// Add scroll function to buttons on desktop carousel
	addScrollToCarousel();

	// Changes fav icon when clicked
	let favIcon = document.getElementById(`fav${i}`);
	favIcon.addEventListener("click", () => {
		let isFavHidden = $favouriteSection.classList.contains("hidden");
		if (!isFavHidden) {
			addToFavourites(json.images.downsized.url, json.title, json.username);
			changeHoverIcon(`fav${i}`, json.images.downsized.url);
			displayFavourites();
		} else {
			addToFavourites(json.images.downsized.url, json.title, json.username);
			changeHoverIcon(`fav${i}`, json.images.downsized.url);
		}
	});
}

// Change carousel's buttons styles on hover
function hoverCarouselButton() {
	let buttonPrev = document.getElementById("btnImg-prev");
	let buttonNext = document.getElementById("btnImg-next");
	$prevBtn.addEventListener("mouseover", () => {
		if (localStorage.getItem("dark-mode") === "true") {
			buttonPrev.src = "./assets/mobile/button-left-dark-hover.svg";
		} else {
			buttonPrev.src = "./assets/mobile/button-left-hover.svg";
		}
	});
	$prevBtn.addEventListener("mouseout", () => {
		if (localStorage.getItem("dark-mode") === "true") {
			buttonPrev.src = "./assets/mobile/button-left-dark.svg";
		} else {
			buttonPrev.src = "./assets/mobile/button-left.svg";
		}
	});
	$nextBtn.addEventListener("mouseover", () => {
		if (localStorage.getItem("dark-mode") === "true") {
			buttonNext.src = "./assets/mobile/button-right-dark-hover.svg";
		} else {
			buttonNext.src = "./assets/mobile/button-right-hover.svg";
		}
	});
	$nextBtn.addEventListener("mouseout", () => {
		if (localStorage.getItem("dark-mode") === "true") {
			buttonNext.src = "./assets/mobile/button-right-dark.svg";
		} else {
			buttonNext.src = "./assets/mobile/button-right.svg";
		}
	});
}

getTrendingGifs();
hoverCarouselButton();

// Add scroll behaviour to carousel buttons for desktop resolutions
function addScrollToCarousel() {
	$prevBtn.addEventListener("click", scrollToPrevItem);
	$nextBtn.addEventListener("click", scrollToNextItem);
}
function scrollToNextItem() {
	$trendingTrack.scrollLeft += 360;
}
function scrollToPrevItem() {
	$trendingTrack.scrollLeft -= 360;
}

/* ***** MAXIMIZE GIF ****** */
//Maximize Gif
function maximizeGif(src, user, title, index) {
	$maxGifContainer.innerHTML = `
    <img class="maxGif" src="${src}" alt="${title}">
    `;

	// Check if there is any favourite in localStorage
	const favIsEmpty = JSON.parse(localStorage.getItem("favourites"));
	if (Array.isArray(favIsEmpty) && favIsEmpty.length !== 0) {
		const isFav = favArray.some((el) => el.gif === src);
		// Check if gif is favourite or not and renders the icons
		if (isFav) {
			if (localStorage.getItem("dark-mode") === "true") {
				$maxIcons.innerHTML = `
				<img src="assets/mobile/icon-fav-active-dark.svg" alt="add to favourite" id="maxFav-icon${index}"/>
				<img src="./assets/mobile/icon-download-dark.svg" alt="download gif" id="download-btn${index}"/>
				`;
			} else {
				$maxIcons.innerHTML = `
				<img src="assets/mobile/icon-fav-active.svg" alt="add to favourite" id="maxFav-icon${index}"/>
				<img src="./assets/mobile/icon-download.svg" alt="download gif" id="download-btn${index}"/>
				`;
			}
		} else {
			if (localStorage.getItem("dark-mode") === "true") {
				$maxIcons.innerHTML = `
			<img src="assets/mobile/icon-fav-hover-dark.svg" alt="add to favourite" id="maxFav-icon${index}"/>
			<img src="./assets/mobile/icon-download-dark.svg" alt="download gif" id="download-btn${index}"/>
			`;
			} else {
				$maxIcons.innerHTML = `
				<img src="assets/mobile/icon-fav-hover.svg" alt="add to favourite" id="maxFav-icon${index}"/>
				<img src="./assets/mobile/icon-download.svg" alt="download gif" id="download-btn${index}"/>
				`;
			}
		}
	} else {
		if (localStorage.getItem("dark-mode") === "true") {
			$maxIcons.innerHTML = `
			<img src="assets/mobile/icon-fav-hover-dark.svg" alt="add to favourite" id="maxFav-icon${index}"/>
			<img src="./assets/mobile/icon-download-dark.svg" alt="download gif" id="download-btn${index}"/>
			`;
		} else {
			$maxIcons.innerHTML = `
			<img src="assets/mobile/icon-fav-hover.svg" alt="add to favourite" id="maxFav-icon${index}"/>
			<img src="./assets/mobile/icon-download.svg" alt="download gif" id="download-btn${index}"/>
			`;
		}
	}

	// Display maximized gif
	$maxGifSection.classList.add("maximized-container");
	$maxGifSection.classList.remove("hidden");
	$maxGifCloseContainer.classList.remove("hidden");
	$maxGifIcons.classList.remove("hidden");
	$maxGifTitle.textContent = title;
	$maxGifUser.textContent = user;

	// Add action to download button
	let download = document.getElementById(`download-btn${index}`);
	download.setAttribute("onclick", `downloadGif('${src}', '${title}')`);

	// Add action to favourite button
	let favIcon = document.getElementById(`maxFav-icon${index}`);
	favIcon.addEventListener("click", () => {
		let isFavHidden = $favouriteSection.classList.contains("hidden");
		if (!isFavHidden) {
			addToFavourites(src, title, user);
			changeFavIcon(`maxFav-icon${index}`, src);
			changeHoverIcon(`fav${index}`, src);
			displayFavourites();
		} else {
			addToFavourites(src, title, user);
			changeFavIcon(`maxFav-icon${index}`, src);
			changeHoverIcon(`fav${index}`, src);
		}
	});
}

// Close maximized gif
function closeMax() {
	$maxGifSection.classList.remove("maximized-container");
	$maxGifSection.classList.add("hidden");
	$maxGifCloseContainer.classList.add("hidden");
	$maxGifIcons.classList.add("hidden");
}

/* ***** DOWNLOAD FUNCTION ****** */
// Asynchronous function that fetch the gif url and creates a blob to force download
async function downloadGif(url, title) {
	await fetch(url)
		.then((response) => response.blob())
		.then((blob) => {
			let blobUrl = URL.createObjectURL(blob);
			forceDownload(blobUrl, title);
		})
		.catch((err) => console.log(err));
}
// Creates a <a> tag to force download and then eliminates it
function forceDownload(blob, title) {
	let link = document.createElement("a");
	link.href = blob;
	link.download = title;
	document.body.appendChild(link);
	link.click();
	link.remove();
}

/* ***** ADD TO FAVOURITES FUNCTION ***** */

let favArray = localStorage.setItem("favourites", JSON.stringify([]));
function addToFavourites(url, title, user) {
	let favObj = { gif: url, title: title, username: user };
	// Checks if the gif is already in localStorage
	// If it is, it will be removed, otherwise it
	// will be added to localStorage
	favArray = JSON.parse(localStorage.getItem("favourites"));
	const found = favArray.some((el) => el.gif === url);
	if (!found) {
		favArray.push(favObj);
		localStorage.setItem("favourites", JSON.stringify(favArray));
	} else {
		removeFavourite(favObj);
	}
}

// Remove gif from favourites when clicked on fav active
function removeFavourite(obj) {
	const newFavArray = favArray.filter((item) => item.gif !== obj.gif);
	favArray = [...newFavArray];
	localStorage.setItem("favourites", JSON.stringify(favArray));
	let isFavHidden = $favouriteSection.classList.contains("hidden");
	if (!isFavHidden) {
		$maxGifSection.classList.remove("maximized-container");
		$maxGifSection.classList.add("hidden");
		displayFavourites();
	}
}

// Changes fav icon when clicked
function changeFavIcon(id, url) {
	let tag = document.getElementById(id);
	const isFav = favArray.some((el) => el.gif === url);
	if (localStorage.getItem("dark-mode") === "true") {
		if (isFav) {
			tag.src = "assets/mobile/icon-fav-active-dark.svg";
		} else {
			tag.src = "assets/mobile/icon-fav-hover-dark.svg";
		}
	} else {
		if (isFav) {
			tag.src = "assets/mobile/icon-fav-active.svg";
		} else {
			tag.src = "assets/mobile/icon-fav-hover.svg";
		}
	}
}

// Changes the fav icon on the hover when clicked on maximized gif
function changeHoverIcon(index, src) {
	let iconTag = document.getElementById(index);
	const isFav = favArray.some((el) => el.gif === src);
	if (isFav) {
		iconTag.src = "assets/mobile/icon-fav-active.svg";
	} else {
		iconTag.src = "assets/mobile/icon-fav-hover.svg";
	}
}

/* ******** FAVOURITES *********** */
$favMenuBtn.addEventListener("click", activeFavourites);
$brgFavBtn.addEventListener("click", () => {
	activeFavourites();
	showMenu();
});

function activeFavourites() {
	window.scrollTo({ top: 0, behavior: "smooth" });
	$favouriteSection.classList.remove("hidden");
	$heroSection.classList.add("hidden");
	$searchBarSection.classList.add("hidden");
	$trendingTagsSection.classList.add("hidden");
	$searchSection.classList.add("hidden");
	$myGifosSection.classList.add("hidden");
	cleanFavourites();
	displayFavourites();
}

let favOffset = 0;
function displayFavourites() {
	cleanFavourites();
	let favourites = JSON.parse(localStorage.getItem("favourites"));
	if (favOffset === 0) {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	if (favourites.length < 12) {
		$favViewMore.style.display = "none";
	} else {
		$favViewMore.style.display = "block";
	}

	if (favourites.length === 0) {
		cleanFavourites();
		displayFavEmpty();
	} else {
		if (favourites.length > 12) {
			let favChunk = favourites.slice(0, 12);
			displayFavGifs(favChunk);
		} else {
			displayFavGifs(favourites);
		}
	}
}

function favViewMoreBtn() {
	let favourites = JSON.parse(localStorage.getItem("favourites"));
	favOffset += 12;
	let favChunk = favourites.slice(favOffset, favOffset + 12);
	displayFavGifs(favChunk);
}

$favViewMore.addEventListener("click", favViewMoreBtn);

function displayFavEmpty() {
	$favEmpty.classList.remove("hidden");
}

function displayFavGifs(favourites) {
	if (favourites.length < 12) {
		$favViewMore.style.display = "none";
	}
	for (let i = 0; i < favourites.length; i++) {
		const favGifContainer = document.createElement("div");
		favGifContainer.setAttribute("class", "favGifContainer");
		favGifContainer.innerHTML = `
		<img class="gif" src="${favourites[i].gif}" onclick="maximizeFavGif('${
			favourites[i].gif
		}', '${favourites[i].username}', '${favourites[i].title}', '${
			i + favOffset
		}')">
		
		<div class="favHover">
		<div class="favHover__icons">
		<img class="gif-icons" src="assets/mobile/icon_trash.svg" alt="icon trash" id="trash${
			i + favOffset
		}" >
		<img class="gif-icons" src="assets/mobile/icon-download.svg" alt="icon download" onclick="downloadGif('${
			favourites[i].gif
		}', '${favourites[i].title}')">
		<img class="gif-icons" id="max-${
			i + favOffset
		}" src="assets/mobile/icon-max.svg" alt="icon max" onclick="maximizeFavGif('${
			favourites[i].gif
		}', '${favourites[i].username}', '${favourites[i].title}', '${
			i + favOffset
		}')">
		</div>
        <div class="favHover__textBox">
        <p class="favHover__textBox__text">${favourites[i].username}</p>
        <p class="favHover__textBox__text">${favourites[i].title}</p>
        </div>
		</div>

		
        `;
		$favGifs.appendChild(favGifContainer);
		let trashIcon = document.getElementById(`trash${i + favOffset}`);
		trashIcon.addEventListener("click", () => {
			removeFavourite(favourites[i]);
		});
	}
}

// Cleans favourite section before render
function cleanFavourites() {
	$favGifs.innerHTML = "";
	$favEmpty.classList.add("hidden");
}

function maximizeFavGif(src, user, title, index) {
	let obj = { gif: src, title: title, username: user };

	$maxGifContainer.innerHTML = `
    <img class="maxGif" src="${src}" alt="${title}">
    `;

	// Check if gif is favourite or not and renders the icons
	const isFav = favArray.some((el) => el.gif === src);

	if (localStorage.getItem("dark-mode") === "true") {
		$maxIcons.innerHTML = `
		<img src="assets/mobile/icon_trash-dark.svg" alt="add to favourite" id="trash-icon${index}"/>
		<img src="./assets/mobile/icon-download-dark.svg" alt="download gif" id="download-btn${index}"/>
		`;
	} else {
		$maxIcons.innerHTML = `
		<img src="assets/mobile/icon_trash.svg" alt="add to favourite" id="trash-icon${index}"/>
		<img src="./assets/mobile/icon-download.svg" alt="download gif" id="download-btn${index}"/>
		`;
	}

	// Display maximized gif
	$maxGifSection.classList.add("maximized-container");
	$maxGifSection.classList.remove("hidden");
	$maxGifCloseContainer.classList.remove("hidden");
	$maxGifIcons.classList.remove("hidden");
	$maxGifTitle.textContent = title;
	$maxGifUser.textContent = user;

	// Add action to download button
	let download = document.getElementById(`download-btn${index}`);
	download.setAttribute("onclick", `downloadGif('${src}', '${title}')`);

	// Add action to favourite button
	let trashIcon = document.getElementById(`trash-icon${index}`);
	trashIcon.addEventListener("click", () => {
		removeFavourite(obj);
	});
}

/* ******************************* CREATE GIFOS ************************************* */

$buttonGrabar.style.display = "none";
$buttonFinalizar.style.display = "none";
$buttonSubirGif.style.display = "none";
$overlay.style.display = "none";
$createGifBtn.addEventListener("click", () => {
	$createGifSection.classList.remove("hidden");
	$heroSection.classList.add("hidden");
	$searchBarSection.classList.add("hidden");
	$trendingTagsSection.classList.add("hidden");
	$searchSection.classList.add("hidden");
	$favouriteSection.classList.add("hidden");
	$carouselSection.classList.add("hidden");
	$myGifosSection.classList.add("hidden");
});
$createGifBtn.addEventListener("mouseover", () => {
	if (localStorage.getItem("dark-mode") === "true") {
		$createGifBtn.src = "assets/mobile/button-crear-gifo-dark-hover.svg";
	} else {
		$createGifBtn.src = "assets/mobile/button-crear-gifo-hover.svg";
	}
});
$createGifBtn.addEventListener("mouseout", () => {
	if (localStorage.getItem("dark-mode") === "true") {
		$createGifBtn.src = "assets/mobile/button-crear-gifo-dark.svg";
	} else {
		$createGifBtn.src = "assets/mobile/button-crear-gifo.svg";
	}
});
let recorder;
let blob;
let form = new FormData();
let arrMyGifos = [];

// Sets timer
let timer;
let hours = "00";
let minutes = "00";
let seconds = "00";

// Executes camera and sets API
async function getStreamAndRecord() {
	$crearGifTitle.innerHTML = `¿Nos das acceso <br> a tu cámara?`;
	$crearGifText.innerHTML = `El acceso a tu camara será válido sólo <br> por el tiempo en el que estés creando el GIFO.`;
	$buttonComenzar.style.visibility = "hidden";
	$step1.classList.add("step-active");

	await navigator.mediaDevices
		.getUserMedia({
			audio: false,
			video: {
				height: { max: 480 },
			},
		})
		.then((mediaStreamObj) => {
			$crearGifTitle.classList.add("hidden");
			$crearGifText.classList.add("hidden");
			$step1.classList.remove("step-active");
			$step2.classList.add("step-active");
			$buttonComenzar.style.display = "none";
			$buttonGrabar.style.display = "block";
			$video.classList.remove("hidden");
			$video.srcObject = mediaStreamObj;
			$video.play();

			recorder = RecordRTC(mediaStreamObj, {
				type: "gif",
				frameRate: 1,
				quality: 10,
				width: 360,
				hidden: 240,
				onGifRecordingStarted: function () {
					console.log("started");
				},
			});
		})
		.catch((err) => console.log(err));
}

// When click on start, it executes camera and sets API
$buttonComenzar.addEventListener("click", getStreamAndRecord);

// Start the recording
function createGifo() {
	console.log("está grabando");
	$buttonGrabar.style.display = "none";
	$buttonFinalizar.style.display = "block";
	$timer.classList.remove("hidden");
	$repeatBtn.classList.add("hidden");
	recorder.startRecording();
	timer = setInterval(timerActive, 1000);
}

$buttonGrabar.addEventListener("click", createGifo);

// Stop the recording
function stopCreatingGif() {
	$video.classList.add("hidden");
	$recordedGifo.classList.remove("hidden");
	recorder.stopRecording(() => {
		blob = recorder.getBlob();
		$recordedGifo.src = URL.createObjectURL(blob);

		form.append("file", recorder.getBlob(), "myGif.gif");
		console.log(form.get("file"));
	});

	$buttonFinalizar.style.display = "none";
	$buttonSubirGif.style.display = "block";
	$timer.classList.add("hidden");
	$repeatBtn.classList.remove("hidden");

	// acá debería limpiar y volver a setear el cronómetro
	clearInterval(timer);
	hours = "00";
	minutes = "00";
	seconds = "00";
	$timer.innerText = `${hours}:${minutes}:${seconds}`;
}

$buttonFinalizar.addEventListener("click", stopCreatingGif);

// Function to upload to Giphy and store in my gifos
async function uploeadCreatedGif() {
	$overlay.style.display = "flex";
	$step2.classList.remove("step-active");
	$step3.classList.add("step-active");
	$repeatBtn.classList.add("hidden");
	$buttonSubirGif.style.visibility = "hidden";

	await fetch(`${uploadGifEndpoint}?api_key=${apiKey}`, {
		method: "POST",
		body: form,
	})
		.then((response) => response.json())
		.then((myGif) => {
			let myGifoId = myGif.data.id;
			console.log(myGif.data.id);
			$overlayStatusIcon.src = "assets/mobile/check.svg";
			$overlayStatusText.innerHTML = "GIFO subido con éxito";

			let buttonsMyGif = document.createElement("div");
			buttonsMyGif.classList.add("overlay__buttons");
			buttonsMyGif.innerHTML = `<img class="btns downloadOverlay" onclick="downloadCreatedGif('${myGifoId}')" src="assets/mobile/icon-download.svg"/> 
			<img class="btns linkOverlay" onclick="displayMisGifosSection(event)" src="assets/mobile/icon-link.svg"/>`;
			$overlay.appendChild(buttonsMyGif);

			arrMyGifos.push(myGifoId);
			console.log(arrMyGifos);

			myGifos = localStorage.setItem("MyGifs", JSON.stringify(arrMyGifos));
		})
		.catch((err) => {
			console.error(err);
		});
}

$buttonSubirGif.addEventListener("click", uploeadCreatedGif);

// Repeat recording
function repeatRecordingGif(event) {
	event.preventDefault();
	recorder.clearRecordedData();
	$step2.classList.add("step-active");
	$repeatBtn.classList.add("hidden");
	$buttonGrabar.style.display = "block";
	$buttonSubirGif.style.display = "none";
	$video.classList.remove("hidden");
	$recordedGifo.classList.add("hidden");

	navigator.mediaDevices
		.getUserMedia({
			audio: false,
			video: {
				height: { max: 480 },
			},
		})
		.then((mediaStreamObj) => {
			$video.srcObject = mediaStreamObj;
			$video.play();

			recorder = RecordRTC(mediaStreamObj, {
				type: "gif",
				frameRate: 1,
				quality: 10,
				width: 360,
				hidden: 240,
				onGifRecordingStarted: function () {
					console.log("started");
				},
			});
		})
		.catch((err) => console.log(err));
}
$repeatBtn.addEventListener("click", repeatRecordingGif);

// Download created gifos
async function downloadCreatedGif(myGifId) {
	await fetch(`https://media.giphy.com/media/${myGifId}/giphy.gif`)
		.then((response) => response.blob())
		.then((blob) => {
			let blobUrl = URL.createObjectURL(blob);
			forceDownload(blobUrl, "my-gif.gif");
		})
		.catch((err) => console.log(err));
}

// Timer function
function timerActive() {
	seconds++;

	if (seconds < 10) seconds = `0` + seconds;

	if (seconds > 59) {
		seconds = `00`;
		minutes++;

		if (minutes < 10) minutes = `0` + minutes;
	}

	if (minutes > 59) {
		minutes = `00`;
		hours++;

		if (hours < 10) hours = `0` + hours;
	}

	$timer.innerHTML = `${hours}:${minutes}:${seconds}`;
}

/* ********************************* MY GIFOS ******************************** */

// Display gifos section
function displayMisGifosSection() {
	$myGifosSection.classList.remove("hidden");
	$heroSection.classList.add("hidden");
	$favouriteSection.classList.add("hidden");
	$createGifSection.classList.add("hidden");
	$trendingTagsSection.classList.add("hidden");
	window.scrollTo({ top: 0, behavior: "smooth" });
	displayMiGifos();

	if (arrMyGifos.length == 0 || arrMyGifos == null) {
		$myGifosEmpty.classList.remove("hidden");
		$myGifosGallery.classList.add("hidden");
	} else {
		$myGifosEmpty.classList.add("hidden");
		$myGifosGallery.classList.remove("hidden");
	}
}

$myGifosMenu.addEventListener("click", displayMisGifosSection);
$brgMyGifosMenu.addEventListener("click", (e) => {
	showMenu();
	displayMisGifosSection(e);
});

// Display gifos created by users
function displayMiGifos() {
	$myGifosGallery.innerHTML = "";

	arrMyGifos = JSON.parse(localStorage.getItem("MyGifs"));

	console.log(arrMyGifos);
	if (arrMyGifos == null) {
		arrMyGifos = [];
	} else {
		for (let i = 0; i < arrMyGifos.length; i++) {
			fetch(
				`https://api.giphy.com/v1/gifs?ids=${arrMyGifos[i]}&api_key=${apiKey}`,
			)
				.then((response) => response.json())
				.then((misGifosGiphy) => {
					let gifId = misGifosGiphy.data[0].id;
					const gifContainer = document.createElement("div");
					gifContainer.setAttribute("class", "gif__container");

					gifContainer.innerHTML = `
					<img class="miGifos__gifs__gallery__gif" src="${misGifosGiphy.data[0].images.downsized.url}" alt="${misGifosGiphy.data[0].title}">
					`;
					$myGifosGallery.appendChild(gifContainer);

					// Creates a hover over the gif with gif's info and action buttons
					const gifoHover = document.createElement("div");
					gifoHover.setAttribute("class", "gifoHover hidden");
					gifoHover.setAttribute("id", `gifoHover${i}`);

					gifoHover.innerHTML = `<div class="gifoHover__icons">
					<img class="gif-icons" src="assets/mobile/icon_trash.svg" alt="icon trash" id="trash${i}">
					<img class="gif-icons" src="assets/mobile/icon-download.svg" alt="icon download" onclick="downloadGif('${misGifosGiphy.data[0].images.downsized.url}', '${misGifosGiphy.data[0].title}')">
					<img class="gif-icons" id="max-${i}" src="assets/mobile/icon-max.svg" alt="icon max">
					</div>
					<div class="gifoHover__textBox">
					<p class="gifoHover__textBox__text">${misGifosGiphy.data[0].username}</p>
					<p class="gifoHover__textBox__text">${misGifosGiphy.data[0].title}</p>
					</div>`;
					gifContainer.appendChild(gifoHover);

					// Maximizes gif when clicked max button
					let maxIcon = document.getElementById(`max-${i}`);
					maxIcon.setAttribute(
						"onclick",
						`maximizeMyGifos('${misGifosGiphy.data[0].images.downsized.url}', '${misGifosGiphy.data[0].username}', '${misGifosGiphy.data[0].title}', '${i}', '${gifId}')`,
					);

					// In mobile maximizes gif when touched, in desktop
					// display hover when mouse move over gif
					gifContainer.addEventListener("mouseover", (e) => {
						if (window.innerWidth > 990) {
							let hoverOn = document.getElementById(`gifoHover${i}`);
							hoverOn.classList.remove("hidden");
						} else {
							maximizeMyGifos(
								misGifosGiphy.data[0].images.downsized.url,
								misGifosGiphy.data[0].username,
								misGifosGiphy.data[0].title,
								i,
								gifId,
							);
						}
					});
					gifContainer.addEventListener("mouseout", (e) => {
						let hoverOut = document.getElementById(`gifoHover${i}`);
						hoverOut.classList.add("hidden");
					});

					// Adds a click event on close button to close maximized Gifs
					$maxGifBtnClose.addEventListener("click", closeMax);

					// Removes gif from favourites
					let trashIcon = document.getElementById(`trash${i}`);
					trashIcon.addEventListener("click", () => {
						removeMyGifos(gifId);
					});
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}
}

// Maximizes my gifos
function maximizeMyGifos(src, user, title, index, id) {
	let obj = { gif: src, title: title, username: user };

	$maxGifContainer.innerHTML = `
    <img class="maxGif" src="${src}" alt="${title}">
    `;

	$maxIcons.innerHTML = `
		<img src="assets/mobile/icon_trash.svg" alt="add to favourite" id="trash-icon${index}"/>
		<img src="./assets/mobile/icon-download.svg" alt="download gif" id="download-btn${index}"/>
		`;

	// Display maximized gif
	$maxGifSection.classList.add("maximized-container");
	$maxGifSection.classList.remove("hidden");
	$maxGifCloseContainer.classList.remove("hidden");
	$maxGifIcons.classList.remove("hidden");
	$maxGifTitle.textContent = title;
	$maxGifUser.textContent = user;

	// Add action to download button
	let download = document.getElementById(`download-btn${index}`);
	download.setAttribute("onclick", `downloadGif('${src}', '${title}')`);

	// Add action to favourite button
	let trashIcon = document.getElementById(`trash-icon${index}`);
	trashIcon.addEventListener("click", () => {
		removeMyGifos(id);
	});
}

// Remove gifos created by user
function removeMyGifos(gifId) {
	const newGifosArray = arrMyGifos.filter((item) => item !== gifId);
	arrMyGifos = [...newGifosArray];
	localStorage.setItem("MyGifs", JSON.stringify(arrMyGifos));
	displayMisGifosSection();
}

/* ************* DARK MODE ************ */
