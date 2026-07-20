// =====================================
// Jai Mateshri Bhel & Fast Food
// script.js
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Website Loaded Successfully!");

    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {

            const href = this.getAttribute("href");

            // Allow normal page navigation
            if (
                href.endsWith(".html") ||
                href.startsWith("http") ||
                href.startsWith("tel:") ||
                href.startsWith("https://")
            ) {
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });
            }

        });
    });

    // Highlight Current Page in Navbar
    const currentPage = window.location.pathname.split("/").pop();

    navLinks.forEach(link => {

        const page = link.getAttribute("href");

        if (page === currentPage) {

            link.style.color = "#ff9800";
            link.style.fontWeight = "700";

        }

    });

});

// =============================
// WhatsApp Button Function
// =============================

function orderOnWhatsApp() {

    const message =
        "Hello Jai Mateshri Bhel & Fast Food,%0A%0AI would like to place an order.";

    window.open(
        "https://wa.me/919765310500?text=" + message,
        "_blank"
    );

}

// =============================
// Call Function
// =============================

function callRestaurant() {

    window.location.href = "tel:+919765310500";

}

// =============================
// Search (Placeholder)
// =============================

const searchBox = document.querySelector("input[type='text']");

if (searchBox) {

    searchBox.addEventListener("keyup", function () {

        console.log("Searching for:", this.value);

        // Search functionality will be added later

    });

}

// ===============================
// FOOD DETAILS MODAL
// ===============================

function openModal(name, description, price, image) {

    document.getElementById("modalTitle").innerText = name;

    document.getElementById("modalDescription").innerText = description;

    document.getElementById("modalPrice").innerText = price;

    document.getElementById("modalImage").src = image;

    document.getElementById("foodModal").style.display = "flex";

}

function closeModal() {

    document.getElementById("foodModal").style.display = "none";

}

// Close popup when clicking outside

window.onclick = function(event) {

    const modal = document.getElementById("foodModal");

    if (event.target == modal) {

        modal.style.display = "none";

    }

}