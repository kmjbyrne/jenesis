import { UiParentComponent } from "../base/parent.component";
import { DomHelper } from "../utils/dom-helper";
import { UiParentControl } from "../base/control.component";

export class SlideshowComponent extends UiParentComponent {
    name = 'slideshow';
    element: any;
    slides: any;
    previous: any;
    next: any;
    index: number;
    total: any;
    timer: any;
    delay: any;
    previousSlide: any;

    constructor() {
        super();
    }

    setup() {
        this.slides = DomHelper.select(this.defineBlock('slide'), this.element);
        this.previous = DomHelper.select(this.defineBlock('prev'), this.element)[0];
        this.next = DomHelper.select(this.defineBlock('next'), this.element)[0];

        let shift = (nextOrPrev: boolean) => {
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
        this.next.addEventListener("click", () => {
            clearInterval(this.timer);
            shift(true);
            this.action();
        });
        this.previous.addEventListener("click", () => {
            clearInterval(this.timer);
            shift(false);
            this.action();
        });

        this.index = 0;
        this.total = this.slides.length;
        this.timer = null;
        this.delay = this.element.dataset.delay || 5000;

        this.action();
    }

    init(element: any) {
        this.element = element;
        this.setup();
    }

    getPreviousIndex(index: number) {
        if ((index - 1) < 0) {
            return this.slides.length - 1;
        }
        else {
            return index - 1;
        }
    }

    _slideTo(slideIndex: number) {
        let currentSlide = this.slides[slideIndex];

        currentSlide.classList.toggle(this.getModifierKeyName('active'));
        currentSlide.classList.remove(this.getModifierKeyName('fading'));

        for (var i = 0; i < this.slides.length; i++) {
            let _slide = this.slides[i];
            if (_slide !== currentSlide) {
                _slide.classList.remove(this.getModifierKeyName('active'));
                _slide.classList.remove(this.getModifierKeyName('fading'));
            }
        }
        this.slides[this.getPreviousIndex(slideIndex)].classList.add(this.getModifierKeyName('fading'));
    }
    action() {
        this.timer = setInterval(() => {
            this.index++;
            if (this.index >= this.slides.length) {
                this.index = 0;
            }
            this._slideTo(this.index);
        }, this.delay);
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