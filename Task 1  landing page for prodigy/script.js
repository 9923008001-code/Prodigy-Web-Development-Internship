const navbar = document.getElementById("navbar");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

// Scroll Navbar effect
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Hamburger Menu toggle
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Fade-in sections on scroll
const sections = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add("visible");
            }
        });
    }, 
    { threshold: 0.1 }
);

sections.forEach(section => {
    observer.observe(section);
});
