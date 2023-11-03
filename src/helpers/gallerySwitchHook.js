export class GallerySwitchHook {
  constructor({
    containerSelector = ".auto_park_wrapper",
    prevSelector = ".prev_button",
    nextSelector = ".next_button",
  }) {
    this.galleryItemsAmount = 4;
    this.currentIndex = 0;
    this.container = document.querySelector(containerSelector);
    this.prevButton = this.container.querySelector(prevSelector);
    this.nextButton = this.container.querySelector(nextSelector);

    if (!this.prevButton || !this.nextButton || !this.container) {
      throw new Error("Элементы галереи не найдены");
    }

    this.slider = this.container.querySelector(".auto_park_slider");
    this.sliderWrapper = this.container.querySelector(
      ".auto_park_slider-wrapper"
    );
    this.slides = this.sliderWrapper.querySelectorAll(".gallery_item");

    window.addEventListener("load", (e) => {
      // Здесь можно добавить проверку, в каком мы сейчас разрешении, и в соответствии с этим менять this.galleryItemsAmount
      const widthPerSlide = this.wrapperWidth() / this.galleryItemsAmount;
      this.slides.forEach((slide) => {
        slide.style.width = `${widthPerSlide - parseInt(getComputedStyle(slide).marginLeft) - parseInt(getComputedStyle(slide).marginRight)}px`;
      })
      this.checkPrevButton();
      this.checkNextButton();
    });

    this.prevButton.addEventListener("click", () => this.slideToPrev());
    this.nextButton.addEventListener("click", () => this.slideToNext());

    // Добавляем обработчики touch events на элемент слайдера
    this.startPosX = 0;
    this.currentPosX = 0;

    this.slider.addEventListener("touchstart", (e) => this.handleTouchStart(e));
    this.slider.addEventListener("touchmove", (e) => this.handleTouchMove(e));
    this.slider.addEventListener("touchend", (e) => this.handleTouchEnd(e));
  }

  handleTouchStart(e) {
    this.startPosX = e.touches[0].clientX;
  }
  handleTouchMove(e) {
    e.preventDefault();
    this.currentPosX = e.touches[0].clientX;
    const diff = this.startPosX - this.currentPosX;
    const slideWidth =
      this.slides[0].offsetWidth +
      parseInt(getComputedStyle(this.slides[0]).marginLeft) +
      parseInt(getComputedStyle(this.slides[0]).marginRight);
    const translateAmount = -slideWidth * this.currentIndex - diff;

    // если свайпаем левее самого левого слайда:
    if (translateAmount > 0) {
      return;
    }

    // если свайпаем правее самого правого слайда:
    if (this.isItemsOver()) {
      return;
    }

    this.sliderWrapper.style.transform = `translate3d(${translateAmount}px, 0, 0)`;
  }
  handleTouchEnd() {
    const diff = this.startPosX - this.currentPosX;
    if (diff > 0 && !this.isItemsOver()) {
      this.slideToNext();
    } else if (diff < 0) {
      this.slideToPrev();
    }
  }

  wrapperWidth() {
    return this.sliderWrapper.getBoundingClientRect().width;
  }
  innerWidth() {
    return this.sliderWrapper.scrollWidth;
  }
  pixelsPerItem() {
    return this.innerWidth() / this.slides.length;
  }
  isItemsOver() {
    return (
      this.pixelsPerItem() * (this.slides.length - this.currentIndex) <=
      this.wrapperWidth()
    );
  }

  checkPrevButton() {
    if (this.currentIndex === 0) {
      this.prevButton.style.visibility = "hidden";
    } else {
      this.prevButton.style.visibility = "visible";
    }
  }

  checkNextButton() {
    if (this.isItemsOver() || this.innerWidth() <= this.wrapperWidth()) {
      this.nextButton.style.visibility = "hidden";
    } else {
      this.nextButton.style.visibility = "visible";
    }
  }

  slideToPrev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      const slide = this.slides[this.currentIndex];
      const slideWidth =
        slide.offsetWidth +
        parseInt(getComputedStyle(slide).marginLeft) +
        parseInt(getComputedStyle(slide).marginRight);
      const translateAmount = -slideWidth * this.currentIndex;
      this.sliderWrapper.style.transform = `translate3d(${translateAmount}px, 0, 0)`;
    }
    this.checkPrevButton();
    this.checkNextButton();
  }

  slideToNext() {
    if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex++;
      const slide = this.slides[this.currentIndex];
      const slideWidth =
        slide.offsetWidth +
        parseInt(getComputedStyle(slide).marginLeft) +
        parseInt(getComputedStyle(slide).marginRight);
      const translateAmount = -slideWidth * this.currentIndex;
      this.sliderWrapper.style.transform = `translate3d(${translateAmount}px, 0, 0)`;
    }
    this.checkPrevButton();
    this.checkNextButton();
  }
}
