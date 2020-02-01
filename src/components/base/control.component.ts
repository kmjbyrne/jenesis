import { UiComponent } from './base.component';

export class UiParentControl extends UiComponent {
    name: string;
    element: any;

    constructor() {
        super();
    }

    init(element: HTMLElement) {
        this.element = element;
    }

    getName() {
        return `${this.prefix}-${this.name}`;
    }

    setInputClass(className: string) {
        this.element.classList.toggle(this.name + '--' + className);
    }

    removeInputClass(className: string) {
        this.element.classList.remove(this.name + '--' + className);
    }
}
