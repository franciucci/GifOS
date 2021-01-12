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

const $trendingSearchTags = document.getElementById("trending-searchs__text");

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
