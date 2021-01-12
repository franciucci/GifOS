/* ********* NAVBAR******** */

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
	if (
		burgerMenu.src === "https://gif-os.netlify.app/assets/mobile/burger.svg"
	) {
		burgerMenu.src =
			"https://gif-os.netlify.app/assets/mobile/button-close.svg";
	} else {
		burgerMenu.src = "https://gif-os.netlify.app/assets/mobile/burger.svg";
	}
}

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
}

// Request to Giphy API to autocomplete search suggestions
async function showSearchSuggestions() {
	cleanSearchSuggestions();
	let inputValue = $searchInput.value;
	const url = `${searchAutocompleteEndpoint}?api_key=${apiKey}&q=${inputValue}&limit=4`;
	await fetch(url)
		.then((response) => response.json())
		.then((result) => {
			let spanArray = [];
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

function searchGifs(search) {
	$searchInput.value = search;
	console.log(search);
}

$searchInput.addEventListener("focus", setActiveSearch);
$searchInput.addEventListener("input", showSearchSuggestions);
$searchInput.addEventListener("focusout", setInactiveSearch);
$closeSearchIcon.addEventListener("click", resetSearch);

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
    <img class="gifCard__gif" src="${json.images.downsized.url}" alt="${json.title}" data-name="${json.title}" data-user="${json.username}">`;
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
	favIcon.addEventListener("click", (e) => {
		addToFavourites(json.images.downsized.url, json.title, json.username);
		changeFavIcon(e, json.images.downsized.url);
	});
}

// Change carousel's buttons styles on hover
function hoverCarouselButton() {
	let buttonPrev = document.getElementById("btnImg-prev");
	let buttonNext = document.getElementById("btnImg-next");
	$prevBtn.addEventListener("mouseover", () => {
		buttonPrev.src = "./assets/mobile/button-left-hover.svg";
	});
	$prevBtn.addEventListener("mouseout", () => {
		buttonPrev.src = "./assets/mobile/button-left.svg";
	});
	$nextBtn.addEventListener("mouseover", () => {
		buttonNext.src = "./assets/mobile/button-right-hover.svg";
	});
	$nextBtn.addEventListener("mouseout", () => {
		buttonNext.src = "./assets/mobile/button-right.svg";
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

	// Check if gif is favourite or not and renders the icons
	const isFav = favArray.some((el) => el.gif === src);
	if (isFav) {
		$maxIcons.innerHTML = `
        <img src="assets/mobile/icon-fav-active.svg" alt="add to favourite" id="maxFav-icon${index}"/>
        <img src="./assets/mobile/icon-download.svg" alt="download gif" id="download-btn${index}"/>
        `;
	} else {
		$maxIcons.innerHTML = `
        <img src="assets/mobile/icon-fav-hover.svg" alt="add to favourite" id="maxFav-icon${index}"/>
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
	let favIcon = document.getElementById(`maxFav-icon${index}`);
	favIcon.addEventListener("click", (e) => {
		addToFavourites(src, title, user);
		changeFavIcon(e, src);
		changeHoverIcon(index, src);
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
	await fetch(url, {
		headers: new Headers({
			Origin: location.origin,
		}),
		mode: "cors",
	})
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
let favArray = [];
function addToFavourites(url, title, user) {
	let favObj = { gif: url, title: title, username: user };
	// Checks if the gif is already in localStorage
	// If it is, it will be removed, otherwise it
	// will be added to localStorage
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
}

// Changes fav icon when clicked
function changeFavIcon(e, url) {
	let tag = e.target;
	const isFav = favArray.some((el) => el.gif === url);
	if (isFav) {
		tag.src = "assets/mobile/icon-fav-active.svg";
	} else {
		tag.src = "assets/mobile/icon-fav-hover.svg";
	}
}

// Changes the fav icon on the hover when clicked on maximized gif
function changeHoverIcon(index, src) {
	let iconTag = document.getElementById(`fav${index}`);
	const isFav = favArray.some((el) => el.gif === src);
	if (isFav) {
		iconTag.src = "assets/mobile/icon-fav-active.svg";
	} else {
		iconTag.src = "assets/mobile/icon-fav-hover.svg";
	}
}
