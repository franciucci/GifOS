/* Burger menu */
const burgerMenu = document.getElementById("burger");
const menuLinks = document.getElementById("navlinks");
const borderLinks = document.getElementsByClassName("links-border");
burgerMenu.addEventListener("click", showMenu);

// Function that shows the menu on mobile version
function showMenu() {
    menuLinks.classList.toggle("menu-hide");
    for (i = 0; i < borderLinks.length; i++) {
        borderLinks[i].classList.toggle("borders-actives");
    }
    changeBurgerMenu(); 
}
// This function switches between the burger menu icon and the button close icon
function changeBurgerMenu() {
    if (burgerMenu.src === "http://127.0.0.1:5500/assets/mobile/burger.svg") {
        burgerMenu.src = "http://127.0.0.1:5500/assets/mobile/button-close.svg"
    } else {
        burgerMenu.src = "http://127.0.0.1:5500/assets/mobile/burger.svg"
    }
}



