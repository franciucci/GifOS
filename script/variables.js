/* ********* API ********** */

const apiKey = "6NaCjN010QPDTAvzFakCdJqraaRvPZsB";

// Endpoint for trendings
const trendingEndpoint = "https://api.giphy.com/v1/gifs/trending";

// Endpoint for searchs
const searchEndpoint = "https://api.giphy.com/v1/gifs/search";

// Endpoint to autocomplete searchs
const searchAutocompleteEndpoint = "https://api.giphy.com/v1/gifs/search/tags";

// Endpoint for trending tags
const trendingTagsEndpoint = "https://api.giphy.com/v1/trending/searches";

// Upload Endpoint
const uploadGifEndpoint = "https://upload.giphy.com/v1/gifs";

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

const $darkModeToggle = document.getElementById("night-mode");
const $mobileDarkModeToggle = document.getElementById("night-mode-brg");

// Trend carousel
const $carouselSection = document.querySelector(".trending-gifs");
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
const $myGifosMenu = document.querySelector("#my-gifos-link");
const $brgMyGifosMenu = document.getElementById("my-gifos-link-brg");
const $myGifosSection = document.querySelector(".miGifos");
const $myGifosEmpty = document.getElementById("miGifos__empty");
const $myGifosGallery = document.getElementById("miGifos__gifs__gallery");

/* ***** CREATE GIFOS ****** */

const $createGifBtn = document.getElementById("createGif-btn");
const $createGifSection = document.querySelector("#createGifSection");
const $crearGifTitle = document.querySelector("#crearGif_title");
const $crearGifText = document.querySelector("#crearGif_text");
const $step1 = document.querySelector("#step-1");
const $step2 = document.querySelector("#step-2");
const $step3 = document.querySelector("#step-3");
const $buttonComenzar = document.querySelector("#button--comenzar");
const $buttonGrabar = document.querySelector("#button--grabar");
const $buttonFinalizar = document.querySelector("#button--finalizar");
const $buttonSubirGif = document.querySelector("#button--subirGif");
const $timer = document.querySelector("#timer-recording");
const $repeatBtn = document.querySelector("#repeatShot");
const $overlay = document.querySelector("#overlay");
const $overlayStatusIcon = document.querySelector("#overlay_status-icon");
const $overlayStatusText = document.querySelector("#overlay_status-text");
const $video = document.querySelector("#recording_video");
const $recordedGifo = document.querySelector("#recorded_gifo");

const $camera = document.querySelector("#camera");
const $celuloide = document.querySelector("#celuloide");
