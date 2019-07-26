import { UiComponent } from '../base.component';
import { DomHelper } from '../helper';

const Parallax = (() => {
    const componentName = 'ui-parallax';
    let init = (node) => new ParallaxComponent(node);
    DomHelper.init(componentName, init);
})()

export class ParallaxComponent extends UiComponent {
    element: any;
    elements(elements: any) {
        throw new Error("Method not implemented.");
    }

    constructor(element) {
        super();
        this.element = element;

        console.log(this.elements);
        this.init();
    }

    init() {
        window.onscroll = () => {
            window.requestAnimationFrame(() => {
                let scrolled = window.scrollY - 1950;
                this.element.style.transform = 'translate3d(0, ' + scrolled * -0.3 + 'px, 0)';
            });
        };
    }
}