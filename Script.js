document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // DARK / LIGHT MODE
    // =========================

    const themeToggle = document.getElementById("theme-toggle");

    // Check saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        themeToggle.textContent = "🌙";
    }

    // Toggle theme
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