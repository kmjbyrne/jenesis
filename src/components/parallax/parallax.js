export const Parallax = (() => {
    const COMPONENT_NAME = 'slideshow'
    const VERSION = '0.0.1'
    const SELECTOR = "[data-coradel='parallax']"

    class Parallax {

        constructor() {
            console.log(SELECTOR);
            this.elements = document.querySelectorAll(SELECTOR);
            this.count = this.elements.length;
            console.log(this.elements);
            this.init();
        }

        init() {
            window.onscroll = () => {
                window.requestAnimationFrame(() => {
                    for (let i = 0; i < this.count; i++) {
                        let currentElement = this.elements[i];
                        let scrolled = window.scrollY - 1950;
                        currentElement.style.transform = 'translate3d(0, ' + scrolled * -0.3 + 'px, 0)';
                    }
                });
            };
        }
    }
    return Parallax;
})();