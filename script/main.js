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

$searchInput.addEventListener("focus", setActiveSearch);
$searchInput.addEventListener("input", showSearchSuggestions);
$searchInput.addEventListener("input", cleanSearchSuggestions);
$searchInput.addEventListener("focusout", setInactiveSearch);

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
    $searchIcon.classList.remove("hidden");
    $closeSearchIcon.classList.add("hidden");
    $searchIconActive.classList.add("hidden");
}

/* Resets list of search suggestions */
function cleanSearchSuggestions() {
    $searchSuggestions.classList.add("hidden");
    $searchSuggestionList.innerHTML = "";
}
//Request to Giphy API to autocomplete search suggestions
async function showSearchSuggestions(e) {
    cleanSearchSuggestions();
    let inputValue = e.target.value;
    const url = `${searchAutocompleteEndpoint}?api_key=${apiKey}&q=${inputValue}&limit=5`;
    await fetch(url)
        .then(response => response.json())
        .then(result => {
            for (let i=0; i < result.data.length; i++) {
                const li = document.createElement("li");
                $searchSuggestionList.appendChild(li);
                li.innerHTML = `<img
                src="assets/mobile/icon-search.svg"
                alt="search icon"
                id="searchList-icon"
                onload="SVGInject(this)"
              /> ${result.data[i].name}`
            }
        })
        .catch(err => console.log(err.message))
        setActiveSearch();
}























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