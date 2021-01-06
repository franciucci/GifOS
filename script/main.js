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
        .catch(err => console.log(err.message));
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
            displaySuggestionList(result);
        })
        .catch(err => console.log(err))
    $searchSuggestions.classList.remove("hidden");
    $searchBar.classList.add("searchActive");
}

function displaySuggestionList(suggestions) {
    for (let i = 0; i < suggestions.data.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = `
        <img class="searchList-icon" src="assets/mobile/icon-search-grey.svg" alt="search icon">
        <span class="suggestion" onclick="searchGifs('${suggestions.data[i].name}')">${suggestions.data[i].name}</span>`;
        $searchSuggestionList.appendChild(li);
    }
}

function searchGifs(result) {
    $searchInput.value = (result);
    console.log(result);
}

$searchInput.addEventListener("focus", setActiveSearch);
$searchInput.addEventListener("input", showSearchSuggestions);
$searchInput.addEventListener("input", cleanSearchSuggestions);
$searchInput.addEventListener("focusout", setInactiveSearch);
$closeSearchIcon.addEventListener("click", resetSearch);






















// Request to Giphy API to show trending gifs
/* const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=20&rating=pg`;

fetch(url).then(response => response.json())
    .then(json => {
        let carousel = document.getElementById("track");
        for (let i=0; i < json.data.length; i++) {
            let slick = document.createElement("div");
            slick.setAttribute("class", "slick");
            carousel.appendChild(slick);
            let slickGif = document.createElement("img");
            slickGif.setAttribute("src", json.data[i].images.fixed_height.url);
            slickGif.setAttribute("alt", json.data[i].title);
            slick.appendChild(slickGif);
        }    
    })
    .catch(err => console.log(err.message)) */