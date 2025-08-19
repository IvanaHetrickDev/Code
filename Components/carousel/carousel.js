(() => {
  "use strict";

  /**
   * Carousel class to encapsulate all behavior and state.
   */
  class Carousel {
    constructor(carouselElement) {
      this.carouselElement = carouselElement;
      this.thumbnails = [...carouselElement.querySelectorAll(".cmp-carousel__indicator")];
      this.buttonLeft = carouselElement.querySelector(".cmp-carousel__action--previous");
      this.buttonRight = carouselElement.querySelector(".cmp-carousel__action--next");
      this.scrollContainer = carouselElement.querySelector(".cmp-carousel__indicators");
      console.log("Initializing carousel:", this.carouselElement);

      this.init();
    }

    /**
     * Initialize the carousel by binding events.
     */
    init() {
      this.bindEvents();
       if ('ontouchstart' in window) {
          this.addSwipeEvents();
       }
    }

    /**
     * Bind click events to thumbnails and navigation buttons.
     */
    bindEvents() {
      this.thumbnails.forEach((thumbnail) => {
        // Click activation
        thumbnail.addEventListener("click", () => this.scrollToThumbnail(thumbnail));

        // Keyboard activation
        thumbnail.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            thumbnail.click();
          }
        });
      });

      this.buttonLeft?.addEventListener("click", () => this.handleButtonClick("left"));
      this.buttonRight?.addEventListener("click", () => this.handleButtonClick("right"));
    }

    /**
     * Get the currently active thumbnail element.
     */
    getActiveThumbnail() {
      return this.carouselElement.querySelector(
        ".cmp-carousel__indicator--active[aria-selected='true']"
      );
    }

    /**
     * Smoothly scroll the given target element into view.
     */
    scrollToThumbnail(target) {
      target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }

    /**
     * Scroll the container to the start.
     */
    scrollToStart() {
      this.scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
    }

    /**
     * Scroll the container to the end.
     */
    scrollToEnd() {
      this.scrollContainer.scrollTo({
        left: this.scrollContainer.offsetWidth,
        behavior: "smooth",
      });
    }

    /**
       * Add swipe events for touch devices.
       */
      addSwipeEvents() {
        let touchStartX = 0;

        this.scrollContainer.addEventListener("touchstart", (e) => {
          touchStartX = e.changedTouches[0].screenX;
        });

        this.scrollContainer.addEventListener("touchend", (e) => {
          const touchEndX = e.changedTouches[0].screenX;
          if (touchStartX - touchEndX > 50) {
            // Swiped left
            this.handleButtonClick("right");
          } else if (touchEndX - touchStartX > 50) {
            // Swiped right
            this.handleButtonClick("left");
          }
        });
      }

    /**
     * Handle button clicks for left or right navigation.
     * @param {string} direction - The direction to scroll ("left" or "right").
     */
    handleButtonClick(direction) {
      const activeThumbnail = this.getActiveThumbnail();
      if (!activeThumbnail) return;

      const currentIndex = this.thumbnails.indexOf(activeThumbnail);
      const isAtFirst = activeThumbnail === this.thumbnails[0];
      const isAtLast = activeThumbnail === this.thumbnails[this.thumbnails.length - 1];

      if (direction === "left" && !isAtFirst) {
        // Move to the previous thumbnail
        this.scrollToThumbnail(this.thumbnails[currentIndex - 1]);
      } else if (direction === "right" && !isAtLast) {
        // Move to the next thumbnail
        this.scrollToThumbnail(this.thumbnails[currentIndex + 1]);
      } else if (direction === "left" && isAtFirst) {
        this.scrollToEnd();
      } else if (direction === "right" && isAtLast) {
        this.scrollToStart();
      }
    }
  }

  /**
   * Initialize all carousels on the page.
   */
  document.addEventListener("DOMContentLoaded", () => {
    const carousels = document.querySelectorAll(".carousel");
    carousels.forEach((carouselElement) => new Carousel(carouselElement));
  });
})();
