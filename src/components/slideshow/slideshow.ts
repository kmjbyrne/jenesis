import { UiComponent } from '../base.component';
import { DomHelper } from '../helper';

const Slideshow = (() => {
    const componentName = 'ui-slideshow';
    let init = (node) => new SlideshowComponent(node);
    DomHelper.init(componentName, init);
})()


export class SlideshowComponent extends UiComponent {
    select(arg0: string, element: any): any {
        throw new Error("Method not implemented.");
    }
    selectOne(arg0: string, element: any): any {
        throw new Error("Method not implemented.");
    }
    componentName = 'slideshow';
    element: any;
    slides: any;
    previous: any;
    next: any;
    index: number;
    total: any;
    timer: any;
    delay: any;

    constructor(element) {
        super();
        this.element = element;

        this.slides = this.select("slideshow__slide", this.element);
        this.previous = this.selectOne("slideshow__prev", this.element);
        this.next = this.selectOne("slideshow__next", this.element);

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

        this.action();
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