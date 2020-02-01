/**
 * Created by Keith Byrne on 04/05/2018.
 */
(() => {
    const COMPONENT_NAME = 'slideshow';
    const VERSION = '0.0.1';
    const SELECTOR = "[data-component='parallax']";

    class Parallax {

        constructor() {
            this.elements = document.querySelectorAll(SELECTOR);
            this.count = this.elements.length;
            this.init();
        }

        init() {
            window.addEventListener('scroll', () => {
                window.requestAnimationFrame(() => {
                    for (let i = 0; i < this.count; i++) {
                        let currentElement = this.elements[i];
                        let scrolled = window.scrollY;
                        let scale = 1;

                        if (this.elements[i].dataset['direction'] == 'horizontal') {
                            currentElement.style.transform = 'translate3d(' + scrolled * -0.10 + 'px, 0, 0)';
                        } else if (this.elements[i].dataset['direction'] == 'zoom') {
                            if (scale === undefined) {
                                currentElement.style.transform = 'scale(1)';
                            }
                            scale += 0.1;
                            // currentElement.style.transform  = 'scale(' + scale + ')';
                        } else {
                            currentElement.style.transform = 'translate3d(0, ' + scrolled * -0.35 + 'px, 0)';
                        }
                    }
                });
            });
        }
    }
    let controller = new Parallax();
    controller.init();
})();