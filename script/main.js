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
    <img class="gifCard__gif" src="${json.images.fixed_height.url}" alt="${json.title}" data-name="${json.title}" data-user="${json.username}">`;
    $trendingTrack.appendChild(gifCard);

    const gifHover = document.createElement("div");
    gifHover.setAttribute("class", "gifHover hidden");
    gifHover.setAttribute("id", `gifHover${i}`)
    gifHover.innerHTML= `<div class="gifHover__icons"><img class="gif-icons" src="assets/mobile/icon-fav-hover.svg" alt="icon fav"><img class="gif-icons" src="assets/mobile/icon-download.svg" alt="icon download"><img class="gif-icons" src="assets/mobile/icon-max.svg" alt="icon max"></div><div class="gifHover__textBox"><p class="gifHover__textBox__text">${json.username}</p>
    <p class="gifHover__textBox__text">${json.title}</p></div>`;
    gifCard.appendChild(gifHover);
    gifCard.addEventListener("mouseover", () => {
        let hoverOn = document.getElementById(`gifHover${i}`);
        hoverOn.classList.remove("hidden");
    })
    gifCard.addEventListener("mouseout", () => {
        let hoverOut = document.getElementById(`gifHover${i}`);
        hoverOut.classList.add("hidden");
    })
    
}
getTrendingGifs();
addScrollToCarousel();

// Add scroll behaviour to carousel buttons for desktop resolutions
function addScrollToCarousel() {
    $prevBtn.addEventListener("click", scrollToPrevItem);
    $nextBtn.addEventListener("click", scrollToNextItem)
}

function scrollToNextItem() {
    $trendingTrack.scrollLeft += 300;
}
function scrollToPrevItem() {
    $trendingTrack.scrollLeft -= 300;
}
