export class Component {
    constructor(element) {
        this.element = element;

        this.slides = this.element.querySelectorAll(".c-slideshow__slide");
        this.previous = this.element.querySelector(".c-slideshow__prev");
        this.next = this.element.querySelector(".c-slideshow__next");

        let shift = (nextOrPrev) => {
            let slideLength = this.slides.length - 1;
            if (nextOrPrev) {
                if (this.index === slideLength) {
                    this.index = 0;
                } else {
                    this.index++;
                }
            } else {
                if (this.index === 0) {
                    this.index = slideLength;
                } else {
                    this.index--;
                }
            }
            this._slideTo(this.index);
        }
        this.next.addEventListener("click", function() {
            shift(true);
        });
        this.previous.addEventListener("click", function() {
            shift(false);
        });

        this.index = 0;
        this.total = this.slides.length;
        this.timer = null;
        this.delay = this.element.dataset.delay || 1000;
    }

    _slideTo(slideIndex) {
        let currentSlide = this.slides[slideIndex];
        currentSlide.style.opacity = 1;
        for (var i = 0; i < this.slides.length; i++) {
            let _slide = this.slides[i];
            if (_slide !== currentSlide) {
                _slide.style.opacity = 0;
            }
        }
    }
    action() {
        let self = this;
        self.timer = setInterval(() => {
            self.index++;
            if (self.index >= self.slides.length) {
                self.index = 0;
            }
            self._slideTo(self.index);
        }, self.delay);
    }

    stopStart() {
        let self = this;
        self.element.addEventListener("mouseover", () => {
            clearInterval(self.timer);
            self.timer = null;
        }, false);
        self.element.addEventListener("mouseout", () => {
            self.action();
        }, false);
    }
}

export const Slideshow = (() => {

    const COMPONENT_NAME = 'slideshow'
    const VERSION = '0.0.1'

    const defaults = {
        delay: 5000
    }

    class Slideshow {
        constructor(element, iife = true) {
            this.instances = []
            if (iife) {
                this.elements = document.querySelectorAll("[data-vx='slide']");
            } else {
                this.elements = element;
            }
            this.init();
        }

        init() {
            if (this.elements) {
                for (let i = 0; i < this.elements.length; i++) {
                    this.instances.push(new Component(this.elements[i]));
                }
            } else {
                this.instances = [new Component(this.elements)];
            }
            this.start();
        }

        start() {
            for (let i = 0; i < this.instances.length; i++) {
                this.instances[i].action();
            }
        }

    }

    return Slideshow;
})();