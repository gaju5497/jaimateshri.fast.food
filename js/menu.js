// =============================================
// Jai Mateshri Bhel & Fast Food
// menu.js
// Dynamic Menu System
// =============================================

document.addEventListener("DOMContentLoaded", () => {

    // =============================================
    // GLOBAL VARIABLES
    // =============================================

    let menuData = null;
    let allItems = [];
    let allCategories = [];

    let currentCategory = "all";
    let currentSearch = "";


    // =============================================
    // DOM ELEMENTS
    // =============================================

    const menuContainer =
        document.getElementById("menuContainer");

    const categoryContainer =
        document.getElementById("menuCategories");

    const searchInput =
        document.getElementById("menuSearch");


    // =============================================
    // LOAD MENU JSON
    // =============================================

    async function loadMenu() {

        try {

            const response =
                await fetch("data/menu.json");

            if (!response.ok) {

                throw new Error(
                    `HTTP Error: ${response.status}`
                );

            }

            menuData =
                await response.json();

            allItems =
                menuData.items || [];

            allCategories =
                menuData.categories || [];


            // Render Categories
renderCategories();

// =============================================
// CHECK CATEGORY FROM HOME PAGE URL
// =============================================

const urlParams = new URLSearchParams(window.location.search);

const categoryFromURL =
    urlParams.get("category");

if (categoryFromURL) {

    const categoryExists =
        allCategories.some(
            category =>
                category.id === categoryFromURL
        );

    if (categoryExists) {

        currentCategory =
            categoryFromURL;

        console.log(
            "Category selected from URL:",
            currentCategory
        );

        // Update active category button
        const categoryButtons =
            document.querySelectorAll(
                ".category-filter"
            );

        categoryButtons.forEach(button => {

            button.classList.remove(
                "active"
            );

            if (
                button.dataset.category ===
                currentCategory
            ) {

                button.classList.add(
                    "active"
                );

            }

        });

    }

}


// Render Menu Items
renderMenuItems();


            console.log(
                "Menu loaded successfully:",
                allItems.length,
                "items"
            );

        } catch (error) {

            console.error(
                "Error loading menu:",
                error
            );

            if (menuContainer) {

                menuContainer.innerHTML = `

                    <div class="menu-error">

                        <h3>
                            ⚠️ Unable to load menu
                        </h3>

                        <p>
                            Please try refreshing the page.
                        </p>

                    </div>

                `;

            }

        }

    }


    // =============================================
    // RENDER CATEGORY BUTTONS
    // =============================================

    function renderCategories() {

        if (!categoryContainer) {

            return;

        }


        // Clear existing categories

        categoryContainer.innerHTML = "";


        // All Items Button

        const allButton =
            document.createElement("button");

        allButton.className =
            "category-filter active";

        allButton.dataset.category =
            "all";

        allButton.innerHTML =
            "🍽️ All Items";


        categoryContainer.appendChild(
            allButton
        );


        // Create Category Buttons

        allCategories.forEach(category => {

            const button =
                document.createElement("button");

            button.className =
                "category-filter";

            button.dataset.category =
                category.id;

            button.innerHTML = `

                ${category.icon}

                ${category.name}

            `;


            categoryContainer.appendChild(
                button
            );

        });


        // Category Click Event

        const categoryButtons =
            document.querySelectorAll(
                ".category-filter"
            );


        categoryButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    // Remove active class

                    categoryButtons.forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });


                    // Add active class

                    button.classList.add(
                        "active"
                    );


                    // Set selected category

                    currentCategory =
                        button.dataset.category;


                    // Render filtered items

                    renderMenuItems();

                }
            );

        });

    }


    // =============================================
    // RENDER MENU ITEMS
    // =============================================

    function renderMenuItems() {

        if (!menuContainer) {

            return;

        }


        // Filter Items

        let filteredItems =
            allItems.filter(item => {


                // Category Filter

                const matchesCategory =

                    currentCategory === "all" ||

                    item.category ===
                    currentCategory;


                // Search Filter

                const searchText =
                    currentSearch
                        .toLowerCase()
                        .trim();


                const matchesSearch =

                    item.name
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    item.description
                        .toLowerCase()
                        .includes(searchText);


                return (
                    matchesCategory &&
                    matchesSearch
                );

            });


        // Clear Container

        menuContainer.innerHTML = "";


        // No Results

        if (
            filteredItems.length === 0
        ) {

            menuContainer.innerHTML = `

                <div class="no-results">

                    <div class="no-results-icon">
                        🔍
                    </div>

                    <h3>
                        No food items found
                    </h3>

                    <p>
                        Try searching for something else.
                    </p>

                </div>

            `;

            return;

        }


        // Group Items By Category

        allCategories.forEach(category => {


            const categoryItems =
                filteredItems.filter(item =>

                    item.category ===
                    category.id

                );


            // Skip Empty Category

            if (
                categoryItems.length === 0
            ) {

                return;

            }


            // Create Category Section

            const categorySection =
                document.createElement("section");

            categorySection.className =
                "menu-category-section";


            // Category Heading

            categorySection.innerHTML = `

                <div class="menu-category-heading">

                    <h2>

                        ${category.icon}

                        ${category.name}

                    </h2>

                    <p>
                        ${category.description}
                    </p>

                </div>

            `;


            // Food Grid

            const foodGrid =
                document.createElement("div");

            foodGrid.className =
                "menu-food-grid";


            // Create Food Cards

            categoryItems.forEach(item => {

                const card =
                    createFoodCard(item);

                foodGrid.appendChild(
                    card
                );

            });


            categorySection.appendChild(
                foodGrid
            );


            menuContainer.appendChild(
                categorySection
            );

        });

    }


    // =============================================
    // CREATE FOOD CARD
    // =============================================

    function createFoodCard(item) {

        const card =
            document.createElement("div");

        card.className =
            "menu-food-card";


        // Image

        let imageHTML = "";


        if (item.image) {

            imageHTML = `

                <img

                    src="${item.image}"

                    alt="${item.name}"

                    loading="lazy"

                    onerror="
                        this.onerror=null;
                        this.src='images/menu/food-placeholder.jpg';
                    "

                >

            `;

        } else {

            imageHTML = `

                <div class="food-placeholder">

                    🍽️

                </div>

            `;

        }


        // Bestseller Badge

        let badgeHTML = "";


        if (item.bestseller) {

            badgeHTML = `

                <span class="menu-badge">

                    ⭐ Bestseller

                </span>

            `;

        }


        // Popular Badge

        else if (item.popular) {

            badgeHTML = `

                <span class="menu-badge popular-badge">

                    🔥 Popular

                </span>

            `;

        }


        // Card HTML

        card.innerHTML = `

            <div class="menu-food-image">

                ${imageHTML}

                ${badgeHTML}

            </div>


            <div class="menu-food-content">

                <h3>

                    ${item.name}

                </h3>


                <p class="menu-food-description">

                    ${item.description}

                </p>


                <div class="menu-food-bottom">

                    <span class="menu-food-price">

                        ₹${item.price}

                    </span>


                    <button

                        class="view-details-btn"

                        data-item-id="${item.id}"

                    >

                        View Details

                    </button>

                </div>

            </div>

        `;


        // View Details Button

        const detailsButton =
            card.querySelector(
                ".view-details-btn"
            );


        detailsButton.addEventListener(
            "click",
            () => {

                openFoodModal(item);

            }
        );


        return card;

    }


    // =============================================
    // OPEN FOOD MODAL
    // =============================================

    function openFoodModal(item) {

        const modal =
            document.getElementById(
                "foodModal"
            );

        const modalImage =
            document.getElementById(
                "modalImage"
            );

        const modalTitle =
            document.getElementById(
                "modalTitle"
            );

        const modalPrice =
            document.getElementById(
                "modalPrice"
            );

        const modalDescription =
            document.getElementById(
                "modalDescription"
            );


        if (!modal) {

            return;

        }


        // Set Image

        if (
            item.image &&
            modalImage
        ) {

            modalImage.src =
                item.image;

            modalImage.alt =
                item.name;

            modalImage.style.display =
                "block";

        }

        else if (modalImage) {

            modalImage.src =
                "images/menu/food-placeholder.jpg";

            modalImage.alt =
                "Food Image";

            modalImage.style.display =
                "block";

        }


        // Set Details

        if (modalTitle) {

            modalTitle.innerText =
                item.name;

        }


        if (modalPrice) {

            modalPrice.innerText =
                `₹${item.price}`;

        }


        if (modalDescription) {

            modalDescription.innerText =
                item.description;

        }


        // WhatsApp Button

        const whatsappButton =
            modal.querySelector(
                ".whatsapp-btn"
            );


        if (whatsappButton) {

            const message =

                `Hello Jai Mateshri Bhel & Fast Food,%0A%0A` +

                `I would like to order:%0A` +

                `${item.name}%0A` +

                `Price: ₹${item.price}`;


            whatsappButton.href =

                `https://wa.me/${menuData.restaurant.whatsapp}?text=${message}`;

        }


        // Show Modal

        modal.style.display =
            "flex";


        // Prevent Background Scroll

        document.body.style.overflow =
            "hidden";

    }


    // =============================================
    // CLOSE FOOD MODAL
    // =============================================

    function closeFoodModal() {

        const modal =
            document.getElementById(
                "foodModal"
            );


        if (modal) {

            modal.style.display =
                "none";

        }


        // Restore Scroll

        document.body.style.overflow =
            "";

    }


    // =============================================
    // CLOSE MODAL BUTTON
    // =============================================

    const closeButton =
        document.querySelector(
            ".close"
        );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeFoodModal
        );

    }


    // =============================================
    // CLOSE MODAL WHEN CLICKING OUTSIDE
    // =============================================

    const modal =
        document.getElementById(
            "foodModal"
        );


    if (modal) {

        modal.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === modal
                ) {

                    closeFoodModal();

                }

            }
        );

    }


    // =============================================
    // CLOSE MODAL WITH ESCAPE KEY
    // =============================================

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                closeFoodModal();

            }

        }
    );


    // =============================================
    // SEARCH FUNCTION
    // =============================================

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            (event) => {

                currentSearch =
                    event.target.value;

                renderMenuItems();

            }
        );

    }


    // =============================================
    // START APPLICATION
    // =============================================

    loadMenu();

});