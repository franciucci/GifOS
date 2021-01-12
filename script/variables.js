/* ********* API ********** */

const apiKey = "nENWhpLbxMys5qAUYSJiwgsHsdfA0cL4";

// Endpoint for trendings
const trendingEndpoint = "https://api.giphy.com/v1/gifs/trending";

// Endpoint for searchs
const searchEndpoint = "https://api.giphy.com/v1/gifs/search";

// Endpoint to autocomplete searchs
const searchAutocompleteEndpoint = "https://api.giphy.com/v1/gifs/search/tags";

// Endpoint for trending tags
const trendingTagsEndpoint = "https://api.giphy.com/v1/trending/searches";

/* ******** DOM ITEMS ********* */
const $mainPage = document.querySelector(".main");

const $heroSection = document.querySelector(".hero");

const $trendingTagsSection = document.querySelector(".trending-searchs");
const $trendingSearchTags = document.getElementById("trending-searchs__text");

const $searchBarSection = document.querySelector(".searchBar");
const $searchBar = document.getElementById("search-bar");
const $searchInput = document.getElementById("search-input");
const $searchSuggestions = document.getElementById("suggestion");
const $searchSuggestionList = document.getElementById("suggestion-list");
const $searchIconActive = document.getElementById("search-icon-active");
const $searchListIcon = document.getElementById("searchList-icon");
const $searchIcon = document.getElementById("search-icon");
const $closeSearchIcon = document.getElementById("close-search-icon");

// Trend carousel
const $trendingCarousel = document.getElementById("trending-carousel");
const $trendingTrack = document.getElementById("track");
const $nextBtn = document.getElementById("btn-next");
const $prevBtn = document.getElementById("btn-prev");

// Maximized gif
const $maxGifSection = document.getElementById("maximized-container");
const $maxGifContainer = document.getElementById("maximizedGifs__gif");
const $maxGifCloseContainer = document.getElementById("maximizedGifs__close");
const $maxGifIcons = document.getElementById("maximizedGifs__icons");
const $maxIcons = document.querySelector(".maxGif-icons");
const $maxGifTitle = document.getElementById("maxGif-title");
const $maxGifUser = document.getElementById("maxGif-user");

const $maxGifBtnClose = document.querySelector(".maxGif-btnClose");

// Navbar
const $brgMenu = document.querySelector(".navlinks");
const $desktopLinks = document.querySelector(".navbar-desktop");
const $navbarSearch = document.querySelector(".navbarSearch-bar__input");
const $stickySearch = document.querySelector(".navbarSearch-bar");
const $navSearchActive = document.getElementById("navbarSearch-icon-active");
const $closeNavSearch = document.getElementById("close-navbarSearch-icon");
const $navSearchIcon = document.getElementById("navbarSearch-icon");
const $navbarSearchInput = document.getElementById("navbarSearch-input");

/* ***** SEARCH GALLERY ****** */
const $searchSection = document.querySelector(".searchs");
const $searchTitle = document.querySelector(".searchs__title");
const $searchGallery = document.querySelector(".searchs__gallery");
const $searchViewMore = document.querySelector(".searchs__btn");
const $errorSearch = document.querySelector(".searchs__error");

/*  ***** FAVOURITES **** */
const $favouriteSection = document.querySelector(".favourites");
const $favGifs = document.querySelector(".favourites__gifs");
const $favMenuBtn = document.getElementById("fav-link");
const $brgFavBtn = document.getElementById("fav-link-brg");
const $favViewMore = document.querySelector(".favourites__btn");
const $favEmpty = document.querySelector(".favourites__empty");

/* ***** MI GIFOS ******* */
const $myGifos = document.querySelector(".miGifos");
