
document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("searchInput");
    const resourceCards = document.querySelectorAll(".resource-card");

    const categoryButtons = document.querySelectorAll(".category-card");
    const filterButtons = document.querySelectorAll(".filter-btn");

    const noResults = document.getElementById("noResults");

    const modal = document.getElementById("resourceModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalContent = document.getElementById("modalContent");

    const closeModal = document.getElementById("closeModal");
    const modalCloseBtn = document.getElementById("modalCloseBtn");

    let selectedCategory = "all";

    // FILTER AND SEARCH

    function filterResources() {

        const searchTerm = searchInput.value.toLowerCase().trim();

        let visibleCount = 0;

        resourceCards.forEach(card => {

            const category = card.dataset.category;
            const text = card.textContent.toLowerCase();

            const matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory;

            const matchesSearch = text.includes(searchTerm);

            if (matchesCategory && matchesSearch) {

                card.style.display = "";
                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });

        noResults.hidden = visibleCount !== 0;
    }

    // UPDATE ACTIVE CATEGORY

    function updateActiveCategory(category) {

        selectedCategory = category;

        filterButtons.forEach(button => {

            button.classList.toggle(
                "selected",
                button.dataset.filter === category
            );

        });

        categoryButtons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.category === category
            );

        });

        filterResources();
    }

    // CATEGORY BUTTONS

    categoryButtons.forEach(button => {

        button.addEventListener("click", function () {

            updateActiveCategory(this.dataset.category);

            document.getElementById("resources").scrollIntoView({
                behavior: "smooth"
            });

        });

    });

    // FILTER BUTTONS

    filterButtons.forEach(button => {

        button.addEventListener("click", function () {

            updateActiveCategory(this.dataset.filter);

        });

    });

    // SEARCH

    searchInput.addEventListener("input", filterResources);

    // OPEN MODAL

    document.querySelectorAll(".read-btn").forEach(button => {

        button.addEventListener("click", function () {

            modalTitle.textContent = this.dataset.title;
            modalDescription.textContent = this.dataset.description;
            modalContent.textContent = this.dataset.content;

            modal.classList.add("show");

        });

    });

    // CLOSE MODAL

    function hideModal() {
        modal.classList.remove("show");
    }

    closeModal.addEventListener("click", hideModal);

    modalCloseBtn.addEventListener("click", hideModal);

    modal.addEventListener("click", function (event) {

        if (event.target === modal) {
            hideModal();
        }

    });

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            hideModal();
        }

    });

});
