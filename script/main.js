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
    if (burgerMenu.src === "https://gif-os.netlify.app/assets/mobile/burger.svg") {
        burgerMenu.src = "https://gif-os.netlify.app/assets/mobile/button-close.svg"
    } else {
        burgerMenu.src = "https://gif-os.netlify.app/assets/mobile/burger.svg"
    }
}

/* ********TRENDINGS TAGS********* */

// Request to Giphy API to show trending tags
async function getTrendingTags() {
    const url = `${trendingTagsEndpoint}?api_key=${apiKey}`;
     await fetch(url).then(response => response.json())
        .then(json => {
            const trendingTagsArray = json.data.slice(0, 5);
            const trendingTagsCapitalize = trendingTagsArray.map((word) => {
                return word[0].toUpperCase() + word.substring(1);
            }).join(",")
            const newText = trendingTagsCapitalize.toString().split(",").join(", ");
            $trendingSearchTags.textContent = newText;
        })
        .catch(err => console.log(err));
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
        .then(response => response.json())
        .then(result => {
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
        .catch(err => console.log(err))
    $searchSuggestions.classList.remove("hidden");
    $searchBar.classList.add("searchActive");
}

function searchGifs(search) {
    $searchInput.value = search;
    console.log(search) 
}

$searchInput.addEventListener("focus", setActiveSearch);
$searchInput.addEventListener("input", showSearchSuggestions);
$searchInput.addEventListener("focusout", setInactiveSearch);
$closeSearchIcon.addEventListener("click", resetSearch);

/* ********* TRENDING CAROUSEL HOME *********** */

// Request to Giphy API to show trending gifs
const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=10&rating=pg`;

async function getTrendingGifs() {
    await fetch(url).then(response => response.json())
        .then(results => {      
            for (let i=0; i < results.data.length; i++) {
                showTrendingGifs(results.data[i], i);
            }    
        })
        .catch(err => console.log(err))
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
    gifHover.setAttribute("id", `gifHover${i}`)
    gifHover.innerHTML= `<div class="gifHover__icons">
    <img class="gif-icons" src="assets/mobile/icon-fav-hover.svg" alt="icon fav" id="fav${i}" onclick="addToFavourites('${json.images.downsized.url}', '${json.title}', '${json.username}', 'fav${i}')">
    <img class="gif-icons" src="assets/mobile/icon-download.svg" alt="icon download" onclick="downloadGif('${json.images.original.url}', '${json.title}')">
    <img class="gif-icons" id="max-${i}" src="assets/mobile/icon-max.svg" alt="icon max">
    </div>
    <div class="gifHover__textBox">
    <p class="gifHover__textBox__text">${json.username}</p>
    <p class="gifHover__textBox__text">${json.title}</p>
    </div>`;
    gifCard.appendChild(gifHover);

    // Action buttons and hover
    let maxIcon = document.getElementById(`max-${i}`);
    maxIcon.setAttribute("onclick", `maximizeGif('${json.images.downsized.url}', '${json.username}', '${json.title}')`);
    gifCard.addEventListener("mouseover", () => {
        if (window.innerWidth > 990) {
        let hoverOn = document.getElementById(`gifHover${i}`);
        hoverOn.classList.remove("hidden");
    } else {
        maximizeGif(json.images.downsized.url, json.username, json.title);
    }
    })
    gifCard.addEventListener("mouseout", () => {
        let hoverOut = document.getElementById(`gifHover${i}`);
        hoverOut.classList.add("hidden");
    })

    // Adds a click event on close button to close maximized Gifs 
    $maxGifBtnClose.addEventListener("click", closeMax);

    // Add scroll function to buttons on desktop carousel
    addScrollToCarousel();
    
    let favIcon = document.getElementById(`fav${i}`);
    favIcon.addEventListener("click", changeFavIcon);
}

// Change carousel's buttons styles on hover
function hoverCarouselButton() {
    let buttonPrev = document.getElementById("btnImg-prev");
    let buttonNext = document.getElementById("btnImg-next");
    $prevBtn.addEventListener("mouseover", () => {
        buttonPrev.src = "./assets/mobile/button-left-hover.svg";
    })
    $prevBtn.addEventListener("mouseout", () => {
        buttonPrev.src = "./assets/mobile/button-left.svg";
    })
    $nextBtn.addEventListener("mouseover", () => {
        buttonNext.src = "./assets/mobile/button-right-hover.svg";
    })
    $nextBtn.addEventListener("mouseout", () => {
        buttonNext.src = "./assets/mobile/button-right.svg";
    })
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
function maximizeGif(src, user, title) {
    $maxGifContainer.innerHTML = `
    <img class="maxGif" src="${src}" alt="${title}">
    `;
    $maxGifSection.classList.add("maximized-container");
    $maxGifSection.classList.remove("hidden");
    $maxGifCloseContainer.classList.remove("hidden");
    $maxGifIcons.classList.remove("hidden");
    $maxGifTitle.textContent = title;
    $maxGifUser.textContent = user;
    $maxDownload.setAttribute("onclick", `downloadGif('${src}', '${title}')`);
    $maxFavIcon.addEventListener("click", (e) => {
        addToFavourites(src, title, user);
        changeFavIcon(e);
    });
}

// Close maximized gif
function closeMax() {
    $maxGifSection.classList.remove("maximized-container")
    $maxGifSection.classList.add("hidden");
    $maxGifCloseContainer.classList.add("hidden");
    $maxGifIcons.classList.add("hidden");
}

/* ***** DOWNLOAD FUNCTION ****** */
// Asynchronous function that fetch the gif url and creates a blob to force download
async function downloadGif(url, title) {
    await fetch(url, {
        headers: new Headers({
            'Origin': location.origin
          }),
          mode: 'cors'
    }).then(response => response.blob())
    .then(blob => {
        let blobUrl = URL.createObjectURL(blob);
        forceDownload(blobUrl, title);
    })
    .catch(err => console.log(err));
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
    let favObj = {gif: url, title: title, username: user};
    // Checks if the gif is already in localStorage
    // If it is, it will be removed, otherwise it 
    // will be added to localStorage
    const found = favArray.some(el => el.gif === url);
    if (!found) {
        favArray.push(favObj);
        localStorage.setItem("favourites", JSON.stringify(favArray));
    } else {
        removeFavourite(favObj);
    }
    
}

function removeFavourite(obj) {
    for (let i = 0; favArray.length; i++) {
        if (favArray[i].gif === obj.gif) {
            favArray.splice(i, 1);
            localStorage.setItem("favourites", JSON.stringify(favArray));
        } 
    }
}

function changeFavIcon(e) {
    let tag = e.target;
    let src = tag.getAttribute("src");
    if (src === "assets/mobile/icon-fav-hover.svg") {
        tag.src = "assets/mobile/icon-fav-active.svg";
    } else {
        tag.src = "assets/mobile/icon-fav-hover.svg";
    }
}

