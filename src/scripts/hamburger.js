const hamburger = document.querySelector('.hamburger');
const hamCloseBtn = document.querySelector('.ham-close-btn');
const menuHamburger  = document.querySelector('.menu-hamburger');
const menuListHam  = document.querySelector('.menu__list--ham');

hamburger.addEventListener('click', function() {
    menuHamburger.style.display = 'block';
});

hamCloseBtn.addEventListener('click', function() {
    menuHamburger.style.display = 'none';
});

menuListHam.addEventListener('click', function(e) {
    if(e.target.classList.contains('menu__link--ham')) {
        menuHamburger.style.display = 'none'; 
    }
});

// плавная прокрутка
const anchors = document.querySelectorAll('a[href^="#"]');

for(let anchor of anchors) {
    anchor.addEventListener("click", function(e) {
        e.preventDefault()
        const goto = anchor.hasAttribute('href') ? anchor.getAttribute('href') : 'body';
        document.querySelector(goto).scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}