
document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // EXISTING ELEMENTS
    // ==============================

    const searchInput = document.getElementById("searchInput");
    const resourceCards = document.querySelectorAll(".resource-card");

    const categoryButtons = document.querySelectorAll(".category-card");
    const filterButtons = document.querySelectorAll(".filter-btn");

    const noResults = document.getElementById("noResults");

    // Resource modal
    const modal = document.getElementById("resourceModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalContent = document.getElementById("modalContent");

    const closeModal = document.getElementById("closeModal");
    const modalCloseBtn = document.getElementById("modalCloseBtn");


    // ==============================
    // PRESENTATION MODAL ELEMENTS
    // ==============================

    const presentationModal = document.getElementById("presentationModal");

    const presentationModalTitle =
        document.getElementById("presentationModalTitle");

    const presentationModalImage =
        document.getElementById("presentationModalImage");

    const closePresentationModal =
        document.getElementById("closePresentationModal");

    const prevSlide = document.getElementById("prevSlide");
    const nextSlide = document.getElementById("nextSlide");
    const slideCounter = document.getElementById("slideCounter");

    const presentationImages =
        document.querySelectorAll(".presentation-image");


    // ==============================
    // VARIABLES
    // ==============================

    let selectedCategory = "all";

    let currentSlides = [];
    let currentSlideIndex = 0;


    // ==============================
    // FILTER AND SEARCH
    // ==============================

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


    // ==============================
    // UPDATE ACTIVE CATEGORY
    // ==============================

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


    // ==============================
    // CATEGORY BUTTONS
    // ==============================

    categoryButtons.forEach(button => {

        button.addEventListener("click", function () {

            updateActiveCategory(this.dataset.category);

            document.getElementById("resources").scrollIntoView({
                behavior: "smooth"
            });

        });

    });


    // ==============================
    // FILTER BUTTONS
    // ==============================

    filterButtons.forEach(button => {

        button.addEventListener("click", function () {

            updateActiveCategory(this.dataset.filter);

        });

    });


    // ==============================
    // SEARCH
    // ==============================

    searchInput.addEventListener("input", filterResources);


    // ==============================
    // OPEN RESOURCE MODAL
    // ==============================

    document.querySelectorAll(".read-btn").forEach(button => {

        button.addEventListener("click", function () {

            modalTitle.textContent = this.dataset.title;
            modalDescription.textContent = this.dataset.description;
            modalContent.textContent = this.dataset.content;

            modal.classList.add("show");

        });

    });


    // ==============================
    // CLOSE RESOURCE MODAL
    // ==============================

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


    // ==============================
    // PRESENTATION SLIDE VIEWER
    // ==============================

    // Open presentation when Slide 1 is clicked

    presentationImages.forEach(image => {

        image.addEventListener("click", function () {

            // Get all slides from data-slides
            currentSlides = this.dataset.slides
                .split(",")
                .map(slide => slide.trim());

            // Always start at Slide 1
            currentSlideIndex = 0;

            // Set squad title
            presentationModalTitle.textContent = this.dataset.title;

            // Display first slide
            showSlide();

            // Show modal
            presentationModal.classList.add("show");

            document.body.classList.add("modal-open");

        });

    });


    // ==============================
    // DISPLAY CURRENT SLIDE
    // ==============================

    function showSlide() {

        if (!currentSlides.length) return;

        presentationModalImage.src = currentSlides[currentSlideIndex];

        presentationModalImage.alt =
            `${presentationModalTitle.textContent} - Slide ${currentSlideIndex + 1}`;

        // Update slide counter
        slideCounter.textContent =
            `Slide ${currentSlideIndex + 1} of ${currentSlides.length}`;

        // Show navigation only if there are multiple slides
        prevSlide.style.display =
            currentSlides.length > 1 ? "flex" : "none";

        nextSlide.style.display =
            currentSlides.length > 1 ? "flex" : "none";

    }


    // ==============================
    // NEXT SLIDE
    // ==============================

    nextSlide.addEventListener("click", function () {

        if (!currentSlides.length) return;

        if (currentSlideIndex < currentSlides.length - 1) {

            currentSlideIndex++;

        } else {

            // Return to first slide after last slide
            currentSlideIndex = 0;

        }

        showSlide();

    });


    // ==============================
    // PREVIOUS SLIDE
    // ==============================

    prevSlide.addEventListener("click", function () {

        if (!currentSlides.length) return;

        if (currentSlideIndex > 0) {

            currentSlideIndex--;

        } else {

            // Return to last slide when going backward from Slide 1
            currentSlideIndex = currentSlides.length - 1;

        }

        showSlide();

    });


    // ==============================
    // CLOSE PRESENTATION MODAL
    // ==============================

    function hidePresentationModal() {

        presentationModal.classList.remove("show");

        document.body.classList.remove("modal-open");

        presentationModalImage.src = "";

        currentSlides = [];
        currentSlideIndex = 0;

    }

    closePresentationModal.addEventListener(
        "click",
        hidePresentationModal
    );

    presentationModal.addEventListener("click", function (event) {

        if (event.target === presentationModal) {
            hidePresentationModal();
        }

    });


    // ==============================
    // KEYBOARD NAVIGATION
    // ==============================

    document.addEventListener("keydown", function (event) {

        // Close modals with Escape
        if (event.key === "Escape") {

            hideModal();
            hidePresentationModal();

        }

        // Navigate presentation slides
        if (presentationModal.classList.contains("show")) {

            if (event.key === "ArrowRight") {
                nextSlide.click();
            }

            if (event.key === "ArrowLeft") {
                prevSlide.click();
            }

        }

    });

});
