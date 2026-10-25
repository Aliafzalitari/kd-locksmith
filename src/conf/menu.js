document.addEventListener('DOMContentLoaded', ()=> {
    const hamburger = document.getElementById('hamburger');
    const navLinks= document.querySelector('.nav_links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', ()=> {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Dropdown toggle for submenus
    const dropdowns = document.querySelectorAll(".nav_links .dropdown");
    dropdowns.forEach(dropdown => {
        const toggleLink = dropdown.querySelector("a");

        if(toggleLink) {
            toggleLink.addEventListener("click", function(e) {
                // only work on mobile phones
                if(window.innerWidth <=768) {
                    e.preventDefault();
                    dropdown.classList.toggle("active");
                }
            });

            // Automatically reset mobil menu states if window resized to desktop
            window.addEventListener('resize', () => {
                if(window.innerWidth > 768) {
                    const hamburger = document.getElementById("hamburger");
                    const navLinks = document.querySelector(".nav_links");

                    if(hamburger) hamburger.classList.remove('active');
                    if(navLinks) navLinks.classList.remove('avtive');

                    // remove active from all dropdowns they don't stay stuck open
                    document.querySelectorAll(".nav_links .dropdown").forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                }
            })
        }
    });
});