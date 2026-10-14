document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // DARK / LIGHT MODE
    // =========================

    const themeToggle = document.getElementById("theme-toggle");

    if (themeToggle) {

        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "light") {
            document.body.classList.add("light-mode");
            themeToggle.textContent = "🌙";
        } else {
            themeToggle.textContent = "☀️";
        }

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("light-mode");

            if (document.body.classList.contains("light-mode")) {
                themeToggle.textContent = "🌙";
                localStorage.setItem("theme", "light");
            } else {
                themeToggle.textContent = "☀️";
                localStorage.setItem("theme", "dark");
            }

        });
    }


    // =========================
    // NAVIGATION
    // =========================

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar nav a");

    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }

        });

    });

});

/* Scroll progress and back-to-top */
const progress = document.getElementById("scroll-progress");
const topButton = document.getElementById("back-to-top");

function updateScroll() {
    const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

    const percent = maxScroll > 0
        ? (window.scrollY / maxScroll) * 100
        : 0;

    if (progress) progress.style.width = percent + "%";
    if (topButton) {
        topButton.classList.toggle("show", window.scrollY > 300);
    }
}

window.addEventListener("scroll", updateScroll, { passive: true });
updateScroll();

topButton?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* Typing animation */
const typing = document.getElementById("typing-text");

if (typing) {
    const words = ["Aspiring Data Analyst", "BCA Student"];
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
        const word = words[wordIndex];

        typing.textContent = word.substring(0, charIndex);

        if (!deleting && charIndex < word.length) {
            charIndex++;
        } else if (deleting && charIndex > 0) {
            charIndex--;
        } else if (!deleting) {
            deleting = true;
            setTimeout(typeEffect, 1200);
            return;
        } else {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(typeEffect, deleting ? 45 : 85);
    }

    typeEffect();
}

/* Reveal sections and cards while scrolling */
const revealItems = document.querySelectorAll(
    "main section, .project-card, .skill-card, .certificate-card"
);

revealItems.forEach(item => item.classList.add("reveal"));

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach(item => observer.observe(item));
} else {
    revealItems.forEach(item => item.classList.add("visible"));
}
